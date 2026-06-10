const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<span class="project-card-icon">🚨<\/span>/g, '<img src="image-project/resq.jpeg" alt="ResQ" onerror="this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>R</div>\'" />');

html = html.replace(/<span class="project-card-icon">🎮<\/span>/g, '<img src="image-project/code-burry.jpeg" alt="CodeBurry" onerror="this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>C</div>\'" />');

html = html.replace(/<span class="project-card-icon">🛡️<\/span>/g, '<img src="image-project/Silent-quard.png" alt="SilentGuard" onerror="this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>S</div>\'" />');

html = html.replace(/<span class="project-card-icon">🎓<\/span>/g, '<img src="image-project/pylon.jpeg" alt="Pylon" onerror="this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>P</div>\'" />');

fs.writeFileSync('index.html', html);
console.log('Project images replaced.');
