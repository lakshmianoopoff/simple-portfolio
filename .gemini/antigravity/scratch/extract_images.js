const fs = require('fs');
const path = require('path');

const certDir = 'c:\\Users\\dell\\OneDrive\\Desktop\\portfolio\\certificates';
const files = fs.readdirSync(certDir);

files.forEach(file => {
  if (path.extname(file).toLowerCase() !== '.pdf') return;
  
  const filePath = path.join(certDir, file);
  const data = fs.readFileSync(filePath);
  
  console.log(`\nAnalyzing ${file}...`);
  
  // Search for JPEG markers 0xFF 0xD8 (start of image) and 0xFF 0xD9 (end of image)
  // in the PDF binary data.
  let index = 0;
  let imgCount = 0;
  
  while (index < data.length) {
    // Look for start of JPEG: 0xFF, 0xD8, 0xFF
    const startIdx = data.indexOf(Buffer.from([0xFF, 0xD8, 0xFF]), index);
    if (startIdx === -1) break;
    
    // Look for end of JPEG: 0xFF, 0xD9
    const endIdx = data.indexOf(Buffer.from([0xFF, 0xD9]), startIdx);
    if (endIdx === -1) break;
    
    const imgData = data.slice(startIdx, endIdx + 2);
    if (imgData.length > 5000) { // Only save reasonably sized images (not thumbnails or tiny chunks)
      imgCount++;
      const outName = `${path.basename(file, '.pdf')}_extracted_${imgCount}.jpg`;
      const outPath = path.join(certDir, outName);
      fs.writeFileSync(outPath, imgData);
      console.log(`  Extracted image: ${outName} (${imgData.length} bytes)`);
    }
    
    index = endIdx + 2;
  }
  
  if (imgCount === 0) {
    console.log(`  No embedded JPEG found in ${file}.`);
  }
});
