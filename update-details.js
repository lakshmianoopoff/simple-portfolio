const fs = require('fs');
const path = require('path');

let pd = fs.readFileSync('project-details.html', 'utf8');

// The links to update
const links = {
  resq: "https://resq-edd87.web.app/",
  codeburry: "https://code-burry-six.vercel.app/",
  pylon: "https://pylon-scholarship-hub.vercel.app/"
};

// The folder mapping to the object keys in project-details.html
const folderMap = {
  resq: 'resq',
  codeburry: 'code burry',
  pylon: 'pylon',
  voice: 'Voice-Ivory',
  silentguard: 'silent-guard'
};

const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

// Find images in a folder
function getImagesInFolder(folderName) {
  const dir = path.join('image-project', folderName);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  
  return files
    .filter(f => extensions.includes(path.extname(f).toLowerCase()))
    .map(f => `image-project/${folderName}/${f}`.replace(/\\/g, '/'));
}

// Re-generate the projects object block in project-details.html using regex or simple replacements
// Let's replace line by line or use string replacement.

// Replace Links
for (const [key, link] of Object.entries(links)) {
  // We need to replace exactly the `live` property of the specific project block.
  // The structure is roughly:
  // 'key': { ... live: '#', ... }
  
  // Create a regex to match the block for `key` and replace the `live` attribute
  // We can just find the block for the key, and then replace `live: '#'` within that block.
  const blockRegex = new RegExp(`('${key}'|"${key}"):\\s*{[\\s\\S]*?github:\\s*['"].*?['"]\\s*}`, 'g');
  pd = pd.replace(blockRegex, (match) => {
    return match.replace(/live:\s*['"].*?['"]/, `live: '${link}'`);
  });
}

// Replace Gallery
for (const [key, folderName] of Object.entries(folderMap)) {
  const images = getImagesInFolder(folderName);
  const galleryArrayStr = '[\n' + images.map(img => `          '${img}'`).join(',\n') + '\n        ]';
  
  const blockRegex = new RegExp(`('${key}'|"${key}"):\\s*{[\\s\\S]*?github:\\s*['"].*?['"]\\s*}`, 'g');
  pd = pd.replace(blockRegex, (match) => {
    return match.replace(/gallery:\s*\[[\s\S]*?\],/, `gallery: ${galleryArrayStr},`);
  });
}

fs.writeFileSync('project-details.html', pd);
console.log('Successfully updated project-details.html with links and gallery images');
