/* =========================================================
   GazLab 10 — charts.js
   Bağımlılıksız, hafif canvas grafik yardımcıları.
   Gaz yasaları için gerçek zamanlı iz (trail) + nokta grafiği.
   ========================================================= */

export class TraceChart {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} cfg {xLabel,yLabel,xMax,yMax,color,curve:'linear'|'inverse'}
   */
  constructor(canvas, cfg) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cfg = Object.assign({ xLabel: "x", yLabel: "y", xMax: 10, yMax: 10, color: "#2fb8c6" }, cfg);
    this.points = [];
    this._fit();
    window.addEventListener("resize", () => this._fit());
  }
  _fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight || 220;
    this.canvas.width = w * dpr; this.canvas.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h;
    this.draw();
  }
  push(x, y) {
    this.points.push([x, y]);
    if (this.points.length > 400) this.points.shift();
    this.draw();
  }
  clear() { this.points = []; this.draw(); }
  setMax(xMax, yMax) { this.cfg.xMax = xMax; this.cfg.yMax = yMax; this.draw(); }
  /** Gizliyken oluşturulmuş (genişliği 0 ölçülmüş) bir canvas görünür olduğunda çağrılmalıdır. */
  resize() { this._fit(); }

  _toPx(x, y) {
    const pad = { l: 40, r: 14, t: 14, b: 28 };
    const iw = this.w - pad.l - pad.r, ih = this.h - pad.t - pad.b;
    const px = pad.l + (x / this.cfg.xMax) * iw;
    const py = pad.t + ih - (y / this.cfg.yMax) * ih;
    return [px, py, pad, iw, ih];
  }

  draw() {
    const ctx = this.ctx, { w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const [, , pad, iw, ih] = this._toPx(0, 0);

    // eksenler
    ctx.strokeStyle = "rgba(147,165,198,.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + ih); ctx.lineTo(pad.l + iw, pad.t + ih);
    ctx.stroke();

    ctx.fillStyle = "rgba(147,165,198,.9)";
    ctx.font = "10.5px ui-monospace, monospace";
    ctx.fillText(this.cfg.yLabel, 6, pad.t + 10);
    ctx.fillText(this.cfg.xLabel, pad.l + iw - this.cfg.xLabel.length * 5.5, h - 8);

    if (this.points.length < 2) {
      if (this.points.length === 1) this._dot(this.points[0], this.cfg.color);
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = this.cfg.color;
    ctx.lineWidth = 2;
    this.points.forEach(([x, y], i) => {
      const [px, py] = this._toPx(x, y);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();

    const last = this.points[this.points.length - 1];
    this._dot(last, this.cfg.color);
  }
  _dot([x, y], color) {
    const [px, py] = this._toPx(x, y);
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(px, py, 4.2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "#0a1120";
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }
}

/** Basit çubuk/ilerleme grafiği: difüzyon-efüzyon karşılaştırmaları için */
export class RaceMeter {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rows = [];
    this._fit();
    window.addEventListener("resize", () => this._fit());
  }
  _fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight || 110;
    this.canvas.width = w * dpr; this.canvas.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h;
    this.draw();
  }
  setRows(rows) { this.rows = rows; this.draw(); } // [{label,value,max,color}]
  /** Gizliyken oluşturulmuş (genişliği 0 ölçülmüş) bir canvas görünür olduğunda çağrılmalıdır. */
  resize() { this._fit(); }
  draw() {
    const ctx = this.ctx, { w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const rowH = h / Math.max(1, this.rows.length);
    this.rows.forEach((r, i) => {
      const y = i * rowH + rowH * 0.22;
      const barH = rowH * 0.42;
      ctx.fillStyle = "rgba(255,255,255,.06)";
      ctx.fillRect(90, y, w - 110, barH);
      const t = Math.min(1, r.value / (r.max || 1));
      ctx.fillStyle = r.color;
      ctx.fillRect(90, y, (w - 110) * t, barH);
      ctx.fillStyle = "#c8d5ec";
      ctx.font = "12px -apple-system, sans-serif";
      ctx.fillText(r.label, 0, y + barH * 0.8);
      ctx.fillStyle = "#eef4ff";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText(r.valueLabel ?? String(r.value.toFixed(2)), w - 78, y + barH * 0.8);
    });
  }
}
