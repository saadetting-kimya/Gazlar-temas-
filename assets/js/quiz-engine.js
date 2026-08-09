/* =========================================================
   GazLab 10 — quiz-engine.js
   Bağlam temelli değerlendirme sorularını render eder,
   puanlar ve sonucu localStorage'a kaydeder (ilerleme takibi).
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
      <div class="qtext">${q.text}</div>
      <div class="qopts"></div>
      <div class="qfeedback"></div>
    `;
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
