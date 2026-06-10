const fs = require('fs');

// 1. Read files
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('style.css', 'utf8');

// 2. Add Voice Assistant Card 2 if missing
if (!html.includes('Voice-First Task Assistant')) {
  const card2 = `
          <!-- Card 2 -->
          <article class="project-marquee-card">
            <div class="project-card-thumb">
              <img src="image-project/voice-ivory.jpeg" alt="Voice-First Task Assistant" onerror="this.onerror=null; this.outerHTML='<div class=\\'img-fallback\\'>V</div>'" />
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
              <div class="overlay-image" style="background: linear-gradient(135deg, rgba(255, 159, 67, 0.3), rgba(255, 107, 107, 0.3));">
                <span class="overlay-icon">🎙️</span>
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
  html = html.replace('<!-- Card 3 -->', card2 + '\n          <!-- Card 3 -->');
  
  // Re-duplicate Group 2 since it was removed
  const startGroup1 = html.indexOf('<div class="projects-marquee-group">');
  const match = html.match(/<\/article>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
  if (startGroup1 !== -1 && match) {
    const endIndex = match.index + '</article>\n        </div>'.length;
    const group1Html = html.substring(startGroup1, endIndex);
    const group2Html = group1Html.replace('<div class="projects-marquee-group">', '<div class="projects-marquee-group" aria-hidden="true">');
    html = html.substring(0, endIndex) + '\n\n        <!-- Group 2 (Duplicate for Seamless Loop) -->\n        ' + group2Html + html.substring(endIndex);
  }
}

// 3. Remove all .project-card-overlay and update links
const projectMap = [
  { match: 'ResQ – AI-Powered', id: 'resq' },
  { match: 'Voice-First Task', id: 'voice' },
  { match: 'Pylon -Scholarship', id: 'pylon' },
  { match: 'CodeBurry', id: 'codeburry' },
  { match: 'SilentGuard', id: 'silentguard' }
];

html = html.replace(/<article class="project-marquee-card">([\s\S]*?)<\/article>/g, (match, innerContent) => {
  let id = 'resq';
  for (let p of projectMap) {
    if (innerContent.includes(p.match)) {
      id = p.id;
      break;
    }
  }

  const overlayStart = innerContent.indexOf('<div class="project-card-overlay">');
  if (overlayStart !== -1) {
    innerContent = innerContent.substring(0, overlayStart);
  }

  return `<article class="project-marquee-card" onclick="window.location.href='project-details.html?id=${id}'" style="cursor: pointer;">
${innerContent}</article>`;
});

// 4. Re-add mega footer
const footerStart = html.indexOf('<footer role="contentinfo">');
const footerEnd = html.indexOf('</footer>', footerStart);
if (footerStart !== -1 && !html.includes('class="mega-footer"')) {
  const newFooter = `<footer role="contentinfo" class="mega-footer">
    <div class="container mega-footer-inner">
      <div class="mega-footer-top">
        <div class="mega-footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Portfolio</a>
          <a href="#cert-gallery">Blog</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="mega-footer-copyright">
          © 2026 Lakshmi Anoop. All rights reserved.
        </div>
      </div>
    </div>
    <div class="mega-footer-giant">
      <i>Lakshmi</i> Anoop
    </div>
  </footer>`;
  html = html.substring(0, footerStart) + newFooter + html.substring(footerEnd + 9);
}

// Write HTML
fs.writeFileSync('index.html', html);
console.log('Restored index.html updates.');

// 5. Re-add CSS
if (!css.includes('.project-details-page')) {
  const newCss = `
/* Project Details Page Styles */
.project-details-page { padding-top: 100px; }
.pd-hero { padding: 40px 0 100px; }
.pd-back-btn { display: inline-flex; align-items: center; font-family: var(--font-body); font-size: 14px; color: var(--text-muted); text-decoration: none; margin-bottom: 40px; transition: color 0.2s ease; }
.pd-back-btn:hover { color: var(--accent); }
.pd-header { max-width: 800px; margin-bottom: 40px; }
.pd-tags { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.pd-tag { background: var(--bg-card); color: var(--accent); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid var(--border); }
.pd-title { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; color: var(--text); }
.pd-subtitle { font-family: var(--font-body); font-size: clamp(1.1rem, 2vw, 1.3rem); color: var(--text-muted); line-height: 1.6; }
.pd-image-wrapper { width: 100%; height: 60vh; min-height: 400px; border-radius: 20px; overflow: hidden; margin-bottom: 60px; background: var(--bg-card); border: 1px solid var(--border); }
.pd-main-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.pd-main-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 100px; color: var(--accent); background: var(--bg-card); }
.pd-content { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
.pd-main-text h2 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 24px; color: var(--text); }
.pd-main-text p { font-family: var(--font-body); font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); }
.pd-sidebar { display: flex; flex-direction: column; gap: 40px; }
.pd-sidebar h3 { font-family: var(--font-body); font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text); margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
.pd-links { display: flex; flex-direction: column; gap: 16px; }
.pd-links .cta-btn { width: 100%; justify-content: space-between; }
.btn-outline { background: transparent !important; color: var(--text) !important; border: 1px solid var(--border) !important; box-shadow: none !important; }
.btn-outline:hover { background: var(--bg-card) !important; border-color: var(--accent) !important; }
.pd-tech-list { display: flex; flex-wrap: wrap; gap: 10px; }
.pd-tech-item { background: var(--bg-input); color: var(--text-muted); padding: 8px 16px; border-radius: 8px; font-size: 14px; }
@media (max-width: 900px) { .pd-content { grid-template-columns: 1fr; } }

/* Mega Footer */
.mega-footer { position: relative; width: 100%; padding-top: 100px; overflow: hidden; background: var(--bg); }
.mega-footer-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 80px; }
.mega-footer-links { display: flex; gap: 28px; flex-wrap: wrap; }
.mega-footer-links a { font-family: 'General Sans', sans-serif; font-size: 16.5px; color: var(--text); text-decoration: none; transition: color 0.2s; }
.mega-footer-links a:hover { color: var(--accent) !important; }
.mega-footer-copyright { font-family: 'General Sans', sans-serif; font-size: 13.5px; color: var(--text-muted); }
.mega-footer-giant { font-family: 'Instrument Serif', serif; font-size: 20vw; line-height: 0.75; color: var(--text); white-space: nowrap; text-align: center; margin-bottom: -3.5vw; letter-spacing: -0.02em; }
.mega-footer-giant i { font-style: italic; padding-right: 0.05em; }
@media (max-width: 860px) { .mega-footer-top { flex-direction: column; align-items: center; text-align: center; } }
`;
  fs.appendFileSync('style.css', newCss);
  console.log('Restored style.css updates.');
}
