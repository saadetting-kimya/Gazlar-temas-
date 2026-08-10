/* =========================================================
   GazLab 10 — nav.js
   Paylaşılan üst menüyü enjekte eder ve aktif sayfayı işaretler.
   ========================================================= */
import { readProgress } from "./quiz-engine.js?v=2";

// Sayfa "moduller/" içindeyse "../" ile köke çık, sitede değilse dosya adını doğrudan kullan.
// Bu sayede site ister kök dizinde ister bir alt yolda (ör. GitHub Pages proje sayfası) yayınlansın
// bağlantılar bozulmaz.
const inModules = location.pathname.includes("/moduller/");
function link(path) {
  if (!inModules) return path;
  return path.startsWith("moduller/") ? path.slice("moduller/".length) : "../" + path;
}

const LINKS = [
  { href: link("index.html"), label: "Ana Sayfa", key: "home", num: "" },
  { href: link("moduller/01-kmt.html"), label: "Özellikler & KMT", key: "kmt", num: "1" },
  { href: link("moduller/02-gaz-yasalari.html"), label: "Gaz Yasaları", key: "yasalar", num: "2" },
  { href: link("moduller/03-ideal-gaz.html"), label: "İdeal Gaz & Serbest Mod", key: "ideal", num: "3" },
  { href: link("moduller/04-difuzyon-efuzyon.html"), label: "Difüzyon & Efüzyon", key: "difuzyon", num: "4" },
];

export function mountNav(activeKey) {
  const host = document.getElementById("nav-root");
  if (!host) return;
  const progress = readProgress();

  host.innerHTML = `
    <nav class="topnav">
      <div class="topnav-inner">
        <a class="brand" href="${link("index.html")}">
          <span class="brand-badge"></span>
          <span>GazLab 10</span>
        </a>
        <div class="navlinks">
          ${LINKS.map(l => {
            const done = progress[l.key] && (progress[l.key].visited || progress[l.key].score !== undefined);
            return `<a href="${l.href}" class="${l.key === activeKey ? "active" : ""}">
              ${l.num ? `<span class="num">${l.num}</span>` : ""}${l.label}${done && l.key !== "home" ? " ✓" : ""}
            </a>`;
          }).join("")}
        </div>
      </div>
    </nav>
  `;
}

export function mountFooter() {
  const host = document.getElementById("footer-root");
  if (!host) return;
  host.innerHTML = `
    <footer>
      <div class="container">
        <p style="margin-bottom:6px"><strong style="color:var(--ink)">GazLab 10</strong> — 10. Sınıf Kimya, Gazlar Teması için üç boyutlu sanal laboratuvar.</p>
        <p class="mt-0">İçerik yalnızca paylaşılan kazanımlarla (gazların özellikleri ve kinetik moleküler teori · gaz yasaları · ideal gaz yasası · Graham difüzyon-efüzyon yasası) sınırlıdır. Sayısal modeller kavramsal sadelik için ölçeklendirilmiştir.</p>
      </div>
    </footer>
  `;
}
