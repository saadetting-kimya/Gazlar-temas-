/* =========================================================
   GazLab 10 — quiz-engine.js
   Bağlam temelli değerlendirme sorularını render eder,
   puanlar ve sonucu localStorage'a kaydeder (ilerleme takibi).

   Görsel bileşenler (renderChart, renderGasContainer, vb.) bir
   önceki prototip projeden (gazlarlab10) taşınmıştır — saf SVG ile,
   dış kütüphane olmadan çizilir. Bir sorunun opsiyonel bir görsel
   alanı (gasContainer/chart/statements/...) varsa, kart şablonunda
   soru metninden önce otomatik olarak render edilir.
   ========================================================= */

const STORAGE_KEY = "gazlab10_progress";

export function readProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
export function writeProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
export function markModuleScore(moduleKey, score, total) {
  const p = readProgress();
  p[moduleKey] = { score, total, at: Date.now() };
  writeProgress(p);
}
export function markVisited(moduleKey) {
  const p = readProgress();
  p[moduleKey] = p[moduleKey] || { visited: true };
  p[moduleKey].visited = true;
  writeProgress(p);
}

/* ================= görsel bileşenler (render*) ================= */

function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}
function svgEl(tag, attrs) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

function renderDataTable({ headers, rows, caption }) {
  const wrap = el("div", { class: "gl-visual gl-table-wrap" });
  if (caption) wrap.appendChild(el("p", { class: "gl-caption" }, caption));
  const table = el("table", { class: "gl-table" });
  table.appendChild(el("thead", null, el("tr", null, headers.map((h) => el("th", null, h)))));
  table.appendChild(el("tbody", null, rows.map((r) => el("tr", null, r.map((c) => el("td", null, String(c)))))));
  wrap.appendChild(table);
  return wrap;
}

/* type: 'bar' | 'line'. series: [{ label, color, data: [{x,y}] }] */
function chartScale(domainMin, domainMax, rangeMin, rangeMax) {
  const span = domainMax - domainMin || 1;
  return (v) => rangeMin + ((v - domainMin) / span) * (rangeMax - rangeMin);
}

