const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'contact.html');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<img(?!.*?class="hero-portrait-img")(?!.*?loading="lazy")/g, '<img loading="lazy"');

fs.writeFileSync(file, content);
