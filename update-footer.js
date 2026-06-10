const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startStr = '<footer role="contentinfo">';
const endStr = '</footer>';

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
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

  html = html.substring(0, startIndex) + newFooter + html.substring(endIndex + endStr.length);
  fs.writeFileSync('index.html', html);
  console.log('index.html updated with mega footer');
}

let css = fs.readFileSync('style.css', 'utf8');
const newCss = `
.mega-footer {
  position: relative;
  width: 100%;
  padding-top: 100px;
  overflow: hidden;
  background: var(--bg);
}

.mega-footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 80px;
}

.mega-footer-links {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

.mega-footer-links a {
  font-family: 'General Sans', sans-serif;
  font-size: 16.5px;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
}

.mega-footer-links a:hover {
  color: var(--accent) !important;
}

.mega-footer-copyright {
  font-family: 'General Sans', sans-serif;
  font-size: 13.5px;
  color: var(--text-muted);
}

.mega-footer-giant {
  font-family: 'Instrument Serif', serif;
  font-size: 20vw;
  line-height: 0.75;
  color: var(--text);
  white-space: nowrap;
  text-align: center;
  margin-bottom: -3.5vw;
  letter-spacing: -0.02em;
}

.mega-footer-giant i {
  font-style: italic;
  padding-right: 0.05em;
}

@media (max-width: 860px) {
  .mega-footer-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
`;

if (!css.includes('.mega-footer-giant')) {
  fs.appendFileSync('style.css', newCss);
  console.log('style.css updated with mega footer styles');
}
