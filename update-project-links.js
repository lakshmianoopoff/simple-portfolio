const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const projectMap = [
  { match: 'ResQ – AI-Powered', id: 'resq' },
  { match: 'Voice-First Task', id: 'voice' },
  { match: 'Pylon -Scholarship', id: 'pylon' },
  { match: 'CodeBurry', id: 'codeburry' },
  { match: 'SilentGuard', id: 'silentguard' }
];

// We want to remove `<div class="project-card-overlay">...</div>` entirely from each article.
// And wrap the contents inside `<article class="project-marquee-card">` with an `<a>`.
// But an `<a>` wrapping everything is easiest.

// Let's use a regex to match articles
html = html.replace(/<article class="project-marquee-card">([\s\S]*?)<\/article>/g, (match, innerContent) => {
  let id = 'resq';
  for (let p of projectMap) {
    if (innerContent.includes(p.match)) {
      id = p.id;
      break;
    }
  }

  // Remove the overlay div
  const overlayStart = innerContent.indexOf('<div class="project-card-overlay">');
  if (overlayStart !== -1) {
    // find matching end div. For simplicity, just use substring or regex
    // since we know the overlay ends with </div> just before </article> (actually there's spaces)
    // Actually the overlay contains nested divs, so regex is tricky.
    // Let's split by `<div class="project-card-overlay">` and take the first part
    innerContent = innerContent.substring(0, overlayStart);
  }

  return `<article class="project-marquee-card" onclick="window.location.href='project-details.html?id=${id}'" style="cursor: pointer;">
${innerContent}</article>`;
});

fs.writeFileSync('index.html', html);
console.log('Updated index.html to point to project-details.html');

let css = fs.readFileSync('style.css', 'utf8');
const pdCss = `
/* Project Details Page Styles */
.project-details-page {
  padding-top: 100px;
}
.pd-hero {
  padding: 40px 0 100px;
}
.pd-back-btn {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 40px;
  transition: color 0.2s ease;
}
.pd-back-btn:hover {
  color: var(--accent);
}
.pd-header {
  max-width: 800px;
  margin-bottom: 40px;
}
.pd-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.pd-tag {
  background: var(--bg-card);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--border);
}
.pd-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--text);
}
.pd-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text-muted);
  line-height: 1.6;
}
.pd-image-wrapper {
  width: 100%;
  height: 60vh;
  min-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 60px;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.pd-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.pd-main-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  color: var(--accent);
  background: var(--bg-card);
}
.pd-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
}
.pd-main-text h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 24px;
  color: var(--text);
}
.pd-main-text p {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
}
.pd-sidebar {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.pd-sidebar h3 {
  font-family: var(--font-body);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.pd-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pd-links .cta-btn {
  width: 100%;
  justify-content: space-between;
}
.btn-outline {
  background: transparent !important;
  color: var(--text) !important;
  border: 1px solid var(--border) !important;
  box-shadow: none !important;
}
.btn-outline:hover {
  background: var(--bg-card) !important;
  border-color: var(--accent) !important;
}
.pd-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pd-tech-item {
  background: var(--bg-input);
  color: var(--text-muted);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
}

@media (max-width: 900px) {
  .pd-content {
    grid-template-columns: 1fr;
  }
}
`;

if (!css.includes('.project-details-page')) {
  fs.appendFileSync('style.css', pdCss);
  console.log('Appended project details CSS to style.css');
}
