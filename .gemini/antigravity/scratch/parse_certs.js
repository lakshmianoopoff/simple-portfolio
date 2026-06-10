const fs = require('fs');
const path = require('path');

const certDir = 'c:\\Users\\dell\\OneDrive\\Desktop\\portfolio\\certificates';
const files = fs.readdirSync(certDir);

files.forEach(file => {
  const filePath = path.join(certDir, file);
  const ext = path.extname(file).toLowerCase();
  
  if (ext === '.pdf') {
    const data = fs.readFileSync(filePath);
    const content = data.toString('binary');
    
    // Find sequences of printable ASCII characters
    const printableMatches = content.match(/[a-zA-Z0-9\s,\.\-\(\)]{4,}/g) || [];
    
    // Filter out long strings with too many non-word chars and clean up whitespace
    const cleanStrings = printableMatches
      .map(s => s.trim().replace(/\s+/g, ' '))
      .filter(s => s.length > 5 && /^[a-zA-Z0-9\s,\.\-\(\)]+$/.test(s))
      .slice(0, 30);
      
    console.log(`\n========================================`);
    console.log(`FILE: ${file}`);
    console.log(`========================================`);
    console.log(cleanStrings.join('\n').slice(0, 1000));
  }
});
