/* =========================================================
   GazLab 10 — report.js
   Öğrenci Analiz Raporu (AtomLab 9'daki sistemle birebir aynı):
   kazanım/modül bazlı öğrenme istatistikleri, yanlış soruların
   ayrıntılı analizi ve yazdırılabilir (PDF) bir rapor üretir.
   Veri kaynağı: quiz-engine.js'in yazdığı gazlab10_learning,
   gazlab10_learning_history ve gazlab10_errors localStorage
   anahtarları.
   ========================================================= */

const REPORT_LEARNING_KEY = "gazlab10_learning";
const REPORT_ERROR_KEY = "gazlab10_errors";
const REPORT_HISTORY_KEY = "gazlab10_learning_history";

/* ================= yardımcı ================= */

function reportSafeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) ?? fallback) : fallback;
  } catch {
    return fallback;
  }
}

function reportEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ================= modül adları ================= */

const REPORT_MODULE_NAMES = {
  kmt: "Gazların Özellikleri & Kinetik Moleküler Teori",
  yasalar: "Gaz Yasaları",
  ideal: "İdeal Gaz Yasası",
  difuzyon: "Graham Difüzyon ve Efüzyon Yasası",
};

function getReportModuleName(key) {
  return REPORT_MODULE_NAMES[key] || key || "Bilinmeyen Modül";
}

/* ================= öğrenme durumu ================= */

function getReportStatus(correct, attempts) {
  if (!attempts) return { text: "Henüz ölçülmedi", className: "report-status-new" };
  const percentage = Math.round((correct / attempts) * 100);
  if (attempts < 2) return { text: "İlk ölçüm", className: "report-status-new" };
  if (percentage >= 80) return { text: "Ulaştı", className: "report-status-good" };
  if (percentage >= 60) return { text: "Gelişiyor", className: "report-status-mid" };
  return { text: "Desteğe ihtiyaç var", className: "report-status-low" };
}

/* ================= tarih ================= */

function getReportDate() {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    }).format(new Date());
  } catch {
    return new Date().toLocaleString("tr-TR");
  }
}

/* ================= genel istatistikler ================= */

function calculateGeneralReportStats(learning) {
  let attempts = 0, correct = 0, wrong = 0;
  Object.values(learning || {}).forEach((item) => {
    attempts += Number(item?.attempts || 0);
    correct += Number(item?.correct || 0);
    wrong += Number(item?.wrong || 0);
  });
  const percentage = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
  return { attempts, correct, wrong, percentage };
}

/* ================= modül raporu ================= */

function createModuleReportRows(learning) {
  const moduleData = {};
  Object.values(learning || {}).forEach((kazanimData) => {
    const modules = kazanimData?.modules || {};
    Object.entries(modules).forEach(([moduleKey, data]) => {
      if (!moduleData[moduleKey]) moduleData[moduleKey] = { attempts: 0, correct: 0, wrong: 0 };
      moduleData[moduleKey].attempts += Number(data?.attempts || 0);
      moduleData[moduleKey].correct += Number(data?.correct || 0);
      moduleData[moduleKey].wrong += Number(data?.wrong || 0);
    });
  });

  const entries = Object.entries(moduleData);
  if (entries.length === 0) {
    return `<tr><td colspan="6">Henüz modül performans verisi bulunmuyor.</td></tr>`;
  }

  return entries.map(([moduleKey, data]) => {
    const percentage = data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0;
    const status = getReportStatus(data.correct, data.attempts);
    return `
      <tr>
        <td>${reportEscape(getReportModuleName(moduleKey))}</td>
        <td class="number-cell">${data.attempts}</td>
        <td class="number-cell">${data.correct}</td>
        <td class="number-cell">${data.wrong}</td>
        <td class="number-cell">%${percentage}</td>
        <td><span class="report-status ${status.className}">${status.text}</span></td>
      </tr>
    `;
  }).join("");
}

/* ================= kazanım raporu ================= */

