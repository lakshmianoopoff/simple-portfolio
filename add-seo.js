const fs = require('fs');
const path = require('path');

function addSEO(filePath, isContact) {
  const file = path.join(__dirname, filePath);
  let content = fs.readFileSync(file, 'utf8');

  // Skip if already added
  if (content.includes('<meta name="description"')) {
    console.log(`SEO already exists in ${filePath}`);
    return;
  }

  const titleMatch = content.match(/<title>.*?<\/title>/);
  if (!titleMatch) return;

  const seoMeta = isContact ? `
  <meta name="description" content="Get in touch with Lakshmi Anoop, a Full-Stack Developer. Open to opportunities, project collaborations, and creative challenges." />
  <meta name="keywords" content="Contact Lakshmi Anoop, Hire Developer, Full-Stack Developer, Web Development, India" />
  <meta name="author" content="Lakshmi Anoop" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Get in Touch — Lakshmi Anoop" />
  <meta property="og:description" content="Get in touch with Lakshmi Anoop, a Full-Stack Developer. Open to opportunities, project collaborations, and creative challenges." />
  <meta property="og:image" content="photo.png" />
  <meta property="og:url" content="https://lakshmianoop.in/contact.html" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Get in Touch — Lakshmi Anoop" />
  <meta name="twitter:description" content="Get in touch with Lakshmi Anoop, a Full-Stack Developer. Open to opportunities, project collaborations, and creative challenges." />
  <meta name="twitter:image" content="photo.png" />
  
  <meta name="robots" content="index, follow" />` : `
  <meta name="description" content="Portfolio of Lakshmi Anoop, a Full-Stack Developer specializing in building robust, user-centric software solutions. Explore my projects, skills, and experience." />
  <meta name="keywords" content="Lakshmi Anoop, Full-Stack Developer, Portfolio, Software Engineering, React, Node.js, Web Development, India" />
  <meta name="author" content="Lakshmi Anoop" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Lakshmi Anoop — Full-Stack Developer Portfolio" />
  <meta property="og:description" content="Portfolio of Lakshmi Anoop, a Full-Stack Developer specializing in building robust, user-centric software solutions. Explore my projects, skills, and experience." />
  <meta property="og:image" content="photo.png" />
  <meta property="og:url" content="https://lakshmianoop.in/" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Lakshmi Anoop — Full-Stack Developer Portfolio" />
  <meta name="twitter:description" content="Portfolio of Lakshmi Anoop, a Full-Stack Developer specializing in building robust, user-centric software solutions. Explore my projects, skills, and experience." />
  <meta name="twitter:image" content="photo.png" />
  
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://lakshmianoop.in/" />`;

  content = content.replace(titleMatch[0], titleMatch[0] + seoMeta);
  fs.writeFileSync(file, content);
  console.log(`Added SEO to ${filePath}`);
}

addSEO('index.html', false);
addSEO('contact.html', true);