function renderChart({ type = "line", series, xLabel, yLabel, caption, xDomain, yDomain, xTicks, yTicks, width = 460, height = 300 }) {
  const wrap = el("div", { class: "gl-visual gl-chart-wrap" });
  if (caption) wrap.appendChild(el("p", { class: "gl-caption" }, caption));

  const padL = 56, padB = 44, padT = 16, padR = 18;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, class: "gl-chart", role: "img", "aria-label": caption || `${xLabel} - ${yLabel}` });

  if (type === "bar") {
    const s = series[0];
    const values = s.data.map((d) => d.y);
    const yMax = yDomain ? yDomain[1] : Math.max(...values) * 1.15;
    const yScale = chartScale(0, yMax, plotH, 0);
    const bw = plotW / s.data.length;
    svg.appendChild(svgEl("line", { x1: padL, y1: padT, x2: padL, y2: padT + plotH, class: "gl-axis" }));
    svg.appendChild(svgEl("line", { x1: padL, y1: padT + plotH, x2: padL + plotW, y2: padT + plotH, class: "gl-axis" }));
    s.data.forEach((d, i) => {
      const x = padL + i * bw + bw * 0.18;
      const barWidth = bw * 0.64;
      const y = padT + yScale(d.y);
      const h = padT + plotH - y;
      svg.appendChild(svgEl("rect", { x, y, width: barWidth, height: h, fill: d.color || s.color || "var(--gl-accent)", rx: 3 }));
      const xt = svgEl("text", { x: x + barWidth / 2, y: padT + plotH + 18, class: "gl-tick-x", "text-anchor": "middle" });
      xt.textContent = String(d.x);
      svg.appendChild(xt);
      const vt = svgEl("text", { x: x + barWidth / 2, y: y - 6, class: "gl-bar-value", "text-anchor": "middle" });
      vt.textContent = String(d.y);
      svg.appendChild(vt);
    });
    const yTickVals = yTicks || [0, yMax / 2, yMax];
    yTickVals.forEach((t) => {
      const y = padT + yScale(t);
      const yt = svgEl("text", { x: padL - 8, y: y + 4, class: "gl-tick-y", "text-anchor": "end" });
      yt.textContent = Number(t.toFixed(1));
      svg.appendChild(yt);
      svg.appendChild(svgEl("line", { x1: padL - 4, y1: y, x2: padL, y2: y, class: "gl-axis" }));
    });
  } else {
    const allX = series.flatMap((s) => s.data.map((d) => d.x));
    const allY = series.flatMap((s) => s.data.map((d) => d.y));
    const xMin = xDomain ? xDomain[0] : Math.min(...allX, 0);
    const xMax = xDomain ? xDomain[1] : Math.max(...allX) * 1.08;
    const yMin = yDomain ? yDomain[0] : Math.min(...allY, 0);
    const yMax = yDomain ? yDomain[1] : Math.max(...allY) * 1.12;
    const xScale = chartScale(xMin, xMax, padL, padL + plotW);
    const yScale = chartScale(yMin, yMax, padT + plotH, padT);

    svg.appendChild(svgEl("line", { x1: padL, y1: padT, x2: padL, y2: padT + plotH, class: "gl-axis" }));
    svg.appendChild(svgEl("line", { x1: padL, y1: padT + plotH, x2: padL + plotW, y2: padT + plotH, class: "gl-axis" }));

    (xTicks || [xMin, (xMin + xMax) / 2, xMax]).forEach((t) => {
      const x = xScale(t);
      svg.appendChild(svgEl("line", { x1: x, y1: padT + plotH, x2: x, y2: padT + plotH + 4, class: "gl-axis" }));
      const xt = svgEl("text", { x, y: padT + plotH + 18, class: "gl-tick-x", "text-anchor": "middle" });
      xt.textContent = Number(t.toFixed(2)).toString();
      svg.appendChild(xt);
    });
    (yTicks || [yMin, (yMin + yMax) / 2, yMax]).forEach((t) => {
      const y = yScale(t);
      svg.appendChild(svgEl("line", { x1: padL - 4, y1: y, x2: padL, y2: y, class: "gl-axis" }));
      const yt = svgEl("text", { x: padL - 8, y: y + 4, class: "gl-tick-y", "text-anchor": "end" });
      yt.textContent = Number(t.toFixed(2)).toString();
      svg.appendChild(yt);
    });

    series.forEach((s) => {
      const pts = s.data.map((d) => `${xScale(d.x)},${yScale(d.y)}`).join(" ");
      svg.appendChild(svgEl("polyline", { points: pts, class: "gl-line", style: `stroke:${s.color || "var(--gl-accent)"}` }));
      s.data.forEach((d) => {
        svg.appendChild(svgEl("circle", { cx: xScale(d.x), cy: yScale(d.y), r: 4, fill: s.color || "var(--gl-accent)" }));
      });
    });

    if (series.length > 1) {
      const legend = el("div", { class: "gl-legend" });
      series.forEach((s) => {
        legend.appendChild(el("span", { class: "gl-legend-item" }, el("span", { class: "gl-legend-dot", style: `background:${s.color || "var(--gl-accent)"}` }), s.label));
      });
      wrap.appendChild(legend);
    }
  }

  if (xLabel) {
    const t = svgEl("text", { x: padL + plotW / 2, y: height - 4, class: "gl-axis-label", "text-anchor": "middle" });
    t.textContent = xLabel;
    svg.appendChild(t);
  }
  if (yLabel) {
    const t = svgEl("text", { x: 14, y: padT + plotH / 2, class: "gl-axis-label", "text-anchor": "middle", transform: `rotate(-90 14 ${padT + plotH / 2})` });
    t.textContent = yLabel;
    svg.appendChild(t);
  }

  wrap.appendChild(svg);
  return wrap;
}
function renderCompareLineChart(opts) { return renderChart({ ...opts, type: "line" }); }

