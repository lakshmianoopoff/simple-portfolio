const fs = require('fs');

try {
  let content = fs.readFileSync('src/App.jsx', 'utf8');

  // 1. Remove wakeProgress state
  content = content.replace("const [wakeProgress, setWakeProgress] = useState(0);", "");

  // 2. Remove scroll listener logic for wakeProgress
  const scrollLogicStart = content.indexOf("// Scroll observer for wake-up transition progress");
  if (scrollLogicStart !== -1) {
    const scrollLogicEnd = content.indexOf("  }, []);", scrollLogicStart) + 9;
    if (scrollLogicEnd > 9) {
      content = content.substring(0, scrollLogicStart) + content.substring(scrollLogicEnd);
    }
  }

  // 3. Remove Section 2 HTML
  const section2Start = content.indexOf("{/* 2. WAKE-UP TRANSITION SECTION */}");
  const section3Start = content.indexOf("{/* 3. FEATURES CAROUSEL SECTION */}");
  if (section2Start !== -1 && section3Start !== -1) {
    content = content.substring(0, section2Start) + content.substring(section3Start);
  }

  // 4. Update FEATURES Array
  const featuresOldStart = content.indexOf("const FEATURES = [");
  const featuresOldEnd = content.indexOf("];", featuresOldStart) + 2;
  const newFeatures = `const FEATURES = [
  {
    id: 'email',
    expression: 'excited',
    bg: '#ff99dd',
    panel: '#ff80d5',
    accent: '#ff99dd',
    label: 'VOICE EMAIL',
    tagline: 'Speak it. Send it.',
    description: 'Dictate your email naturally — AI extracts the recipient, subject, and writes a professional body. Choose from Formal, Casual, Short, or Polite tone. Sends via Gmail automatically.',
    icon: Mail
  },
  {
    id: 'summarize',
    expression: 'focused',
    bg: '#99ff99',
    panel: '#80ff80',
    accent: '#99ff99',
    label: 'SMART SUMMARIZER',
    tagline: "Too long. Didn't read.",
    description: 'Paste any text or speak a command. Groq AI condenses it into 2 sharp sentences, reads the summary aloud, and lets you send it as an email with one tap.',
    icon: Sparkles
  },
  {
    id: 'todo',
    expression: 'determined',
    bg: '#9999ff',
    panel: '#8080ff',
    accent: '#9999ff',
    label: 'VOICE TO-DO',
    tagline: 'Say it. Done.',
    description: 'Say "Add buy a sensor" and the task is extracted, timestamped, and prioritized automatically. 🔴 High / 🟡 Medium / 🟢 Low — detected from urgency words in your voice.',
    icon: CheckSquare
  }
];`;
  content = content.substring(0, featuresOldStart) + newFeatures + content.substring(featuresOldEnd);

  // 5. Update Hero Section background and styling
  content = content.replace(/bg-\[#0A0A14\]/g, "bg-[#ffe6ff]");
  
  // Ghost text color in Hero
  content = content.replace(
    /className="font-anton text-white text-center tracking-tighter opacity-\[0.04\] leading-none mb-\[10vh\]"/g,
    `className="font-anton text-[#ff99dd] text-center tracking-tighter opacity-[0.07] leading-none mb-[10vh]"`
  );

  // Nav text and button
  content = content.replace(
    /<span className="text-white text-xs font-semibold uppercase tracking-\[0.18em\] opacity-90">/g,
    `<span className="text-[#0a0a0a] text-xs font-semibold uppercase tracking-[0.18em] opacity-90">`
  );
  content = content.replace(
    /className="border-\[1.5px\] border-white\/40 hover:border-white bg-transparent text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-200"/g,
    `className="border-[1.5px] border-[#ff99dd] hover:border-[#ff99dd] bg-transparent text-[#0a0a0a] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#ff99dd] hover:text-white transition-all duration-200"`
  );

  // Hero bottom text
  content = content.replace(
    /className="font-anton text-white leading-none tracking-tight"/g,
    `className="font-anton text-[#0a0a0a] leading-none tracking-tight"`
  );
  content = content.replace(
    /className="text-sm text-white\/60 mt-2 font-medium tracking-wide"/g,
    `className="text-sm text-[#0a0a0a]/60 mt-2 font-medium tracking-wide"`
  );

  // Scroll to wake -> Scroll down
  content = content.replace(
    /<span className="text-xs text-white uppercase tracking-\[0.15em\] font-semibold">\s*scroll to wake\s*<\/span>\s*<ArrowRight className="w-4 h-4 text-white rotate-90 animate-bounce" \/>/g,
    `<span className="text-xs text-[#0a0a0a] uppercase tracking-[0.15em] font-semibold">scroll down</span>
            <ArrowRight className="w-4 h-4 text-[#0a0a0a] rotate-90 animate-bounce" />`
  );
  content = content.replace(
    /onClick=\{\(\) => document\.getElementById\('wake-section'\)\.scrollIntoView\(\{ behavior: 'smooth' \}\)\}/g,
    `onClick={() => document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' })}`
  );

  // 6. Fix Sleeping Character position
  const sleepingBlockOld = `          {/* Sleeping SVG Character */}
          <div 
            className="relative flex items-center justify-center z-10 select-none cursor-pointer group"
            style={{ height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)' }}
            onClick={() => {
              // Smooth scroll to wake up
              document.getElementById('wake-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <SleepingSVG className="w-full h-full transform transition-all duration-500 group-hover:scale-105" />
          </div>`;
  const sleepingBlockNew = `          {/* Sleeping SVG Character */}
          <div 
            className="absolute z-10 select-none pointer-events-none"
            style={{ 
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)'
            }}
          >
            <SleepingSVG className="w-full h-full" />
          </div>`;
  if (content.includes("Sleeping SVG Character")) {
    const startIdx = content.indexOf("{/* Sleeping SVG Character */}");
    const endIdx = content.indexOf("</div>", startIdx) + 6;
    content = content.substring(0, startIdx) + sleepingBlockNew + content.substring(endIdx);
  }

  // 7. Update Carousel Ghost Text Opacity
  content = content.replace(
    /className="font-anton text-white\/5 text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"/g,
    `className="font-anton text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"`
  );
  content = content.replace(
    /color: FEATURES\[activeIndex\]\.accent,/g,
    `color: FEATURES[activeIndex].accent, opacity: 0.07,`
  );
  // Remove existing text-white/5 from ghost text if present
  content = content.replace(
    /className="font-anton text-white\/\[0\.04\] text-center/g,
    `className="font-anton text-center`
  );
  
  // Ghost text for carousel is near `id="features-section"`
  const carouselGhostOld = `          <h2 
            className="font-anton text-white/5 text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"`;
  const carouselGhostNew = `          <h2 
            className="font-anton text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"`;
  content = content.replace(carouselGhostOld, carouselGhostNew);

  // Wait, let's just make sure the style object has the color set. In previous App.jsx it had `color: FEATURES[activeIndex].accent,`? No, let's check.
  // Actually, I can just replace the whole ghost text block if I'm not sure.
  const ghostTextStart = content.indexOf("{/* Giant Ghost Text activeFeature.label */}");
  if (ghostTextStart !== -1) {
    const ghostTextEnd = content.indexOf("</div>", ghostTextStart) + 6;
    const newGhostText = `{/* Giant Ghost Text activeFeature.label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden mix-blend-overlay">
          <h2 
            className="font-anton text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"
            style={{ 
              fontSize: 'clamp(100px, 30vw, 400px)', 
              color: FEATURES[activeIndex].accent,
              opacity: 0.07,
              transform: \`scale(\${1 + activeIndex * 0.02}) translateY(-5%)\`,
              letterSpacing: '-0.02em'
            }}
          >
            {FEATURES[activeIndex].label}
          </h2>
        </div>`;
    content = content.substring(0, ghostTextStart) + newGhostText + content.substring(ghostTextEnd);
  }

  // 8. Update Footer
  const footerOldStart = content.indexOf("{/* 4. FOOTER STRIP */}");
  const footerOldEnd = content.indexOf("</footer>", footerOldStart) + 9;
  const newFooter = `{/* 3. FOOTER STRIP */}
      <footer className="relative w-full bg-[#0a0a0a] border-t border-[#ffcc99]/20 flex flex-col md:flex-row justify-between items-center px-8 sm:px-16 py-8 gap-4 md:gap-0 z-40">
        <div>
          <span className="font-anton text-2xl text-[#ffcc99] opacity-90 select-none">
            VOICE IVORY
          </span>
        </div>
        
        <div>
          <p className="font-syne text-xs text-[#ffcc99]/70 font-semibold tracking-wide text-center">
            Built with Groq AI · Web Speech API · Gmail SMTP
          </p>
        </div>

        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#ffcc99]/70 hover:text-[#ffcc99] transition-colors duration-200"
          >
            <GithubIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#ffcc99]/70 hover:text-[#ffcc99] transition-colors duration-200"
          >
            <TwitterIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="mailto:contact@voiceivory.com" 
            className="text-[#ffcc99]/70 hover:text-[#ffcc99] transition-colors duration-200"
          >
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
      </footer>`;
  content = content.substring(0, footerOldStart) + newFooter + content.substring(footerOldEnd);

  fs.writeFileSync('src/App.jsx', content);
  console.log("App.jsx updated with new design.");
} catch (e) {
  console.error(e);
}
