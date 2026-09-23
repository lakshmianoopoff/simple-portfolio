const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const card2 = `
          <!-- Card 2 -->
          <article class="project-marquee-card">
            <div class="project-card-thumb">
              <span class="project-card-icon" style="font-size:48px;">🎙️</span>
            </div>
            <h3 class="project-card-title">Voice-First Task Assistant</h3>
            <p class="project-card-desc">
              React + FastAPI app with Groq LLM integration. Voice-controlled emails, clipboard summaries, and to-do management — built under a one-hour time constraint.
            </p>
            <div class="project-card-tags">
              <span class="project-card-tag">React</span>
              <span class="project-card-tag">FastAPI</span>
              <span class="project-card-tag">Groq API</span>
              <span class="project-card-tag">Gmail SMTP</span>
            </div>
            
            <div class="project-card-overlay">
              <div class="overlay-image" style="background: linear-gradient(135deg, rgba(255, 159, 67, 0.3), rgba(255, 107, 107, 0.3)); display:flex; align-items:center; justify-content:center;">
                <span class="overlay-icon" style="font-size:36px;">🎙️</span>
              </div>
              <h4 class="overlay-title">Voice-First Task Assistant</h4>
              <p class="overlay-desc">
                React + FastAPI app with Groq LLM integration. Voice-controlled emails, clipboard summaries, and to-do management — built under a one-hour time constraint.
              </p>
              <div class="overlay-links">
                <a href="#" class="overlay-btn overlay-btn-github" target="_blank" rel="noopener noreferrer">GitHub ⌥</a>
                <a href="#" class="overlay-btn overlay-btn-live" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
              </div>
            </div>
          </article>
`;

// Insert Card 2 before Card 3
html = html.replace('<!-- Card 3 -->', card2 + '\n          <!-- Card 3 -->');

// Rebuild Group 2 if it's missing (the user removed it)
const startGroup1 = html.indexOf('<div class="projects-marquee-group">');
// Let's use a regex to find the end of the group
const match = html.match(/<\/article>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);

if (startGroup1 !== -1 && match) {
  const endIndex = match.index + '</article>\n        </div>'.length; // up to the end of the group 1 div
  const group1Html = html.substring(startGroup1, endIndex);
  
  const group2Html = group1Html.replace('<div class="projects-marquee-group">', '<div class="projects-marquee-group" aria-hidden="true">');
  
  html = html.substring(0, endIndex) + '\n\n        <!-- Group 2 (Duplicate for Seamless Loop) -->\n        ' + group2Html + html.substring(endIndex);
  
  fs.writeFileSync('index.html', html);
  console.log('Restored Voice Assistant and Group 2 successfully');
} else {
  console.log('Could not find Group 1 bounds with regex.');
}