function renderStatementList({ intro, statements }) {
  const wrap = el("div", { class: "gl-visual gl-statements" });
  if (intro) wrap.appendChild(el("p", { class: "gl-caption" }, intro));
  const list = el("ul", { class: "gl-statement-list" });
  statements.forEach((s, i) => list.appendChild(el("li", null, el("span", { class: "gl-roman" }, ROMAN[i] || `${i + 1}.`), el("span", null, s))));
  wrap.appendChild(list);
  return wrap;
}

function renderDialogue({ speakers }) {
  const wrap = el("div", { class: "gl-visual gl-dialogue" });
  speakers.forEach((s, i) => {
    wrap.appendChild(el("div", { class: `gl-bubble gl-bubble-${i % 2 === 0 ? "a" : "b"}` }, el("span", { class: "gl-bubble-name" }, s.name), el("span", { class: "gl-bubble-text" }, s.text)));
  });
  return wrap;
}

function renderMatchTable({ left, right, leftLabel, rightLabel }) {
  const wrap = el("div", { class: "gl-visual gl-match" });
  const table = el("table", { class: "gl-match-table" });
  table.appendChild(el("thead", null, el("tr", null, el("th", null, leftLabel || "Sütun A"), el("th", null, rightLabel || "Sütun B"))));
  const maxLen = Math.max(left.length, right.length);
  const tbody = el("tbody");
  for (let i = 0; i < maxLen; i++) {
    tbody.appendChild(el("tr", null, el("td", null, left[i] ? `${i + 1}. ${left[i]}` : ""), el("td", null, right[i] ? `${String.fromCharCode(97 + i)}) ${right[i]}` : "")));
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function renderChecklist({ items, intro }) {
  const wrap = el("div", { class: "gl-visual gl-checklist" });
  if (intro) wrap.appendChild(el("p", { class: "gl-caption" }, intro));
  const list = el("ul", { class: "gl-checklist-list" });
  items.forEach((it) => list.appendChild(el("li", null, el("span", { class: "gl-checkbox" }, "▢"), el("span", null, it))));
  wrap.appendChild(list);
  return wrap;
}

/* gradyan/renk yardımcıları — kap/balon görselleri düz dolgu yerine
   gradyanla üç boyutlu (camsı silindir / parlak balon) görünür. */
let glGradSeq = 0;
function nextGradId(prefix) { glGradSeq += 1; return `gl-${prefix}-${glGradSeq}`; }
function addLinearGrad(defs, id, stops, coords) {
  const grad = svgEl("linearGradient", { id, ...(coords || { x1: "0%", y1: "0%", x2: "100%", y2: "0%" }) });
  stops.forEach(([offset, color, opacity]) => {
    const attrs = { offset, "stop-color": color };
    if (opacity !== undefined) attrs["stop-opacity"] = opacity;
    grad.appendChild(svgEl("stop", attrs));
  });
  defs.appendChild(grad);
}
function addRadialGrad(defs, id, stops, coords) {
  const grad = svgEl("radialGradient", { id, ...(coords || { cx: "35%", cy: "30%", r: "75%" }) });
  stops.forEach(([offset, color, opacity]) => {
    const attrs = { offset, "stop-color": color };
    if (opacity !== undefined) attrs["stop-opacity"] = opacity;
    grad.appendChild(svgEl("stop", attrs));
  });
  defs.appendChild(grad);
}
function mixHex(hex, target, amt) {
  if (!hex || hex[0] !== "#" || hex.length !== 7) return null;
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r + (target[0] - r) * amt)},${Math.round(g + (target[1] - g) * amt)},${Math.round(b + (target[2] - b) * amt)})`;
}
function lighten(hex, amt) { return mixHex(hex, [255, 255, 255], amt ?? 0.4) || "#eef4fb"; }
function darken(hex, amt) { return mixHex(hex, [0, 0, 0], amt ?? 0.35) || "#5c6b7d"; }

function drawParticles(svg, defs, cx, topY, bottomY, width, count, color) {
  const n = Math.max(0, Math.min(60, count || 12));
  const cols = Math.ceil(Math.sqrt(n * (width / (bottomY - topY || 1))));
  const rows = Math.ceil(n / cols) || 1;
  const usableW = width * 0.7;
  const usableH = (bottomY - topY) * 0.82;
  const baseColor = color || "#2f7fc4";
  const sheenId = nextGradId("sheen");
  addRadialGrad(defs, sheenId, [["0%", "#ffffff", 0.95], ["70%", "#ffffff", 0.25], ["100%", "#ffffff", 0]], { cx: "35%", cy: "30%", r: "65%" });
  let placed = 0;
  for (let r = 0; r < rows && placed < n; r++) {
    for (let c = 0; c < cols && placed < n; c++) {
      const jitterX = (Math.sin(placed * 12.9898) * 0.5 + 0.5) * (usableW / cols) * 0.5;
      const jitterY = (Math.cos(placed * 78.233) * 0.5 + 0.5) * (usableH / rows) * 0.5;
      const x = cx - usableW / 2 + (c + 0.5) * (usableW / cols) + jitterX - usableW / cols / 4;
      const y = topY + (bottomY - topY) * 0.09 + (r + 0.5) * (usableH / rows) + jitterY - usableH / rows / 4;
      svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 4.4, fill: baseColor, stroke: "rgba(20,30,45,0.35)", "stroke-width": 0.6 }));
      svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 4.4, fill: `url(#${sheenId})` }));
      placed++;
    }
  }
}

