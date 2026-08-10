/* =========================================================
   GazLab 10 — unit-converter.js
   Sıcaklık, basınç ve hacim birimleri arasında canlı çevirici.
   Kitaptaki dönüşüm kurallarını (T(K)=t(°C)+273, 1 atm=76 cmHg=
   760 mmHg=101 325 Pa, 1 L=1 dm³=1000 mL=1000 cm³ vb.) kullanır.
   ========================================================= */

function superscript(n) {
  const map = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(n).split("").map((c) => map[c] ?? c).join("");
}

function fmtNum(v) {
  if (!isFinite(v)) return "–";
  if (v === 0) return "0";
  const abs = Math.abs(v);
  if (abs >= 1e9 || abs < 1e-6) {
    const [mant, exp] = v.toExponential(3).split("e");
    return `${mant.replace(".", ",")}·10${superscript(parseInt(exp, 10))}`;
  }
  // ~4 anlamlı basamak gösterecek ondalık basamak sayısını hesapla,
  // böylece küçük değerler (ör. 2 Pa'nın atm karşılığı) "0" olarak yuvarlanmaz.
  const decimals = Math.max(0, 3 - Math.floor(Math.log10(abs)));
  let s = v.toFixed(Math.min(decimals, 12));
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  const [intPartRaw, decPart] = s.split(".");
  const neg = intPartRaw.startsWith("-");
  const intPart = (neg ? intPartRaw.slice(1) : intPartRaw).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (neg ? "-" : "") + intPart + (decPart ? "," + decPart : "");
}

const CATEGORIES = [
  {
    key: "temp", title: "🌡️ Sıcaklık", defaultUnit: "°C", defaultValue: 25,
    note: "T(K) = t(°C) + 273",
    units: {
      "°C": { toBase: (c) => c + 273, fromBase: (k) => k - 273 },
      "K": { toBase: (k) => k, fromBase: (k) => k },
    },
  },
  {
    key: "pressure", title: "🧭 Basınç", defaultUnit: "atm", defaultValue: 1,
    note: "1 atm = 76 cmHg = 760 mmHg = 760 torr = 101 325 Pa = 101,325 kPa ≈ 1,013 bar",
    units: {
      "atm": { toBase: (v) => v, fromBase: (v) => v },
      "cmHg": { toBase: (v) => v / 76, fromBase: (v) => v * 76 },
      "mmHg": { toBase: (v) => v / 760, fromBase: (v) => v * 760 },
      "torr": { toBase: (v) => v / 760, fromBase: (v) => v * 760 },
      "Pa": { toBase: (v) => v / 101325, fromBase: (v) => v * 101325 },
      "kPa": { toBase: (v) => v / 101.325, fromBase: (v) => v * 101.325 },
      "bar": { toBase: (v) => v / 1.01325, fromBase: (v) => v * 1.01325 },
    },
  },
  {
    key: "volume", title: "📦 Hacim", defaultUnit: "L", defaultValue: 1,
    note: "1 L = 1 dm³ = 1 000 mL = 1 000 cm³ = 1 000 000 mm³ = 0,001 m³",
    units: {
      "L": { toBase: (v) => v, fromBase: (v) => v },
      "dm³": { toBase: (v) => v, fromBase: (v) => v },
      "mL": { toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      "cm³": { toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      "mm³": { toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      "m³": { toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
];

export function mountUnitConverter(hostEl) {
  hostEl.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "grid grid-3 uc-grid";
  hostEl.appendChild(grid);

  CATEGORIES.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "card uc-card";
    const unitNames = Object.keys(cat.units);
    card.innerHTML = `
      <h3 style="font-size:15px; margin-bottom:10px">${cat.title}</h3>
      <div class="control-row uc-input-row" style="grid-template-columns:1fr 96px">
        <input type="number" class="uc-input" value="${cat.defaultValue}" step="any" />
        <select class="uc-unit">
          ${unitNames.map((u) => `<option value="${u}" ${u === cat.defaultUnit ? "selected" : ""}>${u}</option>`).join("")}
        </select>
      </div>
      <div class="uc-results"></div>
      <p class="small" style="margin-top:8px">${cat.note}</p>
    `;
    grid.appendChild(card);

    const input = card.querySelector(".uc-input");
    const unitSel = card.querySelector(".uc-unit");
    const results = card.querySelector(".uc-results");

    function render() {
      const raw = parseFloat(input.value);
      const val = isFinite(raw) ? raw : 0;
      const base = cat.units[unitSel.value].toBase(val);
      results.innerHTML = unitNames
        .filter((u) => u !== unitSel.value)
        .map((u) => {
          const out = cat.units[u].fromBase(base);
          return `<div class="uc-chip"><span class="uc-chip-v">${fmtNum(out)}</span><span class="uc-chip-u">${u}</span></div>`;
        })
        .join("");
    }
    input.addEventListener("input", render);
    unitSel.addEventListener("change", render);
    render();
  });
}
