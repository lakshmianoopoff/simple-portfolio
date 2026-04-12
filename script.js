
const html       = document.documentElement;
const themeBtn   = document.getElementById('themeBtn');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    themeIcon.textContent  = '☀️';
    themeLabel.textContent = 'Light';
  } else {
    themeIcon.textContent  = '🌙';
    themeLabel.textContent = 'Dark';
  }
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


const progressBar = document.getElementById('scroll-progress');

document.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrolled / total) * 100) + '%';
});



const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));


const LS_KEY = 'portfolio_contact_responses';

function getResponses() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveResponses(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}


const submitBtn  = document.getElementById('submit-contact');
const formStatus = document.getElementById('form-status');

submitBtn.addEventListener('click', () => {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value.trim();


  if (!name || !email || !subject || !message) {
    formStatus.className   = 'error';
    formStatus.textContent = '⚠ Please fill in all fields before submitting.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.className   = 'error';
    formStatus.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  const entry = {
    id:        Date.now(),
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()     // ISO 8601 — easy to format later
  };


  const responses = getResponses();
  responses.unshift(entry);
  saveResponses(responses);


  document.getElementById('cf-name').value    = '';
  document.getElementById('cf-email').value   = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-message').value = '';


  formStatus.className   = 'success';
  formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';

  setTimeout(() => {
    formStatus.className   = '';
    formStatus.textContent = '';
  }, 4000);
});



const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const loginBtn   = document.getElementById('admin-login-btn');
const loginError = document.getElementById('login-error');

loginBtn.addEventListener('click', () => {
  const user = document.getElementById('admin-user').value.trim();
  const pass = document.getElementById('admin-pass').value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    loginError.classList.remove('visible');
    document.body.classList.add('admin-authed');  // CSS swaps panels
    renderResponses();
  } else {
    loginError.classList.add('visible');
  }
});


document.getElementById('admin-pass').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});



document.getElementById('admin-logout-btn').addEventListener('click', () => {
  document.body.classList.remove('admin-authed');
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
});



function formatTimestamp(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

function renderResponses() {
  const list       = document.getElementById('responses-list');
  const countBadge = document.getElementById('response-count');
  const responses  = getResponses();

  countBadge.textContent = responses.length;

  if (responses.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">📭</div>
        <p>No messages yet. Share your portfolio and check back later!</p>
      </div>`;
    return;
  }

  list.innerHTML = responses.map((r, i) => `
    <article class="response-card" style="animation-delay: ${i * 0.06}s">
      <div class="response-meta">
        <div class="response-name">${escHtml(r.name)}</div>
        <div class="response-time">🕐 ${formatTimestamp(r.timestamp)}</div>
      </div>
      <div class="response-email">✉ ${escHtml(r.email)}</div>
      <div class="response-subject">Re: ${escHtml(r.subject)}</div>
      <div class="response-msg">${escHtml(r.message)}</div>
    </article>
  `).join('');
}


document.getElementById('clear-responses-btn').addEventListener('click', () => {
  if (confirm('Delete all stored responses? This cannot be undone.')) {
    localStorage.removeItem(LS_KEY);
    renderResponses();
  }
});


window.addEventListener('storage', (e) => {
  if (e.key === LS_KEY && document.body.classList.contains('admin-authed')) {
    renderResponses();
  }
});