/* vessels: [{ label, kind: 'fixed'|'piston', fillRatio, particles, P, V, T, n, gasColor, particleColor, weight }] */
function renderVesselSvg(v) {
  const w = 140, h = 224;
  const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}`, class: "gl-vessel-svg" });
  const defs = svgEl("defs");
  svg.appendChild(defs);

  const cx = w / 2, wallW = 76, rx = wallW / 2, ry = 11, topY = 34, bottomY = h - 30;
  const fillRatio = v.fillRatio ?? 0.6;
  const gasTopY = v.kind === "piston" ? topY + (bottomY - topY) * (1 - fillRatio) : topY;

  const wallGradId = nextGradId("wall");
  addLinearGrad(defs, wallGradId, [["0%", "#aebbc9"], ["16%", "#f2f7fb"], ["46%", "#dbe5ef"], ["78%", "#c1cedc"], ["100%", "#93a3b6"]]);
  const wallDark = "#6b7a8c";
  const capGradId = nextGradId("cap");
  addLinearGrad(defs, capGradId, [["0%", "#c7d3e0"], ["50%", "#fbfdff"], ["100%", "#a7b5c6"]]);

  const gasBase = v.gasColor && v.gasColor[0] === "#" ? v.gasColor : "#6fa8dc";
  const gasLight = lighten(gasBase, 0.55), gasDark = darken(gasBase, 0.3);
  const gasGradId = nextGradId("gas");
  addLinearGrad(defs, gasGradId, [["0%", gasDark, 0.55], ["20%", gasLight, 0.55], ["55%", gasBase, 0.45], ["100%", gasDark, 0.55]]);
  const gasCapGradId = nextGradId("gascap");
  addRadialGrad(defs, gasCapGradId, [["0%", gasLight, 0.75], ["100%", gasBase, 0.5]], { cx: "40%", cy: "35%", r: "70%" });

  svg.appendChild(svgEl("ellipse", { cx, cy: bottomY, rx, ry, fill: darken("#c1cedc", 0.25), stroke: wallDark, "stroke-width": 1.4 }));
  svg.appendChild(svgEl("rect", { x: cx - rx, y: topY, width: wallW, height: bottomY - topY, fill: `url(#${wallGradId})`, stroke: "none" }));
  svg.appendChild(svgEl("line", { x1: cx - rx, y1: topY, x2: cx - rx, y2: bottomY, stroke: wallDark, "stroke-width": 1.4 }));
  svg.appendChild(svgEl("line", { x1: cx + rx, y1: topY, x2: cx + rx, y2: bottomY, stroke: wallDark, "stroke-width": 1.4 }));

  const grx = rx - 4, gry = ry - 2.5;
  if (bottomY - gasTopY > 2) {
    svg.appendChild(svgEl("rect", { x: cx - grx, y: gasTopY, width: grx * 2, height: bottomY - gasTopY - gry * 0.4, fill: `url(#${gasGradId})` }));
    svg.appendChild(svgEl("ellipse", { cx, cy: bottomY - gry * 0.4, rx: grx, ry: gry, fill: gasDark, opacity: 0.55 }));
    svg.appendChild(svgEl("ellipse", { cx, cy: gasTopY, rx: grx, ry: gry, fill: `url(#${gasCapGradId})`, stroke: darken(gasBase, 0.4), "stroke-width": 1 }));
    drawParticles(svg, defs, cx, gasTopY, bottomY, wallW, v.particles ?? 12, v.particleColor);
  }

  svg.appendChild(svgEl("ellipse", { cx, cy: topY, rx, ry, fill: `url(#${capGradId})`, stroke: wallDark, "stroke-width": 1.4 }));

  if (v.kind === "piston") {
    const pistonGradId = nextGradId("piston");
    addLinearGrad(defs, pistonGradId, [["0%", "#7c8898"], ["20%", "#e8edf3"], ["55%", "#aab6c4"], ["100%", "#5f6b7a"]]);
    svg.appendChild(svgEl("rect", { x: cx - grx - 2, y: gasTopY - 9, width: (grx + 2) * 2, height: 9, fill: `url(#${pistonGradId})`, stroke: wallDark, "stroke-width": 1 }));
    svg.appendChild(svgEl("ellipse", { cx, cy: gasTopY - 9, rx: grx + 2, ry: gry, fill: `url(#${pistonGradId})`, stroke: wallDark, "stroke-width": 1 }));
    svg.appendChild(svgEl("rect", { x: cx - 4, y: 6, width: 8, height: Math.max(0, gasTopY - 9 - 6), fill: `url(#${pistonGradId})` }));
    if (v.weight) {
      const weightGradId = nextGradId("weight");
      addLinearGrad(defs, weightGradId, [["0%", "#4a5361"], ["30%", "#8b97a6"], ["100%", "#333c47"]]);
      svg.appendChild(svgEl("rect", { x: cx - 16, y: 4, width: 32, height: 15, rx: 2, fill: `url(#${weightGradId})`, stroke: "#2b323b", "stroke-width": 1 }));
    }
  }
  return svg;
}

