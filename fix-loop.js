const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The start of Group 1
const startGroup1 = html.indexOf('<div class="projects-marquee-group">');
if (startGroup1 === -1) {
  console.log('Group 1 start not found');
  process.exit(1);
}

// Find the end of Group 1
// We know the structure is `        </div>\n\n        </div>\n    </div>\n  </section>`
// Let's find `</article>\n        </div>` after startGroup1
const match = html.match(/<\/article>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
if (!match) {
  console.log('Group 1 end not found');
  process.exit(1);
}

// Extract Group 1 exactly
const endIndex = match.index + '</article>\n        </div>'.length;
const group1Html = html.substring(startGroup1, endIndex);

// Check if Group 2 is already there
if (!html.includes('aria-hidden="true"')) {
  // Duplicate it for Group 2
  const group2Html = group1Html.replace('<div class="projects-marquee-group">', '<div class="projects-marquee-group" aria-hidden="true">');
  
  // Insert Group 2 after Group 1
  html = html.substring(0, endIndex) + '\n\n        <!-- Group 2 (Duplicate for Seamless Loop) -->\n        ' + group2Html + html.substring(endIndex);
  
  fs.writeFileSync('index.html', html);
  console.log('Successfully restored Group 2 for the seamless loop');
} else {
  console.log('Group 2 already exists or aria-hidden="true" found');
}
