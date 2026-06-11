
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

if (submitBtn) {
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
}



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

if (loginBtn) {
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

  const adminPass = document.getElementById('admin-pass');
  if (adminPass) {
    adminPass.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loginBtn.click();
    });
  }
}


document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key.toLowerCase() === 'a') {
    showAdminArea();
  }
});


const adminLogoutBtn = document.getElementById('admin-logout-btn');
if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', () => {
    setAdminAuthed(false);
    const adminUser = document.getElementById('admin-user');
    const adminPass = document.getElementById('admin-pass');
    if (adminUser) adminUser.value = '';
    if (adminPass) adminPass.value = '';
    hideAdminArea();
  });
}



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

  if(!countBadge || !list) return;

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


const clearBtn = document.getElementById('clear-responses-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('Delete all stored responses? This cannot be undone.')) {
      localStorage.removeItem(LS_KEY);
      renderResponses();
    }
  });
}


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

// ==========================================
// SKILLS ORGANIC ENTRANCE & CONNECTORS
// ==========================================

let skillsTimeouts = [];

function clearSkillsAnimation() {
  // Clear any active timeouts
  skillsTimeouts.forEach(t => clearTimeout(t));
  skillsTimeouts = [];

  // Reset classes on all cards
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    card.classList.remove('card-visible', 'content-visible');
  });

  // Clear SVG paths and endpoints
  const container = document.querySelector('.skills-svg-container');
  if (container) container.innerHTML = '';
}

function drawLine(idxA, idxB, instant = false) {
  const container = document.querySelector('.skills-svg-container');
  if (!container) return;

  const cards = document.querySelectorAll('.skill-card');
  const cardA = cards[idxA];
  const cardB = cards[idxB];
  if (!cardA || !cardB) return;

  const containerRect = container.getBoundingClientRect();
  const rectA = cardA.getBoundingClientRect();
  const rectB = cardB.getBoundingClientRect();

  // If cards are stacked vertically on mobile, skip drawing connector curves
  const isHorizontal = rectB.left > rectA.right - 50;
  if (!isHorizontal) return;

  const paddingX = 22; // Inset from card edges
  const paddingY = 22; // Inset from card top

  const startX = rectA.right - containerRect.left - paddingX;
  const startY = rectA.top - containerRect.top + paddingY;
  const endX = rectB.left - containerRect.left + paddingX;
  const endY = rectB.top - containerRect.top + paddingY;

  const dx = endX - startX;
  const arcHeight = 45;

  const cp1x = startX + dx * 0.25;
  const cp1y = Math.min(startY, endY) - arcHeight;
  const cp2x = startX + dx * 0.75;
  const cp2y = Math.min(startY, endY) - arcHeight;

  // Path
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  path.setAttribute('d', d);
  path.setAttribute('class', 'skill-connector-path');

  // Start Dot
  const circleStart = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleStart.setAttribute('cx', startX);
  circleStart.setAttribute('cy', startY);
  circleStart.setAttribute('r', '3.5');
  circleStart.setAttribute('class', 'skill-connector-dot dot-start');

  // End Dot
  const circleEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleEnd.setAttribute('cx', endX);
  circleEnd.setAttribute('cy', endY);
  circleEnd.setAttribute('r', '3.5');
  circleEnd.setAttribute('class', 'skill-connector-dot dot-end');

  if (instant) {
    path.style.strokeDashoffset = '0';
    path.style.animation = 'none';
    circleStart.classList.remove('dot-start');
    circleStart.style.opacity = '1';
    circleEnd.classList.remove('dot-end');
    circleEnd.style.opacity = '1';
  }

  container.appendChild(path);
  container.appendChild(circleStart);
  container.appendChild(circleEnd);
}

