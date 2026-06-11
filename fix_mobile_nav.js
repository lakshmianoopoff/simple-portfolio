const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the mobile nav section with the new overlay style
const targetOldNav = \  /* NAVBAR - MOBILE */
  .nav-links {
    display: none !important;
  }
  
  .hamburger-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(11, 12, 16, 0.98);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  [data-theme="light"] .mobile-menu-overlay {
    background: rgba(244, 243, 239, 0.98);
  }
  
  .mobile-menu-overlay.active {
    transform: translateX(0);
  }
  
  .mobile-menu-close {
    position: absolute;
    top: 20px;
    right: 28px;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 36px;
    cursor: pointer;
  }
  
  .mobile-nav-links {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .mobile-nav-links a {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
  }\;

const newNav = \  /* NAVBAR - MOBILE */
  .nav-links {
    display: none !important;
  }
  
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
    transition: opacity 0.3s ease;
    transform: none; /* remove translate */
  }
  
  [data-theme="light"] .mobile-menu-overlay {
    background: rgba(244, 243, 239, 0.98);
  }
  
  .mobile-menu-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
  
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
  
  .mobile-nav-links {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .mobile-nav-links a {
    font-family: var(--font-display);
    font-size: 2rem;
    color: #ffffff;
    padding: 16px;
    width: 100%;
    display: block;
    text-align: center;
    text-decoration: none;
  }\;

// Insert the display: none before media query
const targetMedia = \/* ==========================================
   MOBILE SCREEN FIXES (max-width: 768px)
   ========================================== */
@media (max-width: 768px) {\;

const newMedia = \.hamburger-btn, .mobile-menu-overlay { display: none; }

/* ==========================================
   MOBILE SCREEN FIXES (max-width: 768px)
   ========================================== */
@media (max-width: 768px) {\;

css = css.replace(targetOldNav, newNav);
css = css.replace(targetMedia, newMedia);

fs.writeFileSync(cssPath, css);
console.log('done');
