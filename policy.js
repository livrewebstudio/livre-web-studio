/* ═══════════════════════════════════════════════════════
   AstroPhonia — Pagine legali
   Sincronizza le schede lingua con la lingua scelta nel sito.
   ═══════════════════════════════════════════════════════ */

const POLICY_DATE = {
  en: 'Last updated: July 2026',
  it: 'Ultimo aggiornamento: luglio 2026',
  pt: 'Última atualização: julho de 2026'
};

function showPolicyLang(lang) {
  if (!POLICY_DATE[lang]) lang = 'en';

  document.querySelectorAll('.policy-section').forEach(section => {
    section.classList.toggle('active', section.id.endsWith('-' + lang));
  });

  document.querySelectorAll('.policy-lang-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.lang === lang);
  });

  const dateEl = document.getElementById('policy-date');
  if (dateEl) dateEl.textContent = POLICY_DATE[lang];
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = typeof getSavedLang === 'function' ? getSavedLang() : null;
  showPolicyLang(saved || 'en');
});
