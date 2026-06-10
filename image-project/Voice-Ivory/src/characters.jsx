import React from 'react';

// Common Gradients and Filters
const Defs = () => (
  <defs>
    <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4F46E5" />
      <stop offset="100%" stopColor="#312E81" />
    </linearGradient>
    <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#334155" />
      <stop offset="100%" stopColor="#0F172A" />
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FED7AA" />
      <stop offset="100%" stopColor="#FDBA74" />
    </linearGradient>
    <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
    </filter>
  </defs>
);

// 1. SleepingSVG: Lying down horizontally, head resting on hands
export const SleepingSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)" transform="translate(20, 160) rotate(-75)">
      {/* Legs (Baggy Pants) */}
      <path d="M 60,110 Q 70,160 80,180 Q 90,200 70,210 Q 50,180 40,110 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 90,110 Q 110,150 120,170 Q 130,190 110,200 Q 80,160 70,110 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Sneakers */}
      <path d="M 60,205 C 70,200 85,200 85,215 C 85,225 70,230 60,225 C 50,220 50,210 60,205 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 60,220 C 70,215 80,215 80,220 C 80,225 70,230 60,225 Z" fill="#94A3B8" />
      <path d="M 100,195 C 110,190 125,190 125,205 C 125,215 110,220 100,215 C 90,210 90,200 100,195 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 100,210 C 110,205 120,205 120,210 C 120,215 110,220 100,215 Z" fill="#94A3B8" />
      
      {/* Torso (Hoodie) */}
      <path d="M 40,30 C 20,60 30,100 50,120 C 80,130 110,110 100,70 C 90,40 70,20 40,30 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Hands acting as pillow */}
      <circle cx="25" cy="40" r="14" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
      <circle cx="35" cy="25" r="14" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
      
      {/* Head */}
      <circle cx="60" cy="20" r="35" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
      {/* Beanie */}
      <path d="M 28,10 Q 60,-20 92,10 Q 60,30 28,10 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      {/* Beanie Fold */}
      <path d="M 25,12 Q 60,-5 95,12 Q 90,22 60,10 Q 30,22 25,12 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
      
      {/* Face (Sleeping) */}
      <path d="M 45,35 Q 52,42 59,35" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <path d="M 75,35 Q 82,42 89,35" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="40" cy="45" rx="6" ry="4" fill="#F43F5E" opacity="0.4" />
      <ellipse cx="90" cy="45" rx="6" ry="4" fill="#F43F5E" opacity="0.4" />
      {/* Mouth */}
      <path d="M 63,55 Q 67,58 71,55" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
      
      {/* Shine Dots */}
      <circle cx="75" cy="-2" r="3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="45" cy="80" r="4" fill="#FFFFFF" opacity="0.4" />
    </g>
  </svg>
);

