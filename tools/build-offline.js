#!/usr/bin/env node
/* =========================================================
   GazLab 10 — build-offline.js
   Sitenin ES module tabanlı JS'ini, her dosyayı kendi izole
   fonksiyon kapsamında (IIFE) saran tek bir klasik (non-module)
   script paketine dönüştürüp offline/ klasörüne yazar. Böylece
   akıllı tahta / öğretmen bilgisayarında sunucu kurmadan, dosya
   çift tıklanarak (file://) internet olmadan açılabilir.

   Her modül gerçek ES module semantiğine benzer şekilde izole
   bir kapsamda çalışır (bkz. wrapModule) — bu yüzden örn. hem
   three.module.js hem de OrbitControls.js içinde bağımsız olarak
   tanımlanan aynı isimli değişkenler (ör. "_ray") çakışmaz.

   Çalıştırma: node tools/build-offline.js
   ========================================================= */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "offline");

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}
function write(p, content) {
  const full = path.join(OUT, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

// "../assets/js/nav.js?v=3" / "three" / "three/addons/controls/OrbitControls.js" -> geçerli JS tanımlayıcısı
function resolveKey(importPath) {
  let base;
  if (importPath === "three") base = "three";
  else if (importPath.includes("OrbitControls")) base = "orbitcontrols";
  else base = importPath.split("/").pop().split("?")[0].replace(/\.js$/, "");
  return base.replace(/[^A-Za-z0-9_]/g, "_");
}

const IMPORT_RE = () => /^[ \t]*import\s+(?:\*\s+as\s+(\w+)|\{([^}]+)\})\s+from\s+["']([^"']+)["'];[ \t]*$/gm;

function extractImports(raw) {
  const re = IMPORT_RE();
  const imports = [];
  let m;
  while ((m = re.exec(raw))) {
    const [, namespaceName, namedList, source] = m;
    const depKey = resolveKey(source);
    if (namespaceName) {
      imports.push({ paramPattern: namespaceName, argExpr: `__mod_${depKey}` });
    } else {
      const names = namedList.split(",").map((s) => s.trim()).filter(Boolean);
      imports.push({ paramPattern: `{ ${names.join(", ")} }`, argExpr: `__mod_${depKey}` });
    }
  }
  return imports;
}

function extractExports(raw) {
  const names = new Set();
  const declRe = /^[ \t]*export\s+(?:const|function|class)\s+([A-Za-z0-9_$]+)/gm;
  let m;
  while ((m = declRe.exec(raw))) names.add(m[1]);
  const bulkRe = /^[ \t]*export\s*\{([\s\S]*?)\};[ \t]*$/gm;
  while ((m = bulkRe.exec(raw))) {
    m[1].split(",").map((s) => s.trim()).filter(Boolean).forEach((n) => names.add(n));
  }
  return [...names];
}

function stripImportsAndExports(raw) {
  raw = raw.replace(IMPORT_RE(), "");
  raw = raw.replace(/^([ \t]*)export\s+(const|class|function)\s/gm, "$1$2 ");
  raw = raw.replace(/^[ \t]*export\s*\{[\s\S]*?\};[ \t]*$/gm, "");
  return raw;
}

// Bir modül dosyasını kendi izole IIFE kapsamına saran kod üretir:
//   const __mod_xxx = (function(bağımlılık1, bağımlılık2) { ...gövde... return {dışa aktarılanlar}; })(arg1, arg2);
function wrapModule(key, raw) {
  const imports = extractImports(raw);
  const exportNames = extractExports(raw);
  const body = stripImportsAndExports(raw);
  const params = imports.map((i) => i.paramPattern).join(", ");
  const args = imports.map((i) => i.argExpr).join(", ");
  return `const __mod_${key} = (function(${params}) {\n${body}\nreturn { ${exportNames.join(", ")} };\n})(${args});`;
}

// ---- Modülleri bağımlılık sırasına göre derle ----
const MODULES = [
  ["quiz_engine", "assets/js/quiz-engine.js"],
  ["nav", "assets/js/nav.js"],
  ["quiz_data", "assets/js/quiz-data.js"],
  ["charts", "assets/js/charts.js"],
  ["unit_converter", "assets/js/unit-converter.js"],
  ["three", "assets/vendor/three/three.module.js"],
  ["orbitcontrols", "assets/vendor/three/examples/jsm/controls/OrbitControls.js"],
  ["gas_engine", "assets/js/gas-engine.js"],
];

const bundleParts = [
  "/* GazLab 10 — offline-bundle.js (otomatik üretildi, elle düzenlemeyin) */",
  "/* Kaynak: tools/build-offline.js */",
];
for (const [key, file] of MODULES) {
  bundleParts.push(wrapModule(key, read(file)));
}
write("assets/js/offline-bundle.js", bundleParts.join("\n\n"));

// ---- CSS'i kopyala ----
write("assets/css/style.css", read("assets/css/style.css"));

// ---- Ders defteri ve soru bankası PDF'lerini kopyala (varsa) ----
for (const pdfName of ["Gazlar Ders Defteri.pdf", "Soru Bankası.pdf"]) {
  if (fs.existsSync(path.join(ROOT, pdfName))) {
    fs.mkdirSync(OUT, { recursive: true });
    fs.copyFileSync(path.join(ROOT, pdfName), path.join(OUT, pdfName));
  }
}

// ---- HTML sayfalarını dönüştür ----
function convertHtml(srcPath, depth) {
  let html = read(srcPath);
  html = html.replace(/\n?<script type="importmap">[\s\S]*?<\/script>\n?/, "\n");
  html = html.replace(/(href="[^"]+\.css)\?v=\d+"/g, '$1"');

  const prefix = depth === 0 ? "" : "../".repeat(depth);
  const bundleTag = `<script src="${prefix}assets/js/offline-bundle.js"></script>`;

  html = html.replace(/<script type="module">([\s\S]*?)<\/script>/, (m, body) => {
    const imports = extractImports(body);
    const destructures = imports
      .map((i) => `const ${i.paramPattern} = ${i.argExpr};`)
      .join("\n  ");
    const cleaned = body.replace(IMPORT_RE(), "");
    return `${bundleTag}\n<script>\n  ${destructures}\n${cleaned}</script>`;
  });

  return html;
}

write("index.html", convertHtml("index.html", 0));
write("yanlislarim.html", convertHtml("yanlislarim.html", 0));
for (const name of fs.readdirSync(path.join(ROOT, "moduller"))) {
  if (!name.endsWith(".html")) continue;
  write(`moduller/${name}`, convertHtml(`moduller/${name}`, 1));
}

console.log("✔ offline/ klasörü oluşturuldu:", OUT);