function renderGasContainer({ vessels, caption }) {
  const wrap = el("div", { class: "gl-visual gl-vessels" });
  if (caption) wrap.appendChild(el("p", { class: "gl-caption" }, caption));
  const row = el("div", { class: "gl-vessel-row" });
  vessels.forEach((v) => {
    const svg = renderVesselSvg(v);
    const labelLines = [];
    if (v.P !== undefined) labelLines.push(`P = ${v.P}`);
    if (v.V !== undefined) labelLines.push(`V = ${v.V}`);
    if (v.T !== undefined) labelLines.push(`T = ${v.T}`);
    if (v.n !== undefined) labelLines.push(`n = ${v.n}`);
    const cell = el("div", { class: "gl-vessel-cell" }, svg);
    if (v.label) cell.appendChild(el("div", { class: "gl-vessel-label" }, v.label));
    if (labelLines.length) cell.appendChild(el("div", { class: "gl-vessel-values" }, labelLines.join(" · ")));
    row.appendChild(cell);
  });
  wrap.appendChild(row);
  return wrap;
}

/* basit karşılaştırmalı tanecik/yoğunluk kutuları (madde hâli, yoğunluk vb) */
function renderParticleModel({ boxes, caption }) {
  const wrap = el("div", { class: "gl-visual gl-particle-boxes" });
  if (caption) wrap.appendChild(el("p", { class: "gl-caption" }, caption));
  const row = el("div", { class: "gl-vessel-row" });
  boxes.forEach((b) => {
    const w = 120, h = 120;
    const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}`, class: "gl-vessel-svg" });
    const defs = svgEl("defs");
    svg.appendChild(defs);
    const boxGradId = nextGradId("box");
    addLinearGrad(defs, boxGradId, [["0%", "#dde5ee"], ["50%", "#f7fafd"], ["100%", "#c3cedb"]], { x1: "0%", y1: "0%", x2: "100%", y2: "100%" });
    svg.appendChild(svgEl("rect", { x: 6, y: 6, width: w - 12, height: h - 12, rx: 6, fill: `url(#${boxGradId})`, stroke: "#6b7a8c", "stroke-width": 1.4 }));
    svg.appendChild(svgEl("rect", { x: 8, y: 8, width: w - 16, height: (h - 16) * 0.28, rx: 5, fill: "#ffffff", opacity: 0.35 }));
    drawParticles(svg, defs, w / 2, 10, h - 10, w - 12, b.count, b.color);
    row.appendChild(el("div", { class: "gl-vessel-cell" }, svg, el("div", { class: "gl-vessel-label" }, b.label)));
  });
  wrap.appendChild(row);
  return wrap;
}