function createKazanımReportRows(learning) {
  const entries = Object.entries(learning || {});
  if (entries.length === 0) {
    return `<tr><td colspan="6">Henüz kazanım verisi bulunmuyor.</td></tr>`;
  }

  return entries.map(([kazanim, data]) => {
    const attempts = Number(data?.attempts || 0);
    const correct = Number(data?.correct || 0);
    const wrong = Number(data?.wrong || 0);
    const percentage = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
    const status = getReportStatus(correct, attempts);
    return `
      <tr>
        <td class="kazanım-cell">${reportEscape(kazanim)}</td>
        <td class="number-cell">${attempts}</td>
        <td class="number-cell">${correct}</td>
        <td class="number-cell">${wrong}</td>
        <td class="number-cell">%${percentage}</td>
        <td><span class="report-status ${status.className}">${status.text}</span></td>
      </tr>
    `;
  }).join("");
}

/* ================= yanlış sorular tablosu ================= */

function createWrongQuestionRows(errors) {
  const rows = [];
  Object.entries(errors || {}).forEach(([moduleKey, moduleErrors]) => {
    Object.values(moduleErrors || {}).forEach((item) => {
      rows.push({
        module: getReportModuleName(moduleKey),
        kazanim: item?.kazanim || "Kazanım belirtilmemiş",
        context: item?.context || "",
        question: item?.text || "",
        wrongCount: Number(item?.wrongCount || 1),
        explain: item?.explain || "",
      });
    });
  });

  if (rows.length === 0) {
    return `<tr><td colspan="6">Kayıtlı yanlış soru bulunmuyor.</td></tr>`;
  }

  rows.sort((a, b) => b.wrongCount - a.wrongCount);

  return rows.map((item) => `
    <tr>
      <td>${reportEscape(item.module)}</td>
      <td>${reportEscape(item.kazanim)}</td>
      <td>${reportEscape(item.context)}</td>
      <td class="wrong-question-text">${reportEscape(item.question)}</td>
      <td class="number-cell">${item.wrongCount}</td>
      <td>${reportEscape(item.explain)}</td>
    </tr>
  `).join("");
}

/* ================= en güçlü / geliştirilecek kazanımlar ================= */

function createLearningSummary(learning) {
  const results = Object.entries(learning || {})
    .map(([kazanim, data]) => {
      const attempts = Number(data?.attempts || 0);
      const correct = Number(data?.correct || 0);
      return { kazanim, attempts, percentage: attempts > 0 ? Math.round((correct / attempts) * 100) : 0 };
    })
    .filter((item) => item.attempts > 0);

  if (results.length === 0) {
    return `<p>Henüz öğrenme yorumu oluşturmak için yeterli veri bulunmuyor.</p>`;
  }

  const strongest = [...results].sort((a, b) => b.percentage - a.percentage)[0];
  const weakest = [...results].sort((a, b) => a.percentage - b.percentage)[0];

  return `
    <div class="report-comment-grid">
      <div class="report-comment-card report-comment-good">
        <div class="report-comment-label">💪 Güçlü Kazanım</div>
        <strong>${reportEscape(strongest.kazanim)}</strong>
        <div>Başarı: %${strongest.percentage}</div>
      </div>
      <div class="report-comment-card report-comment-low">
        <div class="report-comment-label">🎯 Öncelikli Pekiştirme</div>
        <strong>${reportEscape(weakest.kazanim)}</strong>
        <div>Başarı: %${weakest.percentage}</div>
      </div>
    </div>
  `;
}

/* ================= pekiştirme sayısı ================= */

function calculateRemediationStats(history) {
  const total = Array.isArray(history) ? history.length : 0;
  const wrong = Array.isArray(history) ? history.filter((item) => item?.correct === false).length : 0;
  const correct = Array.isArray(history) ? history.filter((item) => item?.correct === true).length : 0;
  return { total, correct, wrong };
}

/* ================= raporu oluştur ================= */

