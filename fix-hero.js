const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'style.css');
let content = fs.readFileSync(file, 'utf8');

const newCSS = `

/* ==========================================
   HERO DISPLAY CONTENTS FIX (max-width: 768px)
   ========================================== */
@media (max-width: 768px) {
  .hero-grid-layout {
    display: flex !important;
    flex-direction: column !important;
  }
  /* Strip the columns so their children participate directly in flex layout */
  .hero-left-col, .hero-center-col, .hero-right-col, .hero-center-group {
    display: contents !important;
  }
  
  /* Order the children */
  .hero-status-pill {
    order: 1 !important;
    margin-bottom: 8px !important;
    align-self: flex-start !important;
  }
  .hero-headline {
    order: 2 !important;
    margin-bottom: 24px !important;
  }
  .hero-portrait-wrap {
    order: 3 !important;
    max-width: 260px !important;
    margin: 0 auto 24px auto !important;
    align-self: center !important;
  }
  .hero-left-detail {
    order: 4 !important;
    margin-bottom: 24px !important;
    display: block !important;
  }
  .hero-right-desc {
    order: 5 !important;
    margin-bottom: 24px !important;
  }
  .hero-actions {
    order: 6 !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
  }
}
`;

content += newCSS;
fs.writeFileSync(file, content);
console.log('done');
