const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const counts = {
  groups: html.split('projects-marquee-group').length - 1,
  articles: html.split('<article class="project-marquee-card').length - 1
};
console.log(counts);
