/* =========================================================
   GazLab 10 — gas-engine.js
   Üç boyutlu "kap + piston + tanecikler" fizik/görsel motoru.

   Sadelik ilkesi: P, sayaç/çarpışma gürültüsünden değil,
   doğrudan ideal gaz yasasından (P = nRT/V) hesaplanır; 3B sahne
   bu değeri NİTELİKSEL olarak görselleştirir.

   Kararlılık ilkesi: kamera KURULUMDA BİR KEZ konumlandırılır ve
   bir daha asla programatik olarak taşınmaz/yeniden ölçeklenmez.
   Kap her zaman sabit sol duvardan (BOX_X0) başlar ve yalnızca
   sağa doğru büyür; kamera, o sahne için olası en büyük hacme
   (vMax) göre kuruluşta bir kez geniş çekilir — böylece hacim
   ne olursa olsun kap (ve sahneye sabit noktalarda yerleştirilen
   enstrümanlar) her zaman kadrajda kalır. Önceki sürümdeki
   "kamera kutuyu takip etsin" ötelemesi kırılgandı ve kabın
   kadraj dışına çıkmasına yol açıyordu — bu yaklaşım onun yerine
   geçer.
   ========================================================= */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const R_CONST = 0.0821; // L·atm / (mol·K) — 10. sınıf düzeyinde sadeleştirilmiş ideal gaz sabiti
export const PARTICLES_PER_MOL = 12; // ölçek notu: gerçek N_A yerine kavramsal görselleştirme ölçeği
export const MAX_PARTICLES = 170;

const SPEED_K = 0.85; // v ~ SPEED_K * sqrt(T/M) (sahne birimi/sn, gerçek m/s değildir)
const BOX_LY = 4.0;
const BOX_LZ = 4.0;
const BOX_X0 = -3.0; // sabit sol duvar (silindir tabanı)
export const SCENE_BOUNDS = { x0: BOX_X0, ly: BOX_LY, lz: BOX_LZ };
const SOLID_HALF = 1.35;
const LIQUID_HALF = 1.7;

function speciesColor(hex) { return new THREE.Color(hex); }

export class GasBox {
  /**
   * @param {HTMLElement} host
   * @param {Object} opts
   *  species: [{key,name,color,molarMass,n}]
   *  volumeL, temperatureK, vMin, vMax
   *  showPiston, showPartition, showHole, holeRadius
   *  phase: 'gas' | 'solid' | 'liquid' (varsayılan 'gas')
   */
  constructor(host, opts = {}) {
    this.host = host;
    this.opts = opts;
    this.species = (opts.species || []).map(s => ({
      ...s,
      colorObj: speciesColor(s.color),
      particles: [],
      mesh: null,
    }));
    this.vMin = opts.vMin ?? 0.5;
    this.vMax = opts.vMax ?? 25;
    this.volumeL = opts.volumeL ?? 5;
    this._lx = this._volumeToLx(this.volumeL); // taneciklerin ilk konumu için _buildParticles'tan önce gerekli
    this.temperatureK = opts.temperatureK ?? 300;
    this.phase = opts.phase || "gas";
    this.speedScale = opts.speedScale ?? 1;
    this.showPiston = opts.showPiston !== false;
    this.showPartition = !!opts.showPartition;
    this.partitionOpen = false;
    this.showHole = !!opts.showHole;
    this.holeOpen = false;
    this.holeRadius = opts.holeRadius ?? 0.42;
    this._dragging = false;
    this._raf = null;
    this._listeners = { volumechange: [], escape: [], mix: [] };
    this._clock = new THREE.Clock();

    this._buildScene();
    this._buildBox();
    if (this.showPartition) this._buildPartition();
    if (this.showHole) this._buildHoleMarker();
    if (this.showPiston) this._buildPiston();
    this._buildParticles();
    this._onResize = this._onResize.bind(this);
    this._ro = new ResizeObserver(this._onResize);
    this._ro.observe(host);
    this._onResize();
    this._syncGeometry();
  }

  on(evt, fn) { (this._listeners[evt] ||= []).push(fn); return this; }
  _emit(evt, payload) { (this._listeners[evt] || []).forEach(fn => fn(payload)); }