/* parlak, gradyanlı (ideal esnek balon) görünümünde balonlar */
function renderBalloonCompare({ balloons, caption }) {
  const wrap = el("div", { class: "gl-visual gl-balloons" });
  if (caption) wrap.appendChild(el("p", { class: "gl-caption" }, caption));
  const row = el("div", { class: "gl-vessel-row" });
  balloons.forEach((b) => {
    const size = 60 * (b.sizeRatio ?? 1);
    const w = 130, h = 160;
    const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}`, class: "gl-vessel-svg" });
    const defs = svgEl("defs");
    svg.appendChild(defs);
    const cx = w / 2, cy = 20 + size;
    const base = b.color && b.color[0] === "#" ? b.color : "#1f6fb2";
    const light = lighten(base, 0.55), dark = darken(base, 0.35);
    const balloonGradId = nextGradId("balloon");
    addRadialGrad(defs, balloonGradId, [["0%", light], ["55%", base], ["100%", dark]], { cx: "32%", cy: "28%", r: "75%" });
    svg.appendChild(svgEl("path", { d: `M ${cx - 5} ${cy + size - 2} L ${cx + 5} ${cy + size - 2} L ${cx} ${cy + size + 8} Z`, fill: dark }));
    svg.appendChild(svgEl("ellipse", { cx, cy, rx: size * 0.82, ry: size, fill: `url(#${balloonGradId})`, stroke: dark, "stroke-width": 1.2 }));
    svg.appendChild(svgEl("ellipse", { cx: cx - size * 0.32, cy: cy - size * 0.42, rx: size * 0.22, ry: size * 0.32, fill: "#ffffff", opacity: 0.55 }));
    svg.appendChild(svgEl("line", { x1: cx, y1: cy + size + 8, x2: cx, y2: h - 6, class: "gl-balloon-string" }));
    row.appendChild(el("div", { class: "gl-vessel-cell" }, svg, el("div", { class: "gl-vessel-label" }, b.label), b.sub ? el("div", { class: "gl-vessel-values" }, b.sub) : null));
  });
  wrap.appendChild(row);
  return wrap;
}

