document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (persists per-viewer via localStorage; safe if unavailable).
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function currentTheme() {
  const attr = root.getAttribute('data-theme');
  if (attr) return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// BibTeX toggles.
document.querySelectorAll('.badge-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const isHidden = target.hasAttribute('hidden');
    if (isHidden) {
      target.removeAttribute('hidden');
      btn.textContent = '[Hide BibTeX]';
    } else {
      target.setAttribute('hidden', '');
      btn.textContent = '[BibTeX]';
    }
  });
});
