const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'style.css');
let content = fs.readFileSync(file, 'utf8');

// remove the misplaced rule
content = content.replace('.hamburger-btn, .mobile-menu-overlay {\n  display: none;\n}', '');

// ensure it's added right before @media
const newMedia = `.hamburger-btn, .mobile-menu-overlay {
  display: none;
}

@media (max-width: 768px) {`;

content = content.replace('@media (max-width: 768px) {', newMedia);

fs.writeFileSync(file, content);
console.log('done');