// 2. StirringSVG: Sitting up, one eye half open, hand rubbing eye
export const StirringSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)">
      {/* Legs */}
      <path d="M 80,160 Q 60,190 50,210 Q 70,220 90,190 Q 100,170 80,160 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 160,160 Q 180,190 190,210 Q 170,220 150,190 Q 140,170 160,160 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      
      {/* Sneakers */}
      <path d="M 40,200 C 30,210 40,225 55,220 C 65,215 70,205 60,195 C 50,190 45,190 40,200 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 45,210 C 50,215 60,210 55,215 Z" fill="#94A3B8" />
      <path d="M 200,200 C 210,210 200,225 185,220 C 175,215 170,205 180,195 C 190,190 195,190 200,200 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 195,210 C 190,215 180,210 185,215 Z" fill="#94A3B8" />
      
      {/* Torso */}
      <path d="M 70,90 Q 120,70 170,90 Q 160,150 120,170 Q 80,150 70,90 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Left Arm Resting */}
      <path d="M 70,100 Q 50,130 75,160" fill="none" stroke="#312E81" strokeWidth="22" strokeLinecap="round" />
      <path d="M 70,100 Q 50,130 75,160" fill="none" stroke="#020617" strokeWidth="26" strokeLinecap="round" opacity="0.3" />
      <path d="M 70,100 Q 50,130 75,160" fill="none" stroke="url(#hoodieGrad)" strokeWidth="20" strokeLinecap="round" />
      <circle cx="80" cy="165" r="12" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />

      {/* Head */}
      <g transform="translate(120, 75) rotate(5) translate(-120, -75)">
        <circle cx="120" cy="75" r="40" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
        {/* Beanie */}
        <path d="M 85,60 Q 120,10 155,60 Q 120,75 85,60 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
        {/* Beanie Fold */}
        <path d="M 80,62 Q 120,48 160,62 Q 155,72 120,60 Q 85,72 80,62 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
        
        {/* Face */}
        {/* Left eye half open */}
        <path d="M 95,85 L 110,85" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
        <path d="M 95,80 Q 102,75 110,80" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        
        {/* Right eye closed */}
        <path d="M 130,85 Q 137,90 145,85" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
        
        {/* Blush */}
        <ellipse cx="92" cy="98" rx="8" ry="5" fill="#F43F5E" opacity="0.3" />
        <ellipse cx="148" cy="98" rx="8" ry="5" fill="#F43F5E" opacity="0.3" />
        {/* Mouth */}
        <path d="M 115,102 Q 120,106 125,102" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        
        {/* Right Arm rubbing eye */}
        <path d="M 170,100 Q 190,110 140,85" fill="none" stroke="url(#hoodieGrad)" strokeWidth="20" strokeLinecap="round" />
        <circle cx="140" cy="85" r="14" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
        
        <circle cx="135" cy="40" r="4" fill="#FFFFFF" opacity="0.6" />
      </g>
    </g>
  </svg>
);

// 3. AwakeSVG: Standing upright, fist raised, energetic
export const AwakeSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)">
      {/* Legs */}
      <path d="M 90,140 L 80,210 L 105,210 L 115,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 150,140 L 160,210 L 135,210 L 125,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Sneakers */}
      <path d="M 70,210 C 60,210 60,230 85,230 C 110,230 115,210 105,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 75,222 L 100,222" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <path d="M 170,210 C 180,210 180,230 155,230 C 130,230 125,210 135,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 165,222 L 140,222" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

      {/* Torso */}
      <path d="M 85,80 L 155,80 L 145,150 L 95,150 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Left Arm Raised */}
      <path d="M 85,90 Q 50,60 60,30" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="62" cy="25" r="14" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
      
      {/* Right Arm on Hip */}
      <path d="M 155,90 Q 185,110 145,135" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="140" cy="135" r="12" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />

      {/* Head */}
      <circle cx="120" cy="60" r="38" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
      {/* Beanie */}
      <path d="M 86,45 Q 120,-5 154,45 Q 120,60 86,45 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 82,47 Q 120,33 158,47 Q 153,57 120,45 Q 87,57 82,47 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
      
      {/* Face (Awake & Energetic) */}
      <ellipse cx="102" cy="65" rx="5" ry="8" fill="#020617" />
      <ellipse cx="138" cy="65" rx="5" ry="8" fill="#020617" />
      <circle cx="104" cy="63" r="2" fill="#FFFFFF" />
      <circle cx="140" cy="63" r="2" fill="#FFFFFF" />
      
      {/* Blush */}
      <ellipse cx="90" cy="75" rx="7" ry="4" fill="#F43F5E" opacity="0.4" />
      <ellipse cx="150" cy="75" rx="7" ry="4" fill="#F43F5E" opacity="0.4" />
      {/* Mouth Wide Open Smile */}
      <path d="M 110,75 Q 120,90 130,75 Z" fill="#020617" stroke="#020617" strokeWidth="2" strokeLinejoin="round" />
      
      <circle cx="135" cy="25" r="5" fill="#FFFFFF" opacity="0.6" />
    </g>
  </svg>
);

