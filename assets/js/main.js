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
document.querySelectorAll('.text-btn[data-target]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const isHidden = target.hasAttribute('hidden');
    if (isHidden) {
      target.removeAttribute('hidden');
      btn.textContent = 'Hide';
    } else {
      target.setAttribute('hidden', '');
      btn.textContent = 'Cite';
    }
  });
});

// Scrollspy: highlight the sidebar nav entry for the section in view.
const navLinks = Array.from(document.querySelectorAll('.side-nav a'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const setActive = (id) => {
    navLinks.forEach((link) => {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) {
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach((section) => observer.observe(section));
}
