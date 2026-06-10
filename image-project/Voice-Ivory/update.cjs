const fs = require('fs');

try {
  let content = fs.readFileSync('src/App.jsx', 'utf8');

  // 1. Add import
  content = content.replace(
    "import { \n  Mail,",
    "import { SleepingSVG, StirringSVG, AwakeSVG, ExcitedSVG, FocusedSVG, DeterminedSVG } from './characters';\nimport { \n  Mail,"
  );

  // 2. Remove old SVGs
  const startSvg = content.indexOf("// 1. Sleeping SVG (Section 1 & 2)");
  const endSvg = content.indexOf("// ==========================================\n// BACKGROUND GRAIN OVERLAY");
  if (startSvg !== -1 && endSvg !== -1) {
    content = content.substring(0, startSvg) + content.substring(endSvg);
  } else {
    console.warn("Could not find SVG block boundaries.");
  }

  // 3. Update scroll logic
  const oldScrollLogic = `    const handleScroll = () => {
      if (!section2Ref.current) return;
      const rect = section2Ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far section 2 has scrolled into viewport
      // Starts entering from bottom (rect.top = windowHeight) -> progress = 0
      // Fully occupies viewport (rect.top = 0) -> progress = 1
      const totalDistance = windowHeight;
      const scrolled = windowHeight - rect.top;
      
      let progress = scrolled / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      setWakeProgress(progress);
    };`;

  const newScrollLogic = `    const handleScroll = () => {
      if (!section2Ref.current) return;
      const rect = section2Ref.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = section2Ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      let progress = (window.scrollY - sectionTop) / (sectionHeight - windowHeight);
      progress = Math.max(0, Math.min(1, progress || 0));
      setWakeProgress(progress);
    };`;
  content = content.replace(oldScrollLogic, newScrollLogic);

  // 4. Update wake-section
  const oldWakeSection = `      {/* 2. WAKE-UP TRANSITION SECTION */}
      <section 
        id="wake-section"
        ref={section2Ref}
        className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden z-20 transition-all duration-300"
        style={{ 
          backgroundColor: \`rgb(\${Math.round(10 + 16 * wakeProgress)}, 10, \${Math.round(20 + 26 * wakeProgress)})\`
        }}
      >
        <GrainOverlay />

        {/* Giant Ghost Text Transitions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
          <h2 
            className="font-anton text-white text-center tracking-tighter absolute leading-none"
            style={{ 
              fontSize: 'clamp(70px, 22vw, 320px)', 
              opacity: Math.max(0, 0.04 * (1 - wakeProgress)),
              transform: \`scale(\${1 - wakeProgress * 0.05})\` 
            }}
          >
            VOICE IVORY
          </h2>
          <h2 
            className="font-anton text-white text-center tracking-tighter absolute leading-none"
            style={{ 
              fontSize: 'clamp(70px, 22vw, 320px)', 
              opacity: Math.max(0, 0.06 * wakeProgress),
              transform: \`scale(\${0.95 + wakeProgress * 0.05})\` 
            }}
          >
            AWAKE
          </h2>
        </div>

        {/* Good Morning Fading Text */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-[15] transition-all duration-300"
          style={{ 
            opacity: Math.max(0, Math.min(1, (wakeProgress - 0.7) * 3.3)),
            top: \`\${20 - (wakeProgress - 0.7) * 4}%\`
          }}
        >
          <h3 
            className="font-anton text-white tracking-tight leading-none uppercase"
            style={{ fontSize: 'clamp(40px, 8vw, 100px)' }}
          >
            Good morning.
          </h3>
          <p className="font-syne text-lg text-white/80 mt-3 font-semibold tracking-wide">
            Let's get to work.
          </p>
        </div>

        {/* Character Fading Layers & Float Particles */}
        <div 
          className="relative flex items-center justify-center select-none"
          style={{ height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)' }}
        >
          {/* Particles surrounding character */}
          {PARTICLES.map((p, idx) => {
            const particleOpacity = Math.max(0, Math.min(0.7, wakeProgress * 0.7));
            const particleScale = wakeProgress;
            return (
              <div 
                key={idx}
                className="absolute rounded-full pointer-events-none transition-transform duration-100"
                style={{
                  left: p.left,
                  top: p.top,
                  width: \`\${p.size}px\`,
                  height: \`\${p.size}px\`,
                  backgroundColor: p.color,
                  opacity: particleOpacity,
                  transform: \`scale(\${particleScale}) translateY(\${Math.sin(wakeProgress * Math.PI + idx) * 8}px)\`,
                  boxShadow: \`0 0 12px \${p.color}\`,
                  animation: \`float \${p.duration} ease-in-out infinite\`,
                  animationDelay: p.delay,
                }}
              />
            );
          })}

          {/* Core SVGs mapped to opacities */}
          <SleepingSVG 
            className="absolute inset-0 w-full h-full transition-all duration-300" 
            style={{ 
              opacity: Math.max(0, Math.min(1, 1 - wakeProgress * 2)),
              transform: \`scale(\${1 - wakeProgress * 0.05})\`
            }} 
          />
          <StirringSVG 
            className="absolute inset-0 w-full h-full transition-all duration-300" 
            style={{ 
              opacity: wakeProgress < 0.5 ? wakeProgress * 2 : Math.max(0, (1 - wakeProgress) * 2),
              transform: 'scale(1)'
            }} 
          />
          <AwakeSVG 
            className="absolute inset-0 w-full h-full transition-all duration-300" 
            style={{ 
              opacity: Math.max(0, Math.min(1, (wakeProgress - 0.5) * 2)),
              transform: \`scale(\${0.95 + wakeProgress * 0.05})\`
            }} 
          />
        </div>
      </section>`;

  const newWakeSection = `      {/* 2. WAKE-UP TRANSITION SECTION */}
      <section 
        id="wake-section"
        ref={section2Ref}
        className="relative w-full z-20"
        style={{ 
          height: '300vh',
          backgroundColor: \`rgb(\${Math.round(10 + 16 * wakeProgress)}, 10, \${Math.round(20 + 26 * wakeProgress)})\`
        }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
          <GrainOverlay />

          {/* Giant Ghost Text Transitions */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
            <h2 
              className="font-anton text-white text-center tracking-tighter absolute leading-none"
              style={{ 
                fontSize: 'clamp(70px, 22vw, 320px)', 
                opacity: Math.max(0, 0.04 * (1 - wakeProgress)),
                transform: \`scale(\${1 - wakeProgress * 0.05})\` 
              }}
            >
              VOICE IVORY
            </h2>
            <h2 
              className="font-anton text-white text-center tracking-tighter absolute leading-none"
              style={{ 
                fontSize: 'clamp(70px, 22vw, 320px)', 
                opacity: Math.max(0, 0.06 * wakeProgress),
                transform: \`scale(\${0.95 + wakeProgress * 0.05})\` 
              }}
            >
              AWAKE
            </h2>
          </div>

          {/* Good Morning Fading Text */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-[15] transition-all duration-300"
            style={{ 
              opacity: Math.max(0, Math.min(1, (wakeProgress - 0.7) * 3.3)),
              top: \`\${20 - (wakeProgress - 0.7) * 4}%\`
            }}
          >
            <h3 
              className="font-anton text-white tracking-tight leading-none uppercase"
              style={{ fontSize: 'clamp(40px, 8vw, 100px)' }}
            >
              Good morning.
            </h3>
            <p className="font-syne text-lg text-white/80 mt-3 font-semibold tracking-wide">
              Let's get to work.
            </p>
          </div>

          {/* Character Fading Layers & Float Particles */}
          <div 
            className="relative flex items-center justify-center select-none"
            style={{ height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)' }}
          >
            {/* Particles surrounding character */}
            {PARTICLES.map((p, idx) => {
              const particleOpacity = Math.max(0, Math.min(0.7, wakeProgress * 0.7));
              const particleScale = wakeProgress;
              return (
                <div 
                  key={idx}
                  className="absolute rounded-full pointer-events-none transition-transform duration-100"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: \`\${p.size}px\`,
                    height: \`\${p.size}px\`,
                    backgroundColor: p.color,
                    opacity: particleOpacity,
                    transform: \`scale(\${particleScale}) translateY(\${Math.sin(wakeProgress * Math.PI + idx) * 8}px)\`,
                    boxShadow: \`0 0 12px \${p.color}\`,
                    animation: \`float \${p.duration} ease-in-out infinite\`,
                    animationDelay: p.delay,
                  }}
                />
              );
            })}

            {/* Core SVGs mapped to opacities */}
            <SleepingSVG 
              className="absolute inset-0 w-full h-full transition-opacity duration-300" 
              style={{ 
                opacity: wakeProgress < 0.3 ? 1 : Math.max(0, 1 - (wakeProgress - 0.3) * 5)
              }} 
            />
            <StirringSVG 
              className="absolute inset-0 w-full h-full transition-opacity duration-300" 
              style={{ 
                opacity: wakeProgress < 0.3 ? 0 : wakeProgress < 0.5 ? (wakeProgress - 0.3) * 5 : wakeProgress < 0.7 ? 1 : Math.max(0, 1 - (wakeProgress - 0.7) * 5)
              }} 
            />
            <AwakeSVG 
              className="absolute inset-0 w-full h-full transition-opacity duration-300" 
              style={{ 
                opacity: wakeProgress < 0.7 ? 0 : Math.min(1, (wakeProgress - 0.7) * 5)
              }} 
            />
          </div>
        </div>
      </section>`;
  
  if (content.includes("id=\"wake-section\"")) {
    content = content.replace(oldWakeSection, newWakeSection);
  } else {
    console.warn("Could not find wake section");
  }

  // 5. Remove Try it free block
  const oldTryBlock = `          {/* Bottom Right: Try It Free Button */}
          <div className="flex justify-start md:justify-end items-center">
            <button 
              onClick={() => {
                setActiveTab(FEATURES[activeIndex].id);
                setIsDemoOpen(true);
              }}
              className="group flex items-center gap-4 bg-transparent border-none text-left p-0 select-none cursor-pointer"
            >
              <span className="font-anton text-white text-3xl md:text-5xl tracking-wide uppercase opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                TRY IT FREE
              </span>
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: FEATURES[activeIndex].accent }}
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-black stroke-[2.5]" />
              </div>
            </button>
          </div>`;
  content = content.replace(oldTryBlock, "");

  fs.writeFileSync('src/App.jsx', content);
  console.log("App.jsx updated successfully");
} catch (e) {
  console.error("Error updating file: ", e);
}
