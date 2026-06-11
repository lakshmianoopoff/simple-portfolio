const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'style.css');
let content = fs.readFileSync(file, 'utf8');

// 1. Hide desktop nav and show hamburger correctly
const hamburgerCss = `
  .hamburger-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 28px;
    cursor: pointer;
    padding: 0;
  }
`;
content = content.replace(/\.hamburger-btn\s*\{[\s\S]*?padding: 0;\s*\}/, hamburgerCss.trim());

// 2. Fix overlay styling
const overlayCss = `
  .mobile-menu-overlay {
    display: flex !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background: rgba(10, 10, 10, 0.98);
    z-index: 9999;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transform: none;
    transition: opacity 0.3s ease;
  }
`;
content = content.replace(/\.mobile-menu-overlay\s*\{[\s\S]*?cubic-bezier.*?\);\s*\}/, overlayCss.trim());

// 3. Fix overlay active state
const overlayActiveCss = `
  .mobile-menu-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
`;
content = content.replace(/\.mobile-menu-overlay\.active\s*\{[\s\S]*?\}/, overlayActiveCss.trim());

// 4. Fix links styling
const navLinksCss = `
  .mobile-nav-links a {
    font-family: var(--font-display);
    font-size: 2rem;
    color: #ffffff;
    padding: 16px;
    width: 100%;
    display: block;
    text-align: center;
    text-decoration: none;
  }
`;
content = content.replace(/\.mobile-nav-links a\s*\{[\s\S]*?text-decoration: none;\s*\}/, navLinksCss.trim());

// 5. Fix close button
const closeBtnCss = `
  .mobile-menu-close {
    position: absolute;
    top: 20px;
    right: 28px;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
content = content.replace(/\.mobile-menu-close\s*\{[\s\S]*?cursor: pointer;\s*\}/, closeBtnCss.trim());

// 6. Global hide for hamburger and overlay
if (!content.includes('.hamburger-btn, .mobile-menu-overlay {')) {
  const globalHide = `
.hamburger-btn, .mobile-menu-overlay {
  display: none;
}
`;
  content = content.replace('/* GLOBAL MOBILE FIXES */', globalHide + '\n  /* GLOBAL MOBILE FIXES */');
}

fs.writeFileSync(file, content);
console.log('done');
