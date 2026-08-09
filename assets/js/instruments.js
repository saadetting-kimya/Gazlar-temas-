/* =========================================================
   GazLab 10 — instruments.js
   Üç boyutlu ölçüm aletleri: manometre, termometre, mol/kütle
   terazisi. Her fabrika { group, update(...) } döndürür ve
   bir GasBox sahnesine eklenmek üzere tasarlanmıştır.
   ========================================================= */

import * as THREE from "three";

function panelMat(color = 0x1c2b45) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.45 });
}

/* ---------------- Manometre (basınç göstergesi) ---------------- */
export function createManometer({ maxAtm = 6 } = {}) {
  const group = new THREE.Group();

  const bodyGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.22, 40);
  const body = new THREE.Mesh(bodyGeo, panelMat(0x233457));
  body.rotation.x = Math.PI / 2;
  group.add(body);

  const face = new THREE.Mesh(
    new THREE.CircleGeometry(0.78, 40),
    new THREE.MeshStandardMaterial({ color: 0x0a1120, roughness: 0.6 })
  );
  face.position.z = 0.115;
  group.add(face);

  // dereceler
  const tickMat = new THREE.LineBasicMaterial({ color: 0x4a6ea8 });
  const startAngle = Math.PI * 0.78, endAngle = -Math.PI * 0.78; // saat yönü, alttan boşluklu
  for (let i = 0; i <= 10; i++) {
    const a = THREE.MathUtils.lerp(startAngle, endAngle, i / 10);
    const r1 = 0.6, r2 = i % 5 === 0 ? 0.74 : 0.68;
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * r1, Math.sin(a) * r1, 0.121),
      new THREE.Vector3(Math.cos(a) * r2, Math.sin(a) * r2, 0.121),
    ]);
    group.add(new THREE.Line(g, tickMat));
  }

  const needle = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.62, 10),
    new THREE.MeshStandardMaterial({ color: 0xff8a3d, emissive: 0x552200, emissiveIntensity: 0.4 })
  );
  needle.geometry.translate(0, 0.31, 0);
  needle.position.z = 0.14;
  group.add(needle);

  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), panelMat(0xffd166));
  hub.position.z = 0.15;
  group.add(hub);

  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 10), panelMat(0x2e4468));
  stand.position.y = -1.35;
  group.add(stand);

  function update(pAtm) {
    const t = THREE.MathUtils.clamp(pAtm / maxAtm, 0, 1);
    const a = THREE.MathUtils.lerp(startAngle, endAngle, t);
    needle.rotation.z = a - Math.PI / 2;
  }
  update(1);
  return { group, update, label: "Manometre (atm)" };
}

/* ---------------- Termometre (Celsius / Kelvin) ---------------- */
export function createThermometer({ minK = 150, maxK = 900 } = {}) {
  const group = new THREE.Group();
  const tubeH = 2.6;

  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, tubeH, 20, 1, true),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.05, side: THREE.DoubleSide })
  );
  glass.position.y = tubeH / 2;
  group.add(glass);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.05 }));
  group.add(bulb);

  const fillMat = new THREE.MeshStandardMaterial({ color: 0xff5b3d, emissive: 0xff5b3d, emissiveIntensity: 0.5 });
  const fillBulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 18), fillMat);
  group.add(fillBulb);
  const fillCol = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 14), fillMat);
  fillCol.position.y = 0.5;
  group.add(fillCol);

  const capMat = panelMat(0x2e4468);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.12, 20), capMat);
  cap.position.y = tubeH + 0.02;
  group.add(cap);

  // ölçek çizgileri: sol Celsius, sağ Kelvin
  const tickMat = new THREE.LineBasicMaterial({ color: 0x6f86ad });
  for (let i = 0; i <= 10; i++) {
    const y = (i / 10) * tubeH * 0.94 + 0.1;
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.11, y, 0), new THREE.Vector3(0.2, y, 0),
    ]);
    group.add(new THREE.Line(g, tickMat));
  }

  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.14, 24), panelMat(0x233457));
  stand.position.y = -0.28;
  group.add(stand);

  function update(tK) {
    const t = THREE.MathUtils.clamp((tK - minK) / (maxK - minK), 0.03, 1);
    fillCol.scale.y = Math.max(0.03, t);
    fillCol.position.y = 0.15 + (t * (tubeH - 0.3)) / 2;
    const hue = THREE.MathUtils.lerp(0.58, 0.0, t); // mavi -> kırmızı
    fillMat.color.setHSL(hue, 0.85, 0.55);
    fillMat.emissive.setHSL(hue, 0.85, 0.4);
  }
  update(300);
  return { group, update, label: "Termometre (°C / K)" };
}

/* ---------------- Mol / kütle terazisi ---------------- */
export function createMolBalance({ maxMol = 12 } = {}) {
  const group = new THREE.Group();

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 1.0), panelMat(0x233457));
  group.add(base);

  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 10), panelMat(0x2e4468));
  column.position.y = 0.5;
  group.add(column);

  const beam = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.06, 0.06), panelMat(0xaeb9c9));
  beam.position.y = 1.02;
  group.add(beam);

  const panMat = new THREE.MeshStandardMaterial({ color: 0x63e0ec, metalness: 0.5, roughness: 0.35, emissive: 0x0e3d40, emissiveIntensity: 0.3 });
  const panL = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.05, 24), panMat);
  panL.position.set(-0.68, 0.86, 0);
  const panR = panL.clone();
  panR.position.x = 0.68;
  group.add(panL, panR);

  // dijital ekran
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.26, 0.05), new THREE.MeshStandardMaterial({ color: 0x06222a }));
  screen.position.set(0, 0.28, 0.53);
  group.add(screen);

  function update(nMol) {
    const t = THREE.MathUtils.clamp(nMol / maxMol, 0, 1);
    const tilt = THREE.MathUtils.lerp(-0.16, 0.16, t);
    beam.rotation.z = tilt;
    panL.position.y = 0.86 - Math.sin(tilt) * 0.5;
    panR.position.y = 0.86 + Math.sin(tilt) * 0.5;
  }
  update(1);
  return { group, update, label: "Mol Sayacı" };
}