const VISUAL_RENDERERS = {
  table: renderDataTable,
  chart: renderChart,
  compareChart: renderCompareLineChart,
  statements: renderStatementList,
  dialogue: renderDialogue,
  matchPairs: renderMatchTable,
  checklist: renderChecklist,
  gasContainer: renderGasContainer,
  particleModel: renderParticleModel,
  balloons: renderBalloonCompare,
};

/** Sorunun tanınan görsel alanlarından (en fazla bir tane beklenir) DOM
    düğümü üretir; hiçbiri yoksa null döner. */
function renderQuestionVisual(q) {
  for (const [field, renderer] of Object.entries(VISUAL_RENDERERS)) {
    if (q[field]) return renderer(q[field]);
  }
  return null;
}

/* ================= quiz mantığı ================= */

export function renderQuiz(hostEl, questions, moduleKey) {
  hostEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "quiz";
  hostEl.appendChild(wrap);

  const state = { answered: 0, correct: 0 };

  questions.forEach((q, qi) => {
    const card = document.createElement("div");
    card.className = "qcard";
    card.innerHTML = `
      <div class="qhead">
        <span class="qn">SORU ${qi + 1}/${questions.length}</span>
        ${q.context ? `<span class="qctx">${q.context}</span>` : ""}
      </div>
      <div class="qvisual"></div>
      <div class="qtext">${q.text}</div>
      <div class="qopts"></div>
      <div class="qfeedback"></div>
    `;
    const visual = renderQuestionVisual(q);
    if (visual) card.querySelector(".qvisual").appendChild(visual);
    else card.querySelector(".qvisual").remove();

    const optsEl = card.querySelector(".qopts");
    const fbEl = card.querySelector(".qfeedback");

    q.options.forEach((opt, oi) => {
      const o = document.createElement("div");
      o.className = "qopt";
      o.innerHTML = `<span class="bullet">${String.fromCharCode(65 + oi)}</span><span>${opt}</span>`;
      o.addEventListener("click", () => {
        if (card.dataset.done) return;
        card.dataset.done = "1";
        const opts = [...optsEl.children];
        opts.forEach((el, idx) => {
          el.classList.add("disabled");
          if (idx === q.correct) el.classList.add("correct");
        });
        const isCorrect = oi === q.correct;
        if (!isCorrect) o.classList.add("wrong");
        state.answered++;
        if (isCorrect) state.correct++;
        fbEl.classList.add("show", isCorrect ? "ok" : "no");
        fbEl.textContent = (isCorrect ? "✓ Doğru — " : "✕ Tekrar düşün — ") + (q.explain || "");
        updateSummary();
      });
      optsEl.appendChild(o);
    });
    wrap.appendChild(card);
  });

  const summary = document.createElement("div");
  summary.className = "quiz-summary";
  wrap.appendChild(summary);

  function updateSummary() {
    summary.innerHTML = `
      <div>
        <div class="small" style="color:#b7c6e6">İlerleme</div>
        <div class="score">${state.answered}/${questions.length} yanıtlandı · <span>${state.correct}</span> doğru</div>
      </div>
      ${state.answered === questions.length ? `<div class="badge-live" style="color:#7CE0A8">Modül tamamlandı</div>` : ""}
    `;
    if (state.answered === questions.length && moduleKey) {
      markModuleScore(moduleKey, state.correct, questions.length);
    }
  }
  updateSummary();
}

/** Keşif günlüğü (yansıtma notu) — localStorage'a otomatik kaydeder */
export function bindJournal(textareaEl, key) {
  const saveState = textareaEl.parentElement.querySelector(".save-state");
  const full = "gazlab10_journal_" + key;
  const saved = localStorage.getItem(full);
  if (saved) textareaEl.value = saved;
  let t;
  textareaEl.addEventListener("input", () => {
    clearTimeout(t);
    if (saveState) saveState.textContent = "";
    t = setTimeout(() => {
      localStorage.setItem(full, textareaEl.value);
      if (saveState) { saveState.textContent = "✓ Kaydedildi (bu tarayıcıda saklanır)"; }
    }, 500);
  });
}
