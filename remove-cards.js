const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Regex to match a card by its title:
const removeCardByTitle = (titleFragment) => {
  const regex = new RegExp(
    '<!-- Card \\d+ -->\\s*<article class="project-marquee-card">[\\s\\S]*?<h3 class="project-card-title">.*?' + titleFragment + '.*?</h3[\\s\\S]*?</article>',
    'g'
  );
  html = html.replace(regex, '');
};

removeCardByTitle('Voice-First Task Assistant');
removeCardByTitle('Streamlit AI Chatbot');

fs.writeFileSync('index.html', html);
console.log('Cards removed');
