const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startStr = '<section id="contact" role="region" aria-label="Contact">';
const endStr = '<footer role="contentinfo">';

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newHtml = html.substring(0, startIndex) +
    `<section id="contact-cta" class="contact-cta-section" role="region" aria-label="Contact CTA">
    <div class="cta-gradient-bg"></div>
    <div class="container cta-container">
      <h2 class="cta-title">Let's Make It Happen</h2>
      <p class="cta-subtitle">
        always open to new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life
      </p>
      
      <a href="contact.html" class="cta-btn">
        <span>→</span>
        <span>Get In Touch</span>
      </a>
    </div>
  </section>

  ` + html.substring(endIndex);

  fs.writeFileSync('index.html', newHtml);
  console.log('Replaced contact and admin with CTA');
} else {
  console.log('Could not find start or end bounds');
}
