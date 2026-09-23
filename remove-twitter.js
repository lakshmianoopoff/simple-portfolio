const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<a href="#" aria-label="X \/ Twitter" class="social-link">[\s\S]*?<\/a>/;
html = html.replace(regex, '');

fs.writeFileSync('index.html', html);
console.log('Removed X / Twitter icon');
