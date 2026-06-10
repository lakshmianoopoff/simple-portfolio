const fs = require('fs');

try {
  let content = fs.readFileSync('src/App.jsx', 'utf8');

  // 1. HERO SECTION
  // Change background
  content = content.replace(/bg-\[#ffe6ff\]/g, "bg-[#2a0018]");
  
  // Update Hero ghost text
  const oldHeroGhost = `        {/* Giant Ghost Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
          <h1 
            className="font-anton text-[#ff99dd] text-center tracking-tighter opacity-[0.07] leading-none mb-[10vh]"
            style={{ fontSize: 'clamp(70px, 22vw, 320px)', letterSpacing: '-0.02em' }}
          >
            VOICE IVORY
          </h1>
        </div>`;
  const newHeroGhost = `        {/* Giant Ghost Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
          <h1 
            className="font-anton text-white text-center tracking-tighter absolute leading-none"
            style={{ fontSize: 'clamp(100px, 28vw, 400px)', opacity: 0.12, letterSpacing: '-0.02em' }}
          >
            VOICE IVORY
          </h1>
        </div>`;
  if (content.includes("text-[#ff99dd]")) {
    content = content.replace(oldHeroGhost, newHeroGhost);
  }

  // Update Top Navbar
  content = content.replace(
    `<span className="text-[#0a0a0a] text-xs font-semibold uppercase tracking-[0.18em] opacity-90">`,
    `<span className="text-white text-xs font-semibold uppercase tracking-[0.18em] opacity-90">`
  );
  content = content.replace(
    `className="border-[1.5px] border-[#ff99dd] hover:border-[#ff99dd] bg-transparent text-[#0a0a0a] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#ff99dd] hover:text-white transition-all duration-200"`,
    `className="border-[1.5px] border-[#ffcc99] hover:border-[#ffcc99] bg-transparent text-[#ffcc99] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#ffcc99] hover:text-black transition-all duration-200"`
  );

  // Sleeping SVG Character
  const oldSleeping = `          {/* Sleeping SVG Character */}
          <div 
            className="absolute z-[10] select-none pointer-events-none"
            style={{ 
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)'
            }}
          >
            <SleepingSVG className="w-full h-full" />
          </div>`;
  const newSleeping = `          {/* Sleeping SVG Character */}
          <div 
            className="absolute z-[20] select-none pointer-events-none"
            style={{ 
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              height: '85vh', width: '85vh'
            }}
          >
            <SleepingSVG className="w-full h-full drop-shadow-2xl" />
          </div>`;
  content = content.replace(oldSleeping, newSleeping);

  // Hero bottom left text
  content = content.replace(
    `className="font-anton text-[#0a0a0a] leading-none tracking-tight"`,
    `className="font-anton text-white leading-none tracking-tight"`
  );
  content = content.replace(
    `className="text-sm text-[#0a0a0a]/60 mt-2 font-medium tracking-wide"`,
    `className="text-sm text-white/60 mt-2 font-medium tracking-wide"`
  );

  // Scroll Down text
  const oldScrollDown = `<span className="text-xs text-[#0a0a0a] uppercase tracking-[0.15em] font-semibold">scroll down</span>
            <ArrowRight className="w-4 h-4 text-[#0a0a0a] rotate-90 animate-bounce" />`;
  const newScrollDown = `<span className="font-anton text-xl text-white uppercase tracking-wider">SCROLL DOWN</span>
            <ArrowRight className="w-5 h-5 text-white" />`;
  content = content.replace(oldScrollDown, newScrollDown);
  content = content.replace(`opacity-40 hover:opacity-80`, `opacity-80 hover:opacity-100`);

  // 2. FEATURES Array (Colors)
  const oldFeatures = `const FEATURES = [
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
  const newFeatures = `const FEATURES = [
  {
    id: 'email',
    expression: 'excited',
    bg: '#2a0018',
    panel: '#15000c',
    accent: '#ff99dd',
    label: 'VOICE EMAIL',
    tagline: 'Speak it. Send it.',
    description: 'Dictate your email naturally — AI extracts the recipient, subject, and writes a professional body. Choose from Formal, Casual, Short, or Polite tone. Sends via Gmail automatically.',
    icon: Mail
  },
  {
    id: 'summarize',
    expression: 'focused',
    bg: '#002a00',
    panel: '#001500',
    accent: '#99ff99',
    label: 'SMART SUMMARIZER',
    tagline: "Too long. Didn't read.",
    description: 'Paste any text or speak a command. Groq AI condenses it into 2 sharp sentences, reads the summary aloud, and lets you send it as an email with one tap.',
    icon: Sparkles
  },
  {
    id: 'todo',
    expression: 'determined',
    bg: '#0a0a2a',
    panel: '#050515',
    accent: '#9999ff',
    label: 'VOICE TO-DO',
    tagline: 'Say it. Done.',
    description: 'Say "Add buy a sensor" and the task is extracted, timestamped, and prioritized automatically. 🔴 High / 🟡 Medium / 🟢 Low — detected from urgency words in your voice.',
    icon: CheckSquare
  }
];`;
  content = content.replace(oldFeatures, newFeatures);

  // Carousel Ghost Text
  const oldGhost = `<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden mix-blend-overlay">
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
  const newGhost = `<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden mix-blend-overlay">
          <h2 
            className="font-anton text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"
            style={{ 
              fontSize: 'clamp(100px, 28vw, 380px)', 
              color: '#ffffff',
              opacity: 0.12,
              transform: \`scale(\${1 + activeIndex * 0.02}) translateY(-5%)\`,
              letterSpacing: '-0.02em'
            }}
          >
            {FEATURES[activeIndex].label}
          </h2>
        </div>`;
  content = content.replace(oldGhost, newGhost);

  // Add "VOICE IVORY" watermark to bottom right of carousel
  const oldBottomElements = `</div>
          </div>


        </div>
      </section>`;
  const newBottomElements = `</div>
          </div>
          
          {/* Bottom Right: VOICE IVORY Watermark */}
          <div className="flex justify-end items-end pointer-events-none pb-2">
            <span className="font-anton text-white/20 text-4xl md:text-5xl tracking-widest uppercase">
              VOICE IVORY
            </span>
          </div>

        </div>
      </section>`;
  content = content.replace(oldBottomElements, newBottomElements);

  // 3. Footer Updates
  const oldFooter = `{/* 3. FOOTER STRIP */}
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
      
  const newFooter = `{/* 3. FOOTER STRIP */}
      <footer className="relative w-full bg-[#0a0a0a] border-t border-[#ffffff]/10 flex flex-col md:flex-row justify-between items-center px-8 sm:px-16 py-8 gap-4 md:gap-0 z-40">
        <div>
          <span className="font-anton text-2xl text-white opacity-90 select-none">
            VOICE IVORY
          </span>
        </div>
        
        <div>
          <p className="font-syne text-xs font-semibold tracking-wide text-center" style={{ color: 'rgba(255, 204, 153, 0.4)' }}>
            Built with Groq AI · Web Speech API · Gmail SMTP
          </p>
        </div>

        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <GithubIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <TwitterIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="mailto:contact@voiceivory.com" 
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
      </footer>`;
  content = content.replace(oldFooter, newFooter);

  fs.writeFileSync('src/App.jsx', content);
  console.log("App.jsx updated perfectly with TOONHUB spec.");
} catch (e) {
  console.error(e);
}
