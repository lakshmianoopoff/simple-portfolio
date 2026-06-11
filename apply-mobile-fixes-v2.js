const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'style.css');
let content = fs.readFileSync(file, 'utf8');

const newCSS = `

/* ==========================================
   USER FIXES V2 (max-width: 768px)
   ========================================== */
@media (max-width: 768px) {

  /* FIX 1: Hero Section Mobile */
  #hero {
    padding-top: 120px !important; /* Ensure enough space from navbar */
    align-items: flex-start !important; /* Stop vertical centering from pushing content up */
    height: auto !important;
    min-height: 100vh !important;
  }
  
  .hero-grid-layout {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    gap: 0 !important;
  }
  
  /* Strip the columns so their children participate directly in flex layout */
  .hero-left-col, .hero-center-col, .hero-right-col, .hero-center-group {
    display: contents !important;
  }
  
  /* Order the children */
  .hero-status-pill {
    order: 1 !important;
    margin: 0 0 16px 0 !important;
    align-self: flex-start !important;
  }
  .hero-headline {
    order: 2 !important;
    margin: 0 0 24px 0 !important; /* Max gap 24px before photo */
    padding: 0 !important;
    text-align: left !important;
  }
  .hero-portrait-wrap {
    order: 3 !important;
    max-width: 260px !important;
    max-height: 320px !important; /* Not too tall */
    margin: 0 auto 24px auto !important;
    align-self: center !important;
  }
  .hero-portrait-img {
    object-fit: cover !important;
  }
  .hero-left-detail {
    order: 4 !important;
    margin: 0 0 24px 0 !important;
    display: block !important;
    text-align: left !important;
  }
  .hero-right-desc {
    order: 5 !important;
    margin: 0 0 24px 0 !important;
    text-align: left !important;
  }
  .hero-actions {
    order: 6 !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    gap: 12px !important;
    width: 100% !important;
    margin: 0 !important;
  }
  .hero-btn-primary, .hero-btn-secondary {
    width: auto !important;
    flex: 0 1 auto !important;
  }
  .line-top, .line-bottom {
    text-align: left !important;
    display: block !important;
  }

  /* FIX 2: Projects Section Heading */
  .projects-ticker-section .section-title,
  .projects-marquee-header .section-title,
  .projects-ticker-section h2,
  .section-title {
    font-size: clamp(2rem, 8vw, 3rem) !important;
    max-width: 100% !important;
    word-break: break-word !important;
  }
  .projects-marquee-header {
    overflow: hidden !important;
    max-width: 100% !important;
    align-items: flex-start !important;
    text-align: left !important;
  }
  
  /* FIX 3: About stats section */
  .about-facts-list {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 20px !important;
    padding: 0 !important;
    border-left: none !important; /* Remove the main left border */
  }
  .about-fact-item {
    padding: 16px !important;
    border-left: none !important; /* Remove item left border if any */
    border-top: 2px solid var(--border-green) !important;
    background: rgba(255,255,255,0.02) !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
  }
  .about-fact-item::before, .about-fact-item::after {
    display: none !important; /* Ensure ::before and ::after pseudo-element borders don't interfere */
  }
  [data-theme="light"] .about-fact-item {
    border-top: 2px solid var(--accent) !important;
    background: rgba(0,0,0,0.02) !important;
  }
  .fact-col {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    text-align: left !important;
  }
  .fact-label-col {
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    color: var(--accent) !important;
  }
  .fact-value-col {
    font-size: 15px !important;
    font-weight: bold !important;
    color: #ffffff !important;
  }
  .fact-extra-col {
    display: none !important; /* Simplify by hiding extra info on mobile */
  }
  [data-theme="light"] .fact-value-col {
    color: var(--text) !important;
  }
  
  /* FIX 4: Left align and remove AI feel */
  section .container {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .about-bio-text {
    text-align: left !important;
  }
  .about-bio-text p {
    text-align: left !important;
  }
  .section-label, .about-section-label {
    text-align: left !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
  .section-title, .about-title-large {
    text-align: left !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
  .about-header {
    align-items: flex-start !important;
    text-align: left !important;
  }
  .about-title-large::after,
  .hero-headline::after,
  .section-title::after {
    left: 0 !important;
    transform: none !important;
  }

  /* FIX 5: General spacing and overflow */
  html, body {
    overflow-x: hidden !important;
  }
  body {
    line-height: 1.7 !important;
  }
  section {
    min-height: auto !important;
    padding-left: 0 !important; /* Remove section horizontal padding, moved to .container */
    padding-right: 0 !important;
    padding-top: 60px !important;
    padding-bottom: 60px !important;
  }
  #hero {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  h2, .section-title, .about-title-large {
    max-width: 100% !important;
    word-break: break-word !important;
  }
}
`;

content += newCSS;
fs.writeFileSync(file, content);
console.log('done');