  /* ---------------- hacim <-> görsel genişlik ---------------- */
  _volumeToLx(V) { return 1.4 + THREE.MathUtils.clamp(V, this.vMin, this.vMax) * 0.4; }
  _lxToVolume(Lx) { return (Lx - 1.4) / 0.4; }
  /** Bu sahnenin görebileceği en geniş kap genişliği — kamera bu değere göre BİR KEZ kurulur. */
  get _lxMax() { return this._volumeToLx(this.vMax); }

  /* ---------------- scene / camera / renderer (kalıcı, bir kez) ---------------- */
  _buildScene() {
    const scene = new THREE.Scene();
    this.scene = scene;

    // Kamera mesafesi, referans bir kap genişliğine (3.4 birim ≈ 5 L) göre bu
    // sahnenin olası en büyük kabına (vMax) oranlanır — kuruluşta bir kez.
    const refLx = 3.4;
    const distScale = Math.max(1, Math.sqrt(this._lxMax / refLx));

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 260);
    const camCenter = BOX_X0 + this._lxMax * 0.42;
    camera.position.set(camCenter + 6.2 * distScale, 4.6 * distScale, 8.4 * distScale);
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    this.renderer = renderer;
    this.host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 34 * distScale;
    controls.target.set(camCenter, 0.4, 0);
    controls.maxPolarAngle = Math.PI * 0.49;
    this.controls = controls;
    this._camCenter = camCenter;

