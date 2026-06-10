const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div class="project-card-thumb">
              <span class="project-card-icon" style="font-size:48px;">🎙️</span>
            </div>`;

const replaceStr = `<div class="project-card-thumb">
              <img src="image-project/voice-ivory.jpeg" alt="Voice-First Task Assistant" onerror="this.onerror=null; this.outerHTML='<div class=\\'img-fallback\\'>V</div>'" />
            </div>`;

if (html.includes(targetStr)) {
  html = html.split(targetStr).join(replaceStr);
  fs.writeFileSync('index.html', html);
  console.log('Replaced thumb icons successfully');
} else {
  console.log('Target string not found');
}