// 4. ExcitedSVG: Email feature - Similar to awake but both hands up framing face
export const ExcitedSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)">
      <path d="M 90,140 L 80,210 L 105,210 L 115,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 150,140 L 160,210 L 135,210 L 125,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 70,210 C 60,210 60,230 85,230 C 110,230 115,210 105,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 170,210 C 180,210 180,230 155,230 C 130,230 125,210 135,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 85,80 L 155,80 L 145,150 L 95,150 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      
      {/* Arms up excited */}
      <path d="M 85,90 Q 50,70 70,40" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="75" cy="35" r="13" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
      <path d="M 155,90 Q 190,70 170,40" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="165" cy="35" r="13" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />

      <circle cx="120" cy="65" r="38" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 86,50 Q 120,0 154,50 Q 120,65 86,50 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 82,52 Q 120,38 158,52 Q 153,62 120,50 Q 87,62 82,52 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
      
      <path d="M 95,65 Q 102,55 109,65" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <path d="M 131,65 Q 138,55 145,65" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="92" cy="78" rx="8" ry="5" fill="#F43F5E" opacity="0.5" />
      <ellipse cx="148" cy="78" rx="8" ry="5" fill="#F43F5E" opacity="0.5" />
      <path d="M 110,80 Q 120,100 130,80 Z" fill="#020617" stroke="#020617" strokeWidth="2" />
    </g>
  </svg>
);

// 5. FocusedSVG: Summarizer feature - Arms crossed, looking intently
export const FocusedSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)">
      <path d="M 90,140 L 80,210 L 105,210 L 115,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 150,140 L 160,210 L 135,210 L 125,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 70,210 C 60,210 60,230 85,230 C 110,230 115,210 105,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 170,210 C 180,210 180,230 155,230 C 130,230 125,210 135,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 85,80 L 155,80 L 145,150 L 95,150 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      
      {/* Crossed arms */}
      <path d="M 80,95 L 140,110 L 155,95" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 160,95 L 100,110" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="105" cy="110" r="10" fill="url(#skinGrad)" stroke="#020617" strokeWidth="3" />
      <circle cx="135" cy="110" r="10" fill="url(#skinGrad)" stroke="#020617" strokeWidth="3" />

      <circle cx="120" cy="55" r="38" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 86,40 Q 120,-10 154,40 Q 120,55 86,40 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 82,42 Q 120,28 158,42 Q 153,52 120,40 Q 87,52 82,42 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
      
      <circle cx="102" cy="60" r="4" fill="#020617" />
      <circle cx="138" cy="60" r="4" fill="#020617" />
      <path d="M 95,52 L 109,55" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <path d="M 145,52 L 131,55" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <path d="M 115,75 L 125,75" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. DeterminedSVG: To-Do feature - Hand on chin, confident smirk
export const DeterminedSVG = ({ className, style }) => (
  <svg viewBox="0 0 240 240" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs />
    <g filter="url(#shadowFilter)">
      <path d="M 85,140 L 75,210 L 100,210 L 115,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 155,140 L 165,210 L 140,210 L 125,140 Z" fill="url(#pantsGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 65,210 C 55,210 55,230 80,230 C 105,230 110,210 100,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 175,210 C 185,210 185,230 160,230 C 135,230 130,210 140,210 Z" fill="#FFFFFF" stroke="#020617" strokeWidth="4" />
      <path d="M 85,80 L 155,80 L 145,150 L 95,150 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      
      {/* Hand on chin */}
      <path d="M 155,90 Q 185,130 125,85" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="125" cy="85" r="12" fill="url(#skinGrad)" stroke="#020617" strokeWidth="4" />
      {/* Hand in pocket */}
      <path d="M 85,95 Q 60,110 90,135" fill="none" stroke="url(#hoodieGrad)" strokeWidth="22" strokeLinecap="round" />

      <circle cx="120" cy="55" r="38" fill="url(#skinGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 86,40 Q 120,-10 154,40 Q 120,55 86,40 Z" fill="url(#hoodieGrad)" stroke="#020617" strokeWidth="5" />
      <path d="M 82,42 Q 120,28 158,42 Q 153,52 120,40 Q 87,52 82,42 Z" fill="#312E81" stroke="#020617" strokeWidth="4" />
      
      {/* Confident eyes */}
      <path d="M 96,55 L 108,58" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <circle cx="102" cy="62" r="4" fill="#020617" />
      <circle cx="103" cy="61" r="1.5" fill="#FFFFFF" />
      
      <path d="M 144,55 L 132,58" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <circle cx="138" cy="62" r="4" fill="#020617" />
      <circle cx="137" cy="61" r="1.5" fill="#FFFFFF" />
      
      {/* Smirk */}
      <path d="M 112,75 Q 125,85 130,72" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