    const hemi = new THREE.HemisphereLight(0xbcd4ff, 0x0a1120, 0.9);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.35);
    dir.position.set(camCenter + 6, 9, 4);
    scene.add(dir);
    const rim = new THREE.PointLight(0x2fb8c6, 6, 24);
    rim.position.set(camCenter - 5, 2, -4);
    scene.add(rim);

    const grid = new THREE.GridHelper(Math.max(30, this._lxMax * 3), 30, 0x1c2b45, 0x141f36);
    grid.position.set(camCenter, -2.02, 0);
    scene.add(grid);
  }

  _onResize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /* ---------------- kap (kutu) — sadece geometri güncellenir, kamera hiç dokunulmaz ---------------- */
  _buildBox() {
    this.boxGroup = new THREE.Group();
    this.scene.add(this.boxGroup);

    const baseGeo = new THREE.CylinderGeometry(this._lxMax * 0.62 + 3, this._lxMax * 0.62 + 3.2, 0.35, 48);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x11192b, roughness: 0.7, metalness: 0.2 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(this._camCenter, -2.2, 0);
    this.scene.add(base);

    // hacim cetveli: sabit taban üzerinde, litreye karşılık gelen gerçek duvar konumunda çentikler
    const rulerGroup = new THREE.Group();
    const tickMat = new THREE.LineBasicMaterial({ color: 0x4a6ea8 });
    const step = this.vMax > 15 ? 2 : 1;
    for (let v = Math.ceil(this.vMin); v <= this.vMax; v += step) {
      const worldX = BOX_X0 + this._volumeToLx(v);
      const isMajor = v % (step * 5) === 0;
      const h = isMajor ? 0.22 : 0.11;
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(worldX, -2.02, BOX_LZ / 2 + 0.15),
        new THREE.Vector3(worldX, -2.02 + h, BOX_LZ / 2 + 0.15),
      ]);
      rulerGroup.add(new THREE.Line(g, tickMat));
    }
    this.scene.add(rulerGroup);
  }

  _syncGeometry() {
    const Lx = this._volumeToLx(this.volumeL);
    this._lx = Lx;
    const centerX = BOX_X0 + Lx / 2;

    if (this._panelMesh) { this.boxGroup.remove(this._panelMesh); this._panelMesh.geometry.dispose(); }
    if (this._edges) { this.boxGroup.remove(this._edges); this._edges.geometry.dispose(); }

    const geo = new THREE.BoxGeometry(Lx, BOX_LY, BOX_LZ);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x8fd8e0, transparent: true, opacity: 0.085,
      roughness: 0.05, metalness: 0, side: THREE.DoubleSide, depthWrite: false,
    });
    const panel = new THREE.Mesh(geo, mat);
    panel.position.x = centerX;
    this._panelMesh = panel;
    this.boxGroup.add(panel);

    const edgesGeo = new THREE.EdgesGeometry(geo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x2fb8c6, transparent: true, opacity: 0.85 });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    edges.position.x = centerX;
    this._edges = edges;
    this.boxGroup.add(edges);

    if (this._piston) this._positionPiston();
    if (this._holeMarker) this._positionHole();
    if (this._partition) this._partition.position.x = centerX;
  }

  /* ---------------- piston (sağ, hareketli duvar) ---------------- */
  _buildPiston() {
    const group = new THREE.Group();
    const capGeo = new THREE.BoxGeometry(0.22, BOX_LY * 0.98, BOX_LZ * 0.98);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xaeb9c9, metalness: 0.85, roughness: 0.28 });
    const cap = new THREE.Mesh(capGeo, capMat);
    group.add(cap);

    // Sap kısa tutulur: eskiden kabın çok dışına taşıp büyük hacimlerde kadraj
    // dışına çıkıyor ve tutamağı bulmayı zorlaştırıyordu.
    const rodGeo = new THREE.CylinderGeometry(0.11, 0.11, 1.3, 16);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x8792a3, metalness: 0.9, roughness: 0.35 });
    const rod = new THREE.Mesh(rodGeo, rodMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.x = 0.76;
    group.add(rod);

    const handleGeo = new THREE.TorusGeometry(0.34, 0.09, 12, 24);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xff8a3d, metalness: 0.4, roughness: 0.4, emissive: 0x552200, emissiveIntensity: 0.25 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.x = 1.42;
    group.add(handle);

    // Görünmez ama daha büyük bir "tutma alanı": dokunmatik cihazlarda küçük halkayı
    // hassas şekilde yakalamak zor olduğundan raycast bu geniş küre üzerinden yapılır.
    const grabGeo = new THREE.SphereGeometry(0.62, 12, 12);
    const grabMat = new THREE.MeshBasicMaterial({ visible: false });
    const grabZone = new THREE.Mesh(grabGeo, grabMat);
    grabZone.position.copy(handle.position);
    group.add(grabZone);

    this._piston = group;
    this._pistonHandle = grabZone;
    this.boxGroup.add(group);
    this._positionPiston();
    this._setupDrag();
  }
  _positionPiston() { this._piston.position.x = BOX_X0 + this._lx; }

  _setupDrag() {
    const dom = this.renderer.domElement;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const toMouse = (e) => {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    dom.addEventListener("pointerdown", (e) => {
      toMouse(e);
      raycaster.setFromCamera(mouse, this.camera);
      const hit = raycaster.intersectObject(this._pistonHandle, false);
      if (hit.length) {
        this._dragging = true;
        this.controls.enabled = false;
        dom.setPointerCapture(e.pointerId);
      }
    });
    dom.addEventListener("pointermove", (e) => {
      if (!this._dragging) return;
      toMouse(e);
      raycaster.setFromCamera(mouse, this.camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const pt = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, pt);
      if (!pt) return;
      const newLx = THREE.MathUtils.clamp(pt.x - BOX_X0, this._volumeToLx(this.vMin), this._volumeToLx(this.vMax));
      const newV = THREE.MathUtils.clamp(this._lxToVolume(newLx), this.vMin, this.vMax);
      this.setVolume(newV);
      this._emit("volumechange", newV);
    });
    const end = () => {
      if (this._dragging) { this._dragging = false; this.controls.enabled = true; }
    };
    dom.addEventListener("pointerup", end);
    dom.addEventListener("pointerleave", end);
  }

  /* ---------------- bölme (difüzyon) ---------------- */
  _buildPartition() {
    const geo = new THREE.PlaneGeometry(BOX_LY * 0.98, BOX_LZ * 0.98);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide, metalness: 0.1, roughness: 0.2 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.y = Math.PI / 2;
    this._partition = mesh;
    this.boxGroup.add(mesh);
  }
  openPartition() {
    this.partitionOpen = true;
    if (this._partition) this._partition.visible = false;
  }
  resetPartition() {
    this.partitionOpen = false;
    if (this._partition) this._partition.visible = true;
    this._resetParticlePositions();
  }

  /* ---------------- delik (efüzyon), sol/sabit duvarda ---------------- */
  _buildHoleMarker() {
    const geo = new THREE.RingGeometry(this.holeRadius * 0.85, this.holeRadius, 24);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff8a3d, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.y = Math.PI / 2;
    this._holeMarker = ring;
    this._positionHole();
    this.boxGroup.add(ring);
  }
  _positionHole() { this._holeMarker.position.x = BOX_X0 - 0.01; }
  setHoleOpen(open) { this.holeOpen = open; if (this._holeMarker) this._holeMarker.material.color.set(open ? 0x2fbf6e : 0xff8a3d); }

  /* ---------------- tanecikler ---------------- */
  _targetCount(sp) { return Math.max(2, Math.min(MAX_PARTICLES, Math.round((sp.n || 1) * PARTICLES_PER_MOL))); }

  _buildParticles() {
    this.species.forEach((sp, idx) => {
      const geo = new THREE.SphereGeometry(1, 12, 10);
      const mat = new THREE.MeshStandardMaterial({ color: sp.colorObj, roughness: 0.35, metalness: 0.15, emissive: sp.colorObj, emissiveIntensity: 0.18 });
      const mesh = new THREE.InstancedMesh(geo, mat, MAX_PARTICLES);
      mesh.count = 0;
      this.boxGroup.add(mesh);
      sp.mesh = mesh;
      sp.radius = THREE.MathUtils.clamp(0.1 + (sp.molarMass || 20) / 900, 0.1, 0.22);
      this._syncSpeciesCount(sp, idx);
    });
  }

  _xBounds(r) {
    return { min: BOX_X0 + r, max: BOX_X0 + this._lx - r, mid: BOX_X0 + this._lx / 2 };
  }

  _spawnPoint(sp, idx) {
    const { min, max, mid } = this._xBounds(sp.radius);
    let xMin = min, xMax = max;
    if (this.showPartition && !this.partitionOpen) {
      if (idx === 0) xMax = mid - 0.15; else xMin = mid + 0.15;
    }
    const hy = BOX_LY / 2 - sp.radius - 0.05, hz = BOX_LZ / 2 - sp.radius - 0.05;
    return new THREE.Vector3(
      THREE.MathUtils.randFloat(Math.min(xMin, xMax - 0.01), Math.max(xMax, xMin + 0.01)),
      THREE.MathUtils.randFloat(-hy, hy),
      THREE.MathUtils.randFloat(-hz, hz)
    );
  }

  _syncSpeciesCount(sp, idx) {
    const target = this._targetCount(sp);
    while (sp.particles.length < target) {
      sp.particles.push({
        pos: this._spawnPoint(sp, idx),
        dir: new THREE.Vector3().randomDirection(),
        speedFactor: THREE.MathUtils.randFloat(0.6, 1.4),
        escaped: false,
        lattice: null,
      });
    }
    if (sp.particles.length > target) sp.particles.length = target;
    sp.mesh.count = sp.particles.length;
  }

  _resetParticlePositions() {
    this.species.forEach((sp, idx) => {
      sp.particles.forEach(p => { p.pos.copy(this._spawnPoint(sp, idx)); p.escaped = false; });
      sp.mesh.count = sp.particles.length;
    });
  }

  /* ---------------- genel ayarlayıcılar ---------------- */
  setVolume(v) {
    this.volumeL = THREE.MathUtils.clamp(v, this.vMin, this.vMax);
    this._syncGeometry();
  }
  setTemperature(t) { this.temperatureK = THREE.MathUtils.clamp(t, 50, 1200); }
  setMolCount(key, n) {
    const sp = this.species.find(s => s.key === key);
    if (!sp) return;
    sp.n = THREE.MathUtils.clamp(n, 0.1, 14);
    this._syncSpeciesCount(sp, this.species.indexOf(sp));
  }
  setPhase(phase) { this.phase = phase; }

  /** Dışarıdan erişim için kap sınırları (difüzyon/efüzyon ilerleme ölçümü vb.) */
  getBounds(r = 0.15) { return this._xBounds(r); }
  /** Enstrümanları sahneye sabit, her zaman kadrajdaki noktalara yerleştirmek için. */
  getInstrumentAnchor(frac, y = -1.55, z = BOX_LZ / 2 + 1.3) {
    return { x: BOX_X0 + this._lxMax * frac, y, z };
  }

  /** Tüm tanecikleri başlangıç konumlarına döndürür; bölme/delik durumunu sıfırlar. */
  reset() {
    this.holeOpen = false;
    if (this._holeMarker) this.setHoleOpen(false);
    this.partitionOpen = false;
    if (this._partition) this._partition.visible = this.showPartition;
    this._resetParticlePositions();
  }

  currentSpeed(sp) {
    const M = sp.molarMass || 20;
    return SPEED_K * this.speedScale * Math.sqrt(this.temperatureK / M);
  }

  /* ---------------- fizik adımı: serbest gaz ---------------- */
  _stepGas(dt) {
    const hy = BOX_LY / 2, hz = BOX_LZ / 2;

    this.species.forEach((sp, idx) => {
      const vBase = this.currentSpeed(sp);
      const r = sp.radius;
      const { min: xMin, max: xMax, mid } = this._xBounds(r);
      const dummy = new THREE.Object3D();
      let visibleIdx = 0;

      for (const p of sp.particles) {
        if (p.escaped) continue;
        const speed = vBase * p.speedFactor;
        p.pos.addScaledVector(p.dir, speed * dt);

        // sağ duvar / piston
        if (p.pos.x > xMax) { p.pos.x = xMax; p.dir.x *= -1; }

        // sol duvar — efüzyon deliği burada
        if (p.pos.x < xMin) {
          const nearHole = this.showHole && Math.abs(p.pos.y) < this.holeRadius && Math.abs(p.pos.z) < this.holeRadius;
          if (nearHole && this.holeOpen && p.dir.x < 0) {
            p.escaped = true;
            this._emit("escape", { key: sp.key, t: performance.now() });
            continue;
          }
          p.pos.x = xMin; p.dir.x *= -1;
        }

        // bölme (kapalıyken orta düzlemi geçemez)
        if (this.showPartition && !this.partitionOpen) {
          if (idx === 0 && p.pos.x > mid - r) { p.pos.x = mid - r; if (p.dir.x > 0) p.dir.x *= -1; }
          if (idx === 1 && p.pos.x < mid + r) { p.pos.x = mid + r; if (p.dir.x < 0) p.dir.x *= -1; }
        }

        if (p.pos.y > hy - r) { p.pos.y = hy - r; p.dir.y *= -1; }
        if (p.pos.y < -hy + r) { p.pos.y = -hy + r; p.dir.y *= -1; }
        if (p.pos.z > hz - r) { p.pos.z = hz - r; p.dir.z *= -1; }
        if (p.pos.z < -hz + r) { p.pos.z = -hz + r; p.dir.z *= -1; }

        dummy.position.copy(p.pos);
        dummy.scale.setScalar(r);
        dummy.updateMatrix();
        sp.mesh.setMatrixAt(visibleIdx, dummy.matrix);
        visibleIdx++;
      }
      sp.mesh.count = visibleIdx;
      sp.mesh.instanceMatrix.needsUpdate = true;
    });

    this._resolveCollisions();
  }

  _resolveCollisions() {
    const all = [];
    this.species.forEach(sp => sp.particles.forEach(p => { if (!p.escaped) all.push({ p, r: sp.radius, m: sp.molarMass || 20 }); }));
    const n = all.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const A = all[i], B = all[j];
        const dx = B.p.pos.x - A.p.pos.x, dy = B.p.pos.y - A.p.pos.y, dz = B.p.pos.z - A.p.pos.z;
        const dist2 = dx * dx + dy * dy + dz * dz;
        const minDist = A.r + B.r;
        if (dist2 > minDist * minDist || dist2 < 1e-6) continue;
        const dist = Math.sqrt(dist2);
        const nx = dx / dist, ny = dy / dist, nz = dz / dist;
        const overlap = (minDist - dist) / 2;
        A.p.pos.x -= nx * overlap; A.p.pos.y -= ny * overlap; A.p.pos.z -= nz * overlap;
        B.p.pos.x += nx * overlap; B.p.pos.y += ny * overlap; B.p.pos.z += nz * overlap;

        const va = A.p.dir.clone().multiplyScalar(this.currentSpeed({ molarMass: A.m }) * A.p.speedFactor);
        const vb = B.p.dir.clone().multiplyScalar(this.currentSpeed({ molarMass: B.m }) * B.p.speedFactor);
        const rvx = va.x - vb.x, rvy = va.y - vb.y, rvz = va.z - vb.z;
        const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;
        if (velAlongNormal > 0) continue;
        const invA = 1 / A.m, invB = 1 / B.m;
        const j2 = (-2 * velAlongNormal) / (invA + invB);
        const ix = j2 * nx, iy = j2 * ny, iz = j2 * nz;
        va.x += ix * invA; va.y += iy * invA; va.z += iz * invA;
        vb.x -= ix * invB; vb.y -= iy * invB; vb.z -= iz * invB;
        const sa = va.length(), sb = vb.length();
        if (sa > 1e-4) { A.p.dir.copy(va).normalize(); A.p.speedFactor = sa / this.currentSpeed({ molarMass: A.m }); }
        if (sb > 1e-4) { B.p.dir.copy(vb).normalize(); B.p.speedFactor = sb / this.currentSpeed({ molarMass: B.m }); }
      }
    }
  }

  /* ---------------- fizik adımı: katı (örgü titreşimi) ---------------- */
  _stepLattice() {
    const centerX = BOX_X0 + this._lx / 2;
    const half = Math.min(SOLID_HALF, this._lx / 2, BOX_LY / 2, BOX_LZ / 2);
    this.species.forEach(sp => {
      const r = sp.radius;
      const cols = Math.max(2, Math.ceil(Math.cbrt(sp.particles.length)));
      const spacing = (half * 2) / (cols + 0.6);
      const dummy = new THREE.Object3D();
      sp.particles.forEach((p, i) => {
        if (!p.lattice) {
          const cx = i % cols, cy = Math.floor(i / cols) % cols, cz = Math.floor(i / (cols * cols));
          p.lattice = new THREE.Vector3((cx - (cols - 1) / 2) * spacing, (cy - (cols - 1) / 2) * spacing, (cz - (cols - 1) / 2) * spacing);
        }
        const amp = spacing * 0.14 * Math.sqrt(this.temperatureK / 300);
        const t = performance.now() * 0.006 + i * 12.9;
        p.pos.set(
          centerX + p.lattice.x + Math.sin(t * 1.3) * amp,
          p.lattice.y + Math.cos(t * 1.7) * amp,
          p.lattice.z + Math.sin(t * 1.1) * amp
        );
        dummy.position.copy(p.pos); dummy.scale.setScalar(r); dummy.updateMatrix();
        sp.mesh.setMatrixAt(i, dummy.matrix);
      });
      sp.mesh.count = sp.particles.length;
      sp.mesh.instanceMatrix.needsUpdate = true;
    });
  }

  /* ---------------- fizik adımı: sıvı (sınırlı küme) ---------------- */
  _stepLiquid(dt) {
    const centerX = BOX_X0 + this._lx / 2;
    const clusterR = Math.min(LIQUID_HALF, this._lx / 2, BOX_LY / 2, BOX_LZ / 2);
    this.species.forEach(sp => {
      const r = sp.radius;
      const dummy = new THREE.Object3D();
      sp.particles.forEach((p, i) => {
        const speed = this.currentSpeed(sp) * 0.35 * p.speedFactor;
        const local = new THREE.Vector3(p.pos.x - centerX, p.pos.y, p.pos.z);
        local.addScaledVector(p.dir, speed * dt);
        if (local.length() > clusterR) {
          p.dir.reflect(local.clone().normalize());
          local.setLength(clusterR);
        }
        if (Math.random() < 0.01) p.dir.add(new THREE.Vector3().randomDirection().multiplyScalar(0.4)).normalize();
        p.pos.set(centerX + local.x, local.y, local.z);
        dummy.position.copy(p.pos); dummy.scale.setScalar(r); dummy.updateMatrix();
        sp.mesh.setMatrixAt(i, dummy.matrix);
      });
      sp.mesh.count = sp.particles.length;
      sp.mesh.instanceMatrix.needsUpdate = true;
    });
  }

  /* ---------------- döngü ---------------- */
  start() {
    if (this._raf) return;
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      const dt = Math.min(this._clock.getDelta(), 0.05);
      if (this.phase === "solid") this._stepLattice();
      else if (this.phase === "liquid") this._stepLiquid(dt);
      else this._stepGas(dt);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }
  stop() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; }
  dispose() {
    this.stop();
    this._ro.disconnect();
    this.renderer.dispose();
    this.host.innerHTML = "";
  }

  /* ---------------- yardımcı: ideal gaz hesap ---------------- */
  static pressure(nMol, tK, vL) { return (nMol * R_CONST * tK) / vL; }
  static volume(nMol, tK, pAtm) { return (nMol * R_CONST * tK) / pAtm; }
  static temperature(pAtm, vL, nMol) { return (pAtm * vL) / (nMol * R_CONST); }
  static moles(pAtm, vL, tK) { return (pAtm * vL) / (R_CONST * tK); }
}

export function celsiusToKelvin(c) { return c + 273.15; }
export function kelvinToCelsius(k) { return k - 273.15; }
