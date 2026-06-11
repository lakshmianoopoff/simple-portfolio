const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'style.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');

const newCSS = `

/* ==========================================
   USER MOBILE FIXES V3: HERO IMAGE & BADGE
   ========================================== */
@media (max-width: 768px) {
  /* Hide the badge on mobile */
  .hero-status-pill {
    display: none !important;
  }
  
  /* Increase the size of the hero image */
  .hero-portrait-wrap {
    max-width: 340px !important;
    max-height: 420px !important;
    width: 100% !important;
  }
}
`;

fs.appendFileSync(cssFile, newCSS);
console.log('Appended mobile fixes to style.css');

const htmlFile = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
htmlContent = htmlContent.replace(/style\.css\?v=\d+/g, 'style.css?v=12');
fs.writeFileSync(htmlFile, htmlContent);
console.log('Updated cache buster in index.html to v=12');

const contactFile = path.join(__dirname, 'contact.html');
if (fs.existsSync(contactFile)) {
  let contactContent = fs.readFileSync(contactFile, 'utf8');
  contactContent = contactContent.replace(/style\.css\?v=\d+/g, 'style.css?v=12');
  fs.writeFileSync(contactFile, contactContent);
  console.log('Updated cache buster in contact.html to v=12');
}
