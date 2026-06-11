const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

// Update Title
content = content.replace(/<title>.*?<\/title>/, '<title>Lakshmi Anoop | Full-Stack Developer Portfolio</title>');

// Add JSON-LD Schema if not present
if (!content.includes('application/ld+json')) {
  const jsonLd = `
  <!-- Structured Data for Google (Person Schema) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lakshmi Anoop",
    "url": "https://lakshmianoop.in/",
    "jobTitle": "Full-Stack Developer",
    "alumniOf": "B.Tech Computer Science",
    "sameAs": [
      "https://www.linkedin.com/in/lakshmianoop",
      "https://www.instagram.com/lxksmii?igsh=Y3BhN2EwbjB2a3d1"
    ],
    "knowsAbout": ["Software Development", "React", "Node.js", "Full-Stack Engineering"]
  }
  </script>
</head>`;
  
  content = content.replace('</head>', jsonLd);
}

fs.writeFileSync(file, content);
console.log('Added strict SEO for Lakshmi Anoop');