function runSkillsAnimation() {
  clearSkillsAnimation();

  const cards = document.querySelectorAll('.skill-card');
  if (cards.length < 6) return;

  const animateCardSequence = (cardIndex, startTime) => {
    // 1. Reveal card shape
    skillsTimeouts.push(setTimeout(() => {
      cards[cardIndex].classList.add('card-visible');
    }, startTime));

    // 2. Reveal text components sequentially (staggered delay is handled inside CSS based on content-visible class)
    skillsTimeouts.push(setTimeout(() => {
      cards[cardIndex].classList.add('content-visible');
    }, startTime + 100));
  };

  // Card 1
  animateCardSequence(0, 0);

  // Line 01->02
  skillsTimeouts.push(setTimeout(() => {
    drawLine(0, 1);
  }, 300));

  // Card 2
  animateCardSequence(1, 700);

  // Line 02->03
  skillsTimeouts.push(setTimeout(() => {
    drawLine(1, 2);
  }, 1000));

  // Card 3
  animateCardSequence(2, 1400);

  // Card 4 starts right after Card 3 (no line between 3 and 4)
  animateCardSequence(3, 1700);

  // Line 04->05
  skillsTimeouts.push(setTimeout(() => {
    drawLine(3, 4);
  }, 2000));

  // Card 5
  animateCardSequence(4, 2400);

  // Line 05->06
  skillsTimeouts.push(setTimeout(() => {
    drawLine(4, 5);
  }, 2700));

  // Card 6
  animateCardSequence(5, 3100);
}

function initSkillsConnectors() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  // Custom IntersectionObserver to replay animation sequence when scrolling back in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillsSection.classList.add('revealed');
        runSkillsAnimation();
      } else {
        skillsSection.classList.remove('revealed');
        clearSkillsAnimation();
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  observer.observe(skillsSection);

  // Debounced window resize handler to redraw paths instantly on orientation change
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (skillsSection.classList.contains('revealed')) {
        const container = document.querySelector('.skills-svg-container');
        if (container) {
          container.innerHTML = '';
          const pairs = [[0, 1], [1, 2], [3, 4], [4, 5]];
          pairs.forEach(([from, to]) => {
            drawLine(from, to, true);
          });
        }
      }
    }, 150);
  });
}

// Initialize organic skills connectors immediately
initSkillsConnectors();


// ==========================================
// SCROLL-DRIVEN TIMELINE STACKING REVEAL
// ==========================================

function initTimelineScroll() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const items = timeline.querySelectorAll('.timeline-item');
  if (items.length === 0) return;

  function updateTimeline() {
    const windowHeight = window.innerHeight;
    
    // 1. Activate/deactivate items based on their position in viewport
    let lastActiveIndex = -1;
    items.forEach((item, idx) => {
      const rect = item.getBoundingClientRect();
      // Activate if the item's top has scrolled past 75% of the viewport height
      if (rect.top < windowHeight * 0.75) {
        item.classList.add('item-active');
        lastActiveIndex = idx;
      } else {
        item.classList.remove('item-active');
      }
    });

    // 2. Draw line to match active items
    if (lastActiveIndex === -1) {
      timeline.style.setProperty('--line-progress', '0%');
    } else if (lastActiveIndex === items.length - 1) {
      timeline.style.setProperty('--line-progress', '100%');
    } else {
      // Calculate how far the active items reach down the timeline
      const firstRect = items[0].getBoundingClientRect();
      const lastActiveRect = items[lastActiveIndex].getBoundingClientRect();
      
      const totalDistance = items[items.length - 1].getBoundingClientRect().top - firstRect.top;
      const currentDistance = lastActiveRect.top - firstRect.top;
      
      let percentage = 0;
      if (totalDistance > 0) {
        percentage = (currentDistance / totalDistance) * 100;
      }
      
      // Calculate vertical offset relative to timeline container to draw exactly to the dot
      timeline.style.setProperty('--line-progress', `calc(${percentage}% + 12px)`);
    }
  }

  // Use passive event listener for better performance
  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline, { passive: true });
  
  // Initial run
  updateTimeline();
}

// Initialize timeline scrolling animations
initTimelineScroll();


// ==========================================
// CERTIFICATES GALLERY ARCHIVE
// ==========================================