function buildStudentPrintReport() {
  const reportEl = document.getElementById("studentPrintReport");
  if (!reportEl) {
    console.warn("studentPrintReport alanı bulunamadı.");
    return false;
  }

  const learning = reportSafeParse(REPORT_LEARNING_KEY, {});
  const errors = reportSafeParse(REPORT_ERROR_KEY, {});
  const history = reportSafeParse(REPORT_HISTORY_KEY, []);

  const general = calculateGeneralReportStats(learning);
  const activity = calculateRemediationStats(history);

  const studentName = document.getElementById("reportStudentName")?.value.trim() || "................................";
  const studentClass = document.getElementById("reportStudentClass")?.value.trim() || "........";
  const studentNo = document.getElementById("reportStudentNo")?.value.trim() || "........";

  reportEl.innerHTML = `
    <article class="report-page">

      <header class="report-header">
        <div class="report-logo">💨</div>
        <div>
          <h1>GAZLAB 10</h1>
          <h2>Öğrenme Analiz Raporu</h2>
        </div>
      </header>

      <section class="report-student-info">
        <div><span>Öğrenci</span><strong>${reportEscape(studentName)}</strong></div>
        <div><span>Sınıf / Şube</span><strong>${reportEscape(studentClass)}</strong></div>
        <div><span>Numara</span><strong>${reportEscape(studentNo)}</strong></div>
        <div><span>Rapor Tarihi</span><strong>${reportEscape(getReportDate())}</strong></div>
      </section>

      <section class="report-section">
        <h3>📌 Genel Performans</h3>
        <div class="report-stat-grid">
          <div class="report-stat"><span>Toplam Cevap</span><strong>${general.attempts}</strong></div>
          <div class="report-stat report-stat-good"><span>Doğru</span><strong>${general.correct}</strong></div>
          <div class="report-stat report-stat-low"><span>Yanlış</span><strong>${general.wrong}</strong></div>
          <div class="report-stat report-stat-main"><span>Başarı</span><strong>%${general.percentage}</strong></div>
        </div>
      </section>

      <section class="report-section">
        <h3>📚 Modül Bazlı Başarı</h3>
        <div class="report-table-wrap">
          <table class="report-table">
            <thead><tr><th>Modül</th><th>Cevap</th><th>Doğru</th><th>Yanlış</th><th>Başarı</th><th>Durum</th></tr></thead>
            <tbody>${createModuleReportRows(learning)}</tbody>
          </table>
        </div>
      </section>

      <section class="report-section">
        <h3>🎯 Kazanım Öğrenme Profili</h3>
        <div class="report-table-wrap">
          <table class="report-table">
            <thead><tr><th>Kazanım</th><th>Deneme</th><th>Doğru</th><th>Yanlış</th><th>Başarı</th><th>Öğrenme Durumu</th></tr></thead>
            <tbody>${createKazanımReportRows(learning)}</tbody>
          </table>
        </div>
      </section>

      <section class="report-section">
        <h3>🧠 Öğrenme Yorumu</h3>
        ${createLearningSummary(learning)}
      </section>

      <section class="report-section">
        <h3>🔄 Çalışma Etkinliği</h3>
        <div class="report-activity">
          <div><span>Toplam kayıtlı cevap</span><strong>${activity.total}</strong></div>
          <div><span>Doğru cevap</span><strong>${activity.correct}</strong></div>
          <div><span>Yanlış cevap</span><strong>${activity.wrong}</strong></div>
        </div>
      </section>

      <section class="report-section report-page-break">
        <h3>❌ Yanlış Soruların Ayrıntılı Analizi</h3>
        <div class="report-table-wrap">
          <table class="report-table report-wrong-table">
            <thead><tr><th>Modül</th><th>Kazanım</th><th>Bağlam</th><th>Soru</th><th>Yanlış Sayısı</th><th>Açıklama</th></tr></thead>
            <tbody>${createWrongQuestionRows(errors)}</tbody>
          </table>
        </div>
      </section>

      <section class="report-section">
        <h3>📝 Öğretmen Değerlendirmesi</h3>
        <div class="teacher-note"><div></div><div></div><div></div></div>
      </section>

      <footer class="report-footer">
        <span>GazLab 10</span>
        <span>Öğrenme verilerinden otomatik oluşturulmuştur.</span>
      </footer>

    </article>
  `;

  return true;
}

/* ================= pdf / yazdır ================= */

function openStudentPdfReport() {
  const created = buildStudentPrintReport();
  if (!created) return;

  document.body.classList.add("printing-student-report");
  setTimeout(() => { window.print(); }, 150);
}

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-student-report");
});

/** yanlislarim.html tarafından çağrılır; PDF Raporu Oluştur düğmesini bağlar. */
export function bindStudentReportButton() {
  const button = document.getElementById("createPdfReportBtn");
  if (button) button.addEventListener("click", openStudentPdfReport);
}
