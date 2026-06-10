const fs = require('fs');

const updateFile = (filename) => {
  let content = fs.readFileSync(filename, 'utf8');
  
  // Replace in index.html for Voice Assistant image
  // We want to replace the whole <img> tag for Voice Assistant, or <span class="project-card-icon">🎙️</span> if it exists.
  
  // First, if it has the <img> tag
  content = content.replace(/<img src="image-project\/voice-ivory\.jpeg"[^>]*>/g, 
    '<img src="image-project/voice-ivory.png" alt="Voice-First Task Assistant" onerror="if(this.src.indexOf(\'.png\')!==-1){ this.src=this.src.replace(\'.png\', \'.jpeg\'); } else if(this.src.indexOf(\'.jpeg\')!==-1){ this.src=this.src.replace(\'.jpeg\', \'.jpg\'); } else { this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>V</div>\'; }" />');

  // Second, if it has the emoji 🎙️
  content = content.replace(/<span class="project-card-icon"[^>]*>🎙️<\/span>/g,
    '<img src="image-project/voice-ivory.png" alt="Voice-First Task Assistant" onerror="if(this.src.indexOf(\'.png\')!==-1){ this.src=this.src.replace(\'.png\', \'.jpeg\'); } else if(this.src.indexOf(\'.jpeg\')!==-1){ this.src=this.src.replace(\'.jpeg\', \'.jpg\'); } else { this.onerror=null; this.outerHTML=\'<div class=\\\'img-fallback\\\'>V</div>\'; }" />');
    
  // Replace in project-details.html
  content = content.replace(/image: 'image-project\/voice-ivory\.jpeg'/g, "image: 'image-project/voice-ivory.png'");
  
  fs.writeFileSync(filename, content);
};

updateFile('index.html');
updateFile('project-details.html');
console.log('Updated references to voice-ivory in HTML files');