function initCertificatesGallery() {
  const certSection = document.getElementById('certificates');
  if (!certSection) return;

  const filterButtons = certSection.querySelectorAll('.filter-btn');
  const gridItems = certSection.querySelectorAll('.cert-grid-item');
  const cards = certSection.querySelectorAll('.cert-card');

  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  const detailsPanel = document.getElementById('cert-details-panel');
  if (!lightbox || !detailsPanel) return;

  const panelCloseBtn = detailsPanel.querySelector('.panel-close-btn');
  const panelCertImg = document.getElementById('panel-cert-img');
  const panelCategory = document.getElementById('panel-category');
  const panelTitle = document.getElementById('panel-title');
  const panelIssuer = document.getElementById('panel-issuer');
  const panelYear = document.getElementById('panel-year');
  const panelDescription = document.getElementById('panel-description');

  // Filter functionality
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Fade out grid items
      gridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
      });

      // Wait for fade-out, then filter and fade-in
      setTimeout(() => {
        gridItems.forEach(item => {
          const card = item.querySelector('.cert-card');
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            // Force layout recalculation
            void item.offsetWidth;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          } else {
            item.style.display = 'none';
          }
        });
      }, 250);
    });
  });

  // Open Lightbox + Details Panel
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category');
      const issuer = card.getAttribute('data-issuer') || 'N/A';
      const year = card.getAttribute('data-year');
      const description = card.getAttribute('data-description');
      const img = card.querySelector('.cert-thumb img');
      const imgSrc = img ? img.src : '';

      // Populate details
      if (panelCertImg) panelCertImg.src = imgSrc;
      if (panelCategory) panelCategory.textContent = category;
      if (panelTitle) panelTitle.textContent = title;
      if (panelIssuer) panelIssuer.textContent = issuer;
      if (panelYear) panelYear.textContent = year;
      if (panelDescription) panelDescription.textContent = description;

      // Populate lightbox
      if (lightboxImg) lightboxImg.src = imgSrc;

      // Activate both
      lightbox.classList.add('active');
      detailsPanel.classList.add('active');
    });
  });

  // Close functionality
  const closeAll = () => {
    lightbox.classList.remove('active');
    detailsPanel.classList.remove('active');
  };

  // Close on lightbox click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox-content') === null) {
      closeAll();
    }
  });

  // Close on details panel close btn click
  if (panelCloseBtn) {
    panelCloseBtn.addEventListener('click', closeAll);
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAll();
    }
  });

  // Scroll Hint Logic
  const scrollArea = document.getElementById('cert-scroll-area');
  const scrollHint = document.getElementById('cert-scroll-hint');
  
  if (scrollArea && scrollHint) {
    scrollArea.addEventListener('scroll', () => {
      if (scrollArea.scrollTop > 10) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    }, { passive: true });
  }
}

// Initialize gallery
initCertificatesGallery();

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// --- Cursor Trail Effect ---
if (!window.matchMedia('(pointer: coarse)').matches) {
  const trailDots = [];
  const trailLength = 6;
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);
    trailDots.push({ el: dot, x: 0, y: 0, life: 0 });
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let isMouseMoving = false;
  let hideTimeout;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      isMouseMoving = false;
    }, 100);
  });

  function animateTrail() {
    let x = mouseX;
    let y = mouseY;

    trailDots.forEach((dotObj, index) => {
      dotObj.x += (x - dotObj.x) * 0.4;
      dotObj.y += (y - dotObj.y) * 0.4;
      
      const scale = (trailLength - index) / trailLength;
      const opacity = isMouseMoving ? scale * 0.6 : 0;
      
      dotObj.el.style.transform = `translate(${dotObj.x}px, ${dotObj.y}px) scale(${scale})`;
      dotObj.el.style.opacity = opacity;

      x = dotObj.x;
      y = dotObj.y;
    });
    
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

// --- Mobile Hamburger Menu ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (hamburgerBtn && mobileMenuOverlay && mobileMenuClose) {
  hamburgerBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileMenuClose.addEventListener('click', closeMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
