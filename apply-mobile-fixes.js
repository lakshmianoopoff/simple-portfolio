const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'style.css');
let content = fs.readFileSync(file, 'utf8');

const newCSS = `

/* ==========================================
   USER FIXES (max-width: 768px)
   ========================================== */
@media (max-width: 768px) {

  /* FIX 1: Hero Section Mobile */
  #hero {
    padding-top: 100px !important;
  }
  .hero-grid-layout {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    gap: 24px !important;
  }
  .hero-left-col {
    order: 1 !important;
    align-items: flex-start !important;
    text-align: left !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    width: 100% !important;
  }
  .hero-center-col {
    order: 2 !important;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }
  .hero-right-col {
    order: 3 !important;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }
  .hero-center-group {
    align-items: flex-start !important;
    width: 100% !important;
  }
  .hero-status-pill {
    align-self: flex-start !important;
    margin: 0 !important;
  }
  .hero-headline {
    margin-bottom: 24px !important;
  }
  .hero-portrait-wrap {
    max-width: 260px !important;
    margin: 0 auto !important;
    align-self: center !important;
  }
  .hero-left-detail {
    display: block !important;
    margin: 0 !important;
  }
  .hero-actions {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
    gap: 12px !important;
  }
  .hero-btn-primary, .hero-btn-secondary {
    width: auto !important;
  }
  .line-top, .line-bottom {
    text-align: left !important;
  }

  /* FIX 2: Projects Section Heading */
  .projects-ticker-section .section-title,
  .projects-marquee-header .section-title,
  .projects-ticker-section h2 {
    font-size: clamp(2rem, 8vw, 3rem) !important;
  }
  .projects-marquee-header {
    overflow: hidden !important;
    max-width: 100% !important;
    align-items: flex-start !important;
    text-align: left !important;
  }
  
  /* FIX 3: About stats section */
  .about-facts-list {
    gap: 20px !important;
  }
  .about-fact-item {
    padding: 16px !important;
    border-left: none !important;
    border-top: 2px solid var(--border-green) !important;
    background: rgba(255,255,255,0.02) !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 4px !important;
  }
  [data-theme="light"] .about-fact-item {
    border-top: 2px solid var(--accent) !important;
    background: rgba(0,0,0,0.02) !important;
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
  [data-theme="light"] .fact-value-col {
    color: var(--text) !important;
  }
  
  /* FIX 4: Left align and remove AI feel */
  .container {
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
  .hero-headline::after {
    left: 0 !important;
    transform: none !important;
  }
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
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  /* Since section has padding, reset container horizontal padding to avoid double padding */
  .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  h2, .section-title, .about-title-large {
    max-width: 100% !important;
    word-break: break-word !important;
    font-size: clamp(1.8rem, 6vw, 2.2rem) !important;
  }
}
`;

content += newCSS;
fs.writeFileSync(file, content);
console.log('done');
