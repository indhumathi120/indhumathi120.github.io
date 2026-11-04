/**
 * Indhumathi C - Portfolio Logic & Interactivity
 * Professional, accessible and lightweight interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSkillsTabs();
  initArchitectureViewer();
  initCopyActions();
  initContactForm();
  initResumePrint();
  initLucide();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Theme Management
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  const savedTheme = localStorage.getItem('indhumathi_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('indhumathi_portfolio_theme', target);
    updateThemeIcons(target);
  };

  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggle);
}

function updateThemeIcons(theme) {
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const sunIcons = document.querySelectorAll('.theme-icon-sun');

  if (theme === 'light') {
    moonIcons.forEach(i => i.classList.remove('hidden'));
    sunIcons.forEach(i => i.classList.add('hidden'));
  } else {
    moonIcons.forEach(i => i.classList.add('hidden'));
    sunIcons.forEach(i => i.classList.remove('hidden'));
  }
}

// 2. Mobile Navigation
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 3. Skills Filter Tabs
function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-group');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
        t.classList.add('bg-slate-800/60', 'text-slate-400', 'border-slate-700/60');
      });
      tab.classList.add('bg-blue-600', 'text-white', 'border-blue-500');
      tab.classList.remove('bg-slate-800/60', 'text-slate-400', 'border-slate-700/60');

      const filter = tab.getAttribute('data-category');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 4. Architecture Case Studies Switcher
function initArchitectureViewer() {
  const buttons = document.querySelectorAll('.arch-selector-btn');
  const panels = document.querySelectorAll('.arch-panel');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('border-l-4', 'border-blue-500', 'bg-slate-800/90', 'text-white');
        b.classList.add('border-l-2', 'border-slate-800', 'text-slate-400', 'bg-slate-900/40');
      });

      btn.classList.add('border-l-4', 'border-blue-500', 'bg-slate-800/90', 'text-white');
      btn.classList.remove('border-l-2', 'border-slate-800', 'text-slate-400', 'bg-slate-900/40');

      const targetId = btn.getAttribute('data-target');

      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });
}

// 5. Copy Clipboard with Clean Feedback
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-copy-val');
      if (value) {
        navigator.clipboard.writeText(value).then(() => {
          showToast(`Copied to clipboard: "${value}"`);
        }).catch(() => {
          showToast('Copied to clipboard');
        });
      }
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// 6. Contact Form Pre-population & Dispatch
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const organization = document.getElementById('form-org')?.value.trim() || 'N/A';
    const subject = document.getElementById('form-subject')?.value.trim() || 'Inquiry regarding Backend / AI Engineering';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields.');
      return;
    }

    const body = `Hi Indhumathi,\n\nName: ${name}\nEmail: ${email}\nCompany/Org: ${organization}\n\nMessage:\n${message}\n\n---\nSent via your portfolio website.`;
    const mailto = `mailto:indhudurai201@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    showToast('Redirecting to your email client to send message...');
    form.reset();
  });
}

// 7. Resume Print / PDF Export
function initResumePrint() {
  const printBtns = document.querySelectorAll('.print-resume-btn');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}
