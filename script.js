
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
const navbar = document.getElementById('navbar');

function handleScroll() {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrolled / total) * 100) + '%';
  
  if (scrolled > 20) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
}

document.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);



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



const ADMIN_USER = 'portfolio';
const ADMIN_PASS = 'lacha@123';
const ADMIN_STORAGE_KEY = 'portfolio_admin_authed';
const adminSection = document.getElementById('admin');
const loginBtn = document.getElementById('admin-login-btn');
const loginError = document.getElementById('login-error');

function isAdminAuthed() {
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
}

function setAdminAuthed(value) {
  if (value) {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

function showAdminArea() {
  document.body.classList.add('admin-enabled');
  if (isAdminAuthed()) {
    document.body.classList.add('admin-authed');
    renderResponses();
  } else {
    document.body.classList.remove('admin-authed');
  }
}

function hideAdminArea() {
  document.body.classList.remove('admin-enabled', 'admin-authed');
}

function updateAdminVisibility() {
  if (isAdminAuthed() || new URLSearchParams(window.location.search).get('admin') === '1') {
    showAdminArea();
  } else {
    hideAdminArea();
  }
}

updateAdminVisibility();

loginBtn.addEventListener('click', () => {
  const user = document.getElementById('admin-user').value.trim();
  const pass = document.getElementById('admin-pass').value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    loginError.textContent = '';
    loginError.classList.remove('visible');
    setAdminAuthed(true);
    showAdminArea();
  } else {
    loginError.textContent = 'Incorrect username or password.';
    loginError.classList.add('visible');
  }
});


document.getElementById('admin-pass').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});


document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key.toLowerCase() === 'a') {
    showAdminArea();
  }
});


document.getElementById('admin-logout-btn').addEventListener('click', () => {
  setAdminAuthed(false);
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
  hideAdminArea();
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


// Scroll Reveal Observer for About Me & other animated items
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08
});

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
  revealObserver.observe(el);
});

// --- NEW ANIMATIONS FOR ABOUT ME SECTION ---

// 1. Text Splitting Reveal Utility
function splitTextIntoSpans(element) {
  if (!element || element.dataset.split === 'true') return;
  element.dataset.split = 'true';

  let newHTML = '';
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      words.forEach(word => {
        if (word.trim() === '') {
          newHTML += word;
        } else {
          newHTML += `<span class="anim-word-wrapper"><span class="anim-word">${word}</span></span>`;
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const inlineTags = ['STRONG', 'EM', 'A', 'SPAN'];
      if (inlineTags.includes(node.tagName) || node.classList.contains('serif-text')) {
        const words = node.textContent.split(/(\s+)/);
        let innerHTML = '';
        words.forEach(word => {
          if (word.trim() === '') {
            innerHTML += word;
          } else {
            innerHTML += `<span class="anim-word-wrapper"><span class="anim-word">${word}</span></span>`;
          }
        });
        const clone = node.cloneNode(false);
        clone.innerHTML = innerHTML;
        newHTML += clone.outerHTML;
      } else {
        newHTML += node.outerHTML;
      }
    }
  });
  element.innerHTML = newHTML;

  // Resolve base delay from parent transition-delay
  let baseDelay = 0.05;
  const parentDelayAttr = element.style.transitionDelay || window.getComputedStyle(element).transitionDelay;
  if (parentDelayAttr) {
    const parsed = parseFloat(parentDelayAttr);
    if (!isNaN(parsed)) {
      baseDelay = parsed;
    }
  }

  // Apply staggered delays starting from baseDelay
  let delay = baseDelay;
  const words = element.querySelectorAll('.anim-word');
  words.forEach(word => {
    word.style.transitionDelay = `${delay}s`;
    delay += 0.03; // 30ms stagger
  });
}

// Initialize text splitting for elements marked for text animations
document.querySelectorAll('.reveal-text-anim').forEach(el => {
  splitTextIntoSpans(el);
});

// 2. 3D Tilt and Glare Effect for Photo Card
const card = document.querySelector('.about-image-card');
const wrapper = document.querySelector('.about-card-wrapper');

if (card && wrapper) {
  wrapper.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position inside card
    const y = e.clientY - rect.top;  // Y position inside card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max tilt is 12 degrees)
    const tiltX = ((centerY - y) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 12;

    // Update style with perspective rotation
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';

    // Update custom properties for the CSS glare layer
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${glareX}%`);
    card.style.setProperty('--mouse-y', `${glareY}%`);

    // Pause the CSS gentle float animation during tilt
    wrapper.style.animationPlayState = 'paused';
  });

  wrapper.addEventListener('mouseleave', () => {
    // Reset transform smoothly
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s';
    
    // Resume floating
    wrapper.style.animationPlayState = 'running';
  });
}