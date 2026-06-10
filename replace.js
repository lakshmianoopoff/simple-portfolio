const fs = require('fs');

try {
// script.js
let script = fs.readFileSync('script.js', 'utf8');

// replace skills animation speeds
script = script.replace(/cards\[cardIndex\].classList.add\('content-visible'\);\s*\}, startTime \+ 150/g, 'cards[cardIndex].classList.add(\'content-visible\');\n    }, startTime + 100');

script = script.replace(/skillsTimeouts.push\(setTimeout\(\(\) => \{\s*drawLine\(0, 1\);\s*\}, 750\)\);/g, 'skillsTimeouts.push(setTimeout(() => {\n    drawLine(0, 1);\n  }, 300));');
script = script.replace(/animateCardSequence\(1, 1250\);/g, 'animateCardSequence(1, 700);');
script = script.replace(/skillsTimeouts.push\(setTimeout\(\(\) => \{\s*drawLine\(1, 2\);\s*\}, 2000\)\);/g, 'skillsTimeouts.push(setTimeout(() => {\n    drawLine(1, 2);\n  }, 1000));');
script = script.replace(/animateCardSequence\(2, 2500\);/g, 'animateCardSequence(2, 1400);');
script = script.replace(/animateCardSequence\(3, 3100\);/g, 'animateCardSequence(3, 1700);');
script = script.replace(/skillsTimeouts.push\(setTimeout\(\(\) => \{\s*drawLine\(3, 4\);\s*\}, 3850\)\);/g, 'skillsTimeouts.push(setTimeout(() => {\n    drawLine(3, 4);\n  }, 2000));');
script = script.replace(/animateCardSequence\(4, 4350\);/g, 'animateCardSequence(4, 2400);');
script = script.replace(/skillsTimeouts.push\(setTimeout\(\(\) => \{\s*drawLine\(4, 5\);\s*\}, 5100\)\);/g, 'skillsTimeouts.push(setTimeout(() => {\n    drawLine(4, 5);\n  }, 2700));');
script = script.replace(/animateCardSequence\(5, 5600\);/g, 'animateCardSequence(5, 3100);');

fs.writeFileSync('script.js', script);

// style.css
let style = fs.readFileSync('style.css', 'utf8');

// Font replacement
style = style.replace(/--font-body: 'DM Mono', monospace;/g, "--font-body: 'General Sans', sans-serif;");

// Text hover globally
const hoverStyles = `
a:hover {
  text-decoration: underline;
  color: var(--accent) !important;
}

h1, h2, h3, h4, h5, h6, p, span, li, button, label, .section-label, .tag, .tl-date {
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, p:hover, li:hover, label:hover, .section-label:hover, .tl-date:hover {
  color: var(--accent) !important;
}

p span:hover, h1 span:hover, h2 span:hover, h3 span:hover, h4 span:hover, .footer-left:hover, .footer-right:hover {
  color: var(--accent) !important;
}

section {`;

style = style.replace(/a:hover \{\s*text-decoration: underline;\s*\}\s*section \{/g, hoverStyles);

// Nav links hover
style = style.replace(/\.nav-links a:hover,\s*\.nav-links a\.active \{\s*color: var\(--text\);\s*background: var\(--bg-input\);\s*text-decoration: none;\s*\}/g, '.nav-links a:hover,\n.nav-links a.active {\n  color: var(--accent) !important;\n  background: var(--bg-input);\n  text-decoration: none;\n}');

// Skills transition speeds
style = style.replace(/transition: transform 0.6s cubic-bezier\(0.16, 1, 0.3, 1\), opacity 0.6s ease, box-shadow 0.4s ease;/g, 'transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease;');
style = style.replace(/animation: drawLineAnim 1.2s cubic-bezier\(0.4, 0, 0.2, 1\) forwards;/g, 'animation: drawLineAnim 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;');
style = style.replace(/\.content-visible \.skill-number \{ transition-delay: 0.1s; \}/g, '.content-visible .skill-number { transition-delay: 0.05s; }');
style = style.replace(/\.content-visible \.skill-icon \{ transition-delay: 0.2s; \}/g, '.content-visible .skill-icon { transition-delay: 0.1s; }');
style = style.replace(/\.content-visible \.skill-name \{ transition-delay: 0.3s; \}/g, '.content-visible .skill-name { transition-delay: 0.15s; }');
style = style.replace(/\.content-visible \.skill-desc \{ transition-delay: 0.4s; \}/g, '.content-visible .skill-desc { transition-delay: 0.2s; }');
style = style.replace(/\.content-visible \.skill-tags \{ transition-delay: 0.5s; \}/g, '.content-visible .skill-tags { transition-delay: 0.25s; }');

// Cursor trail and progress bar base
style += `\n
/* Progress Bar */
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  z-index: 9999;
  width: 0%;
  transition: width 0.1s ease-out;
}

/* Heading shimmer */
.section-title {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.section-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}
.section-title:hover::after {
  left: 150%;
}
[data-theme="light"] .section-title::after {
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
}
`;

fs.writeFileSync('style.css', style);
console.log('done!');

} catch (e) {
  console.error(e);
}
