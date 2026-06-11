const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

// Replace all <img ...> with <img loading="lazy" ...> EXCEPT hero-portrait-img
content = content.replace(/<img(?!.*?class="hero-portrait-img")(?!.*?loading="lazy")/g, '<img loading="lazy"');

fs.writeFileSync(file, content);
console.log('Added lazy loading to images');
