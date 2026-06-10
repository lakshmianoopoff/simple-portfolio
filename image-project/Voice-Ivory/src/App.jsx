import React, { useState, useEffect, useRef } from 'react';
import { SleepingSVG, StirringSVG, AwakeSVG, ExcitedSVG, FocusedSVG, DeterminedSVG } from './characters';
import { 
  Mail, 
  Sparkles, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Send, 
  Volume2, 
  VolumeX, 
  Play, 
  Plus, 
  X, 
  Mic, 
  Check, 
  RotateCcw, 
  AlertCircle 
} from 'lucide-react';

// Custom inline SVG icons for GitHub and Twitter/X to avoid missing exports in lucide-react
const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);


// ==========================================
// CHARACTER VECTOR SVGS (INLINE JSX)
// ==========================================

// ==========================================
// BACKGROUND GRAIN OVERLAY
// ==========================================
const GrainOverlay = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay z-[50]">
    <svg width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.6 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// ==========================================
// FIXED FLOATING PARTICLES LIST
// ==========================================
const PARTICLES = [
  { left: '15%', top: '25%', size: 10, color: '#A78BFA', delay: '0s', duration: '2.5s' },
  { left: '22%', top: '65%', size: 14, color: '#60A5FA', delay: '0.5s', duration: '3s' },
  { left: '78%', top: '20%', size: 8, color: '#F472B6', delay: '0.2s', duration: '2.2s' },
  { left: '84%', top: '60%', size: 16, color: '#A78BFA', delay: '0.8s', duration: '2.8s' },
  { left: '12%', top: '45%', size: 12, color: '#F472B6', delay: '0.4s', duration: '2.4s' },
  { left: '88%', top: '35%', size: 6, color: '#60A5FA', delay: '1s', duration: '3.2s' },
  { left: '28%', top: '15%', size: 9, color: '#A78BFA', delay: '0.3s', duration: '2.6s' },
  { left: '72%', top: '70%', size: 15, color: '#F472B6', delay: '0.7s', duration: '2.9s' },
  { left: '20%', top: '80%', size: 7, color: '#60A5FA', delay: '0.1s', duration: '2.1s' },
  { left: '82%', top: '82%', size: 11, color: '#A78BFA', delay: '0.6s', duration: '2.7s' },
];

// ==========================================
// TOONHUB CAROUSEL FEATURES DATA
// ==========================================
const FEATURES = [
  {
    id: 'email',
    expression: 'excited',
    bg: '#fff0f8',
    panel: '#ffe6f2',
    accent: '#ff99dd',
    textAccent: '#ff99dd',
    label: 'VOICE EMAIL',
    tagline: 'Speak it. Send it.',
    description: 'Dictate your email naturally — AI extracts the recipient, subject, and writes a professional body. Choose from Formal, Casual, Short, or Polite tone. Sends via Gmail automatically.',
    icon: Mail
  },
  {
    id: 'summarize',
    expression: 'focused',
    bg: '#f0fff0',
    panel: '#e6ffe6',
    accent: '#99ff99',
    textAccent: '#22aa44',
    label: 'SMART SUMMARIZER',
    tagline: "Too long. Didn't read.",
    description: 'Paste any text or speak a command. Groq AI condenses it into 2 sharp sentences, reads the summary aloud, and lets you send it as an email with one tap.',
    icon: Sparkles
  },
  {
    id: 'todo',
    expression: 'determined',
    bg: '#f0f0ff',
    panel: '#e6e6ff',
    accent: '#9999ff',
    textAccent: '#9999ff',
    label: 'VOICE TO-DO',
    tagline: 'Say it. Done.',
    description: 'Say "Add buy a sensor" and the task is extracted, timestamped, and prioritized automatically. 🔴 High / 🟡 Medium / 🟢 Low — detected from urgency words in your voice.',
    icon: CheckSquare
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
function App() {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  
  // Interactive Lab Modal States
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('email');

  // Email simulation states
  const [emailRecipient, setEmailRecipient] = useState('manager@company.com');
  const [emailSubject, setEmailSubject] = useState('Project Status Update');
  const [emailTone, setEmailTone] = useState('formal');
  const [isRecordingEmail, setIsRecordingEmail] = useState(false);
  const [emailTranscript, setEmailTranscript] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [isSentEmail, setIsSentEmail] = useState(false);

  // Summarizer simulation states
  const [inputText, setInputText] = useState(
    "Groq is a startup that designs processors specifically designed for running artificial intelligence applications. Their LPU (Language Processing Unit) is designed to run large language models at unprecedented speeds, generating hundreds of tokens per second. Compared to traditional GPUs, which process data in parallel chunks, the LPU uses a deterministic architecture that guarantees consistent latency, making it ideal for real-time speech and chat interfaces. By combining this hardware with state-of-the-art models, developers can create voice assistants that respond instantly without any noticeable delay, mirroring natural human conversation."
  );
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryOutput, setSummaryOutput] = useState('');
  const [isPlayingSummary, setIsPlayingSummary] = useState(false);

  // Todo simulation states
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy a new microphone sensor", priority: "🔴 High", timestamp: "5 mins ago", done: false },
    { id: 2, text: "Send weekly presentation status", priority: "🟡 Medium", timestamp: "1 hour ago", done: true }
  ]);
  const [todoInput, setTodoInput] = useState('');
  const [isRecordingTodo, setIsRecordingTodo] = useState(false);

  const section2Ref = useRef(null);

  

  // Update text fades when active feature changes
  useEffect(() => {
    setFadeKey((prev) => prev + 1);
  }, [activeIndex]);

  // TOONHUB carousel navigation logic
  const handleNavigate = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (dir === 'next') {
        return (prev + 1) % 3;
      } else {
        return (prev + 2) % 3;
      }
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Directly click left/right card to slide
  const handleCardClick = (index) => {
    if (index === activeIndex || isAnimating) return;
    if (index === (activeIndex + 1) % 3) {
      handleNavigate('next');
    } else {
      handleNavigate('prev');
    }
  };

  // Calculate position & scale styles for TOONHUB role cards
  const getRoleStyle = (index) => {
    let role = 'center';
    if (index === activeIndex) {
      role = 'center';
    } else if (index === (activeIndex + 1) % 3) {
      role = 'right';
    } else {
      role = 'left';
    }

    switch (role) {
      case 'center':
        return {
          left: '50%',
          height: '88%',
          bottom: '0%',
          transform: 'translateX(-50%) scale(1.65)',
          opacity: 1,
          zIndex: 20,
          filter: 'none',
        };
      case 'left':
        return {
          left: '28%',
          height: '26%',
          bottom: '10%',
          transform: 'translateX(-50%) scale(1)',
          opacity: 0.8,
          zIndex: 10,
          filter: 'blur(2px)',
        };
      case 'right':
        return {
          left: '72%',
          height: '26%',
          bottom: '10%',
          transform: 'translateX(-50%) scale(1)',
          opacity: 0.8,
          zIndex: 10,
          filter: 'blur(2px)',
        };
    }
  };

  // ==========================================
  // SIMULATOR ACTION HANDLERS
  // ==========================================

  // Email: Tone Templates
  const toneEmails = {
    formal: (subject, rec, trans) => 
      `Subject: ${subject}\nTo: ${rec}\n\nDear recipient,\n\nRegarding: ${trans || "[Spoken update details]"}.\n\nThis communication is to confirm the status described above. We will execute the next steps as aligned with the timeline. Please contact us if you require further details.\n\nSincerely,\nVoice Ivory AI`,
    casual: (subject, rec, trans) => 
      `Subject: ${subject}\nTo: ${rec}\n\nHey there!\n\nJust wanted to send a quick note about: ${trans || "[Spoken update details]"}.\n\nLet me know if you need anything else or have questions. Catch you later!\n\nBest,\nVoice Ivory`,
    short: (subject, rec, trans) => 
      `To: ${rec}\n\nHi,\n\nQuick summary: ${trans || "[Spoken update details]"}.\n\nThanks,\nVoice Ivory AI`,
    polite: (subject, rec, trans) => 
      `Subject: ${subject}\nTo: ${rec}\n\nDear Friend,\n\nI hope you are having a wonderful day. I would like to kindly update you on: ${trans || "[Spoken update details]"}.\n\nThank you so much for your support and collaboration. Wishing you all the best!\n\nWarm regards,\nVoice Ivory Team`
  };

  // Email Tone Selection Handler
  const handleToneChange = (selectedTone) => {
    setEmailTone(selectedTone);
    if (emailTranscript) {
      setEmailBody(toneEmails[selectedTone](emailSubject, emailRecipient, emailTranscript));
    }
  };

  // Email Recording Simulation
  const triggerEmailRecord = () => {
    setIsRecordingEmail(true);
    setEmailTranscript('');
    setEmailBody('');
    setIsSentEmail(false);

    const fullTranscriptText = "Hey team, we need to push the server deployment to Thursday morning to verify the QA checks and fix a minor database latency bug.";
    let currentIndex = 0;
    
    // Simulate speech-to-text typing out
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTranscriptText.length) {
        setEmailTranscript(prev => prev + fullTranscriptText.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsRecordingEmail(false);
        setIsGeneratingEmail(true);

        // Simulate AI Email generation speed
        setTimeout(() => {
          setIsGeneratingEmail(false);
          setEmailBody(toneEmails[emailTone](emailSubject, emailRecipient, fullTranscriptText));
        }, 1200);
      }
    }, 35);
  };

  // Email SMTP Send Simulation
  const handleSendEmail = () => {
    if (!emailBody) return;
    setIsSentEmail(true);
    setTimeout(() => {
      // Auto reset success screen after 3.5s
      setIsSentEmail(false);
      setEmailTranscript('');
      setEmailBody('');
    }, 3500);
  };

  // Summarizer: Processing Simulation
  const triggerSummarize = () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);
    setSummaryOutput('');
    if (isPlayingSummary) {
      window.speechSynthesis.cancel();
      setIsPlayingSummary(false);
    }

    setTimeout(() => {
      setIsSummarizing(false);
      setSummaryOutput(
        "Groq's LPU is a hardware architecture optimized to execute large language models at extreme speeds. It guarantees low, deterministic latency, enabling instantaneous voice assistant interactions."
      );
    }, 1500);
  };

  // Summarizer: TTS Web Speech API
  const toggleSpeechSummary = () => {
    if (isPlayingSummary) {
      window.speechSynthesis.cancel();
      setIsPlayingSummary(false);
      return;
    }

    const textToSpeak = summaryOutput || "Nothing to speak yet. Please generate a summary first.";
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlayingSummary(false);
      utterance.onerror = () => setIsPlayingSummary(false);
      
      setIsPlayingSummary(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  // Summarizer: Forward to Email Tab
  const forwardSummaryToEmail = () => {
    if (!summaryOutput) return;
    setEmailSubject("Groq LPU Technology Summary");
    setEmailTranscript(summaryOutput);
    setEmailBody(toneEmails.formal("Groq LPU Technology Summary", emailRecipient, summaryOutput));
    setActiveTab('email');
  };

  // To-Do: Voice Recording Simulation
  const triggerTodoRecord = (presetText) => {
    setIsRecordingTodo(true);
    
    // Support either a clicked preset or custom simulated recording
    const textToTranscribe = presetText || "remind me to inspect the office thermostat settings high priority tomorrow";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < textToTranscribe.length) {
        setTodoInput(prev => prev + textToTranscribe.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsRecordingTodo(false);

        // Add task with parsed priority
        setTimeout(() => {
          let priority = "🟢 Low";
          if (textToTranscribe.toLowerCase().includes("high") || textToTranscribe.toLowerCase().includes("urgent")) {
            priority = "🔴 High";
          } else if (textToTranscribe.toLowerCase().includes("medium") || textToTranscribe.toLowerCase().includes("office")) {
            priority = "🟡 Medium";
          }

          const parsedText = textToTranscribe
            .replace(/high priority|medium priority|low priority|remind me to/gi, "")
            .trim();

          const newTask = {
            id: Date.now(),
            text: parsedText.charAt(0).toUpperCase() + parsedText.slice(1),
            priority,
            timestamp: "Just now",
            done: false
          };

          setTodos(prev => [newTask, ...prev]);
          setTodoInput('');
        }, 600);
      }
    }, 30);
  };

  // Add standard typing Todo
  const handleAddTypedTodo = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    let priority = "🟢 Low";
    const textLower = todoInput.toLowerCase();
    if (textLower.includes("high") || textLower.includes("urgent") || textLower.includes("alert")) {
      priority = "🔴 High";
    } else if (textLower.includes("medium") || textLower.includes("important")) {
      priority = "🟡 Medium";
    }

    const newTask = {
      id: Date.now(),
      text: todoInput,
      priority,
      timestamp: "Just now",
      done: false
    };

    setTodos(prev => [newTask, ...prev]);
    setTodoInput('');
  };

  const toggleTodoDone = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Reset email fields
  const resetEmailSim = () => {
    setEmailTranscript('');
    setEmailBody('');
    setIsSentEmail(false);
  };

  // Custom keyframe styles injection
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes zFloat {
        0% {
          transform: translate(0, 0) scale(0.8) rotate(-10deg);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translate(30px, -90px) scale(1.35) rotate(15deg);
          opacity: 0;
        }
      }
      .animate-z-1 { animation: zFloat 2.8s infinite linear; }
      .animate-z-2 { animation: zFloat 2.8s infinite linear 0.9s; }
      .animate-z-3 { animation: zFloat 2.8s infinite linear 1.8s; }

      @keyframes textReveal {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(10px);
        }
        to {
          opacity: 0.05;
          transform: scale(1) translateY(0);
        }
      }
      .animate-text-reveal {
        animation: textReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      @keyframes pulseRing {
        0% { transform: scale(0.95); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.3; }
        100% { transform: scale(0.95); opacity: 0.5; }
      }
      .animate-pulse-ring {
        animation: pulseRing 2s infinite ease-in-out;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fff0f8] overflow-x-hidden selection:bg-violet-500 selection:text-white font-syne">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#fff0f8] z-10">
        <GrainOverlay />
        
        {/* Giant Ghost Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
          <h1 
            className="font-anton text-[#ff99dd] text-center tracking-tighter absolute leading-none"
            style={{ fontSize: 'clamp(100px, 28vw, 400px)', opacity: 0.2, letterSpacing: '-0.02em' }}
          >
            VOICE IVORY
          </h1>
        </div>

        {/* Top Navbar */}
        <nav className="absolute top-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-[60]">
          <span className="text-[#1a1a1a] text-xs font-semibold uppercase tracking-[0.18em] opacity-90">
            VOICE IVORY
          </span>
          <button 
            onClick={() => {
              setIsDemoOpen(true);
              setActiveTab('email');
            }}
            className="border-[1.5px] border-[#ff99dd] hover:border-[#ff99dd] bg-transparent text-[#1a1a1a] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#ff99dd] hover:text-white transition-all duration-200"
          >
            Get Started
          </button>
        </nav>

        {/* Center Character Layout */}
        <div className="relative flex-1 flex flex-col justify-center items-center">
          
          {/* Animated ZZZ above head */}
          <div className="absolute left-[54%] top-[34%] sm:top-[38%] md:top-[35%] flex pointer-events-none z-[12]">
            <span className="font-anton text-white text-4xl animate-z-1 absolute select-none">Z</span>
            <span className="font-anton text-white text-3xl animate-z-2 absolute select-none">Z</span>
            <span className="font-anton text-white text-2xl animate-z-3 absolute select-none">Z</span>
          </div>

                    {/* Sleeping SVG Character */}
          <div 
            className="absolute z-10 select-none pointer-events-none"
            style={{ 
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              height: 'clamp(220px, 45vh, 420px)', width: 'clamp(220px, 45vh, 420px)'
            }}
          >
            <SleepingSVG className="w-full h-full" />
          </div>
        </div>

        {/* Bottom Elements */}
        <div className="px-8 sm:px-16 pb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end w-full z-20 gap-6 sm:gap-0">
          <div>
            <h2 
              className="font-anton text-[#1a1a1a] leading-none tracking-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 64px)' }}
            >
              SPEAK. THINK. DO.
            </h2>
            <p className="text-sm text-[#555555] mt-2 font-medium tracking-wide">
              Your voice is the only interface you need.
            </p>
          </div>

          <div 
            className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
            onClick={() => document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="font-anton text-xl text-[#888888] uppercase tracking-wider">SCROLL DOWN</span>
            <ArrowRight className="w-5 h-5 text-[#888888]" />
          </div>
        </div>
      </section>

      {/* 3. FEATURES CAROUSEL SECTION */}
      <section 
        id="features-section"
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden z-30 transition-colors duration-700 ease-out"
        style={{ backgroundColor: FEATURES[activeIndex].bg }}
      >
        <GrainOverlay />

        {/* Giant Ghost Text activeFeature.label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden mix-blend-overlay">
          <h2 
            className="font-anton text-center tracking-tighter absolute whitespace-nowrap transition-all duration-700 ease-out"
            style={{ 
              fontSize: 'clamp(100px, 28vw, 380px)', 
              color: FEATURES[activeIndex].accent,
              opacity: 0.15,
              transform: `scale(${1 + activeIndex * 0.02}) translateY(-5%)`,
              letterSpacing: '-0.02em'
            }}
          >
            {FEATURES[activeIndex].label}
          </h2>
        </div>

        {/* Dummy spacer for top nav symmetry */}
        <div className="h-10"></div>

        {/* TOONHUB Character Carousel Area */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto h-full min-h-[350px]">
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-[10] overflow-hidden">
            {FEATURES.map((feat, index) => {
              const style = getRoleStyle(index);
              const isCenter = index === activeIndex;
              
              return (
                <div
                  key={feat.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isCenter ? 'pointer-events-auto cursor-default' : 'pointer-events-auto cursor-pointer hover:opacity-100'
                  }`}
                  style={{
                    ...style,
                    aspectRatio: '0.6 / 1',
                    transform: `${style.transform} ${isCenter ? '' : 'translateY(10px)'}`,
                    transitionProperty: 'transform, filter, opacity, left, bottom, height',
                  }}
                >
                  <img 
                    src={feat.id === 'email' ? '/email.png' : feat.id === 'summarize' ? '/summarizer.png' : '/todo.png'} 
                    alt={feat.label}
                    className="drop-shadow-2xl"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                      display: 'block',
                      background: 'transparent'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Elements: Feature Meta (Left) & TRY IT FREE (Right) */}
        <div className="px-8 sm:px-16 pb-12 grid grid-cols-1 md:grid-cols-2 justify-between items-end w-full z-30 gap-8 md:gap-0">
          
          {/* Bottom Left: Feature Description & Arrows */}
          <div key={fadeKey} className="max-w-md animate-fade-in">
            {/* Tag / Icon Label */}
            <div className="flex items-center gap-2 mb-2" style={{ color: FEATURES[activeIndex].textAccent || FEATURES[activeIndex].accent }}>
              {React.createElement(FEATURES[activeIndex].icon, { className: "w-[18px] h-[18px]" })}
              <span className="font-syne font-bold text-xs uppercase tracking-widest">
                {FEATURES[activeIndex].label}
              </span>
            </div>
            
            {/* Tagline */}
            <h3 className="font-anton text-[#1a1a1a] text-3xl md:text-4xl tracking-wide uppercase leading-tight mb-2">
              {FEATURES[activeIndex].tagline}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#1a1a1a] font-medium leading-[1.65] max-w-sm mb-6">
              {FEATURES[activeIndex].description}
            </p>

            {/* Carousel Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => handleNavigate('prev')}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent border-[2.5px] font-bold transition-all duration-300 hover:scale-108"
                style={{ 
                  borderColor: FEATURES[activeIndex].accent, 
                  color: FEATURES[activeIndex].accent,
                  backgroundColor: `${FEATURES[activeIndex].accent}04`
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${FEATURES[activeIndex].accent}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${FEATURES[activeIndex].accent}04`}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => handleNavigate('next')}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent border-[2.5px] font-bold transition-all duration-300 hover:scale-108"
                style={{ 
                  borderColor: FEATURES[activeIndex].accent, 
                  color: FEATURES[activeIndex].accent,
                  backgroundColor: `${FEATURES[activeIndex].accent}04`
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${FEATURES[activeIndex].accent}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${FEATURES[activeIndex].accent}04`}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
          
          {/* Bottom Right: VOICE IVORY Watermark */}
          <div className="flex justify-end items-end pointer-events-none pb-2">
            <span className="font-anton text-[#1a1a1a]/20 text-4xl md:text-5xl tracking-widest uppercase">
              VOICE IVORY
            </span>
          </div>

        </div>
      </section>

      {/* 3. FOOTER STRIP */}
      <footer className="relative w-full bg-[#1a1a1a] border-t border-[#ffffff]/10 flex flex-col md:flex-row justify-between items-center px-8 sm:px-16 py-8 gap-4 md:gap-0 z-40">
        <div>
          <span className="font-anton text-2xl text-white opacity-90 select-none">
            VOICE IVORY
          </span>
        </div>
        
        <div>
          <p className="font-syne text-xs font-semibold tracking-wide text-center" style={{ color: '#ffcc99' }}>
            Built with Groq AI · Web Speech API · Gmail SMTP
          </p>
        </div>

        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-white hover:text-[#ffcc99] transition-colors duration-200"
          >
            <GithubIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-white hover:text-[#ffcc99] transition-colors duration-200"
          >
            <TwitterIcon className="w-[18px] h-[18px]" />
          </a>
          <a 
            href="mailto:contact@voiceivory.com" 
            className="text-white hover:text-[#ffcc99] transition-colors duration-200"
          >
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
      </footer>

      {/* ==========================================
          5. INTERACTIVE LAB MODAL (PLAYGROUND)
         ========================================== */}
      {isDemoOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-md z-[70] p-4 animate-fade-in">
          
          <div className="relative bg-[#131326] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden glow-accent-purple">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/8 flex justify-between items-center">
              <div>
                <h3 className="font-anton text-white text-xl tracking-wider uppercase">
                  Voice Ivory Lab
                </h3>
                <p className="text-xs text-white/50 font-medium">
                  Try out the live features of our AI-powered stack.
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsDemoOpen(false);
                  if (isPlayingSummary) {
                    window.speechSynthesis.cancel();
                    setIsPlayingSummary(false);
                  }
                }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs Selector */}
            <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('email')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'email' 
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <Mail className="w-4 h-4" />
                Voice Email
              </button>
              <button
                onClick={() => setActiveTab('summarize')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'summarize' 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Summarizer
              </button>
              <button
                onClick={() => setActiveTab('todo')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'todo' 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Voice To-Do
              </button>
            </div>

            {/* Modal Body (Scrollable Content) */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* TAB 1: EMAIL PLAYGROUND */}
              {activeTab === 'email' && (
                <div className="space-y-5 animate-fade-in">
                  
                  {isSentEmail ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
                        <Check className="w-10 h-10 stroke-[3]" />
                      </div>
                      <h4 className="font-anton text-white text-2xl uppercase tracking-wider">
                        EMAIL SENT!
                      </h4>
                      <p className="text-sm text-white/60 max-w-sm">
                        The AI-generated body was successfully dispatched to <span className="text-white font-semibold">{emailRecipient}</span> via secure SMTP fallback.
                      </p>
                      <button
                        onClick={resetEmailSim}
                        className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Recipient & Subject Input Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Recipient Email</label>
                          <input 
                            type="email"
                            value={emailRecipient}
                            onChange={(e) => setEmailRecipient(e.target.value)}
                            placeholder="recipient@company.com"
                            className="w-full bg-white/5 border border-white/15 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Email Subject</label>
                          <input 
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            placeholder="Project Status Update"
                            className="w-full bg-white/5 border border-white/15 focus:border-violet-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Microphone Recorder Box */}
                      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-4">
                        
                        {isRecordingEmail ? (
                          <>
                            {/* Recording Waveform Animation */}
                            <div className="flex justify-center items-center gap-1.5 h-10 w-full">
                              <div className="w-[5px] h-6 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-[5px] h-10 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-[5px] h-7 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                              <div className="w-[5px] h-11 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              <div className="w-[5px] h-5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <p className="text-xs text-violet-400 font-bold uppercase tracking-wider animate-pulse">
                              Listening & Transcribing...
                            </p>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={triggerEmailRecord}
                              className="relative w-16 h-16 rounded-full bg-violet-500 hover:bg-violet-600 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 shadow-lg shadow-violet-500/20"
                            >
                              <Mic className="w-7 h-7" />
                              <div className="absolute inset-0 rounded-full border-2 border-violet-500 animate-pulse-ring pointer-events-none"></div>
                            </button>
                            <div>
                              <p className="text-sm text-white font-bold tracking-wide">
                                Tap to Speak Email Draft
                              </p>
                              <p className="text-xs text-white/50 mt-1 max-w-[280px] mx-auto">
                                We will simulate speech recognition input at ultra-high speed.
                              </p>
                            </div>
                          </>
                        )}

                        {/* Transcript Display */}
                        {emailTranscript && (
                          <div className="w-full bg-black/30 rounded-xl p-3 border border-white/5 text-left text-xs font-semibold text-white/80 font-mono">
                            <span className="text-violet-400">Voice transcript:</span> "{emailTranscript}"
                          </div>
                        )}
                      </div>

                      {/* Tone & AI Generation Output */}
                      {isGeneratingEmail ? (
                        <div className="py-8 flex flex-col items-center justify-center space-y-2">
                          <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-white/60 font-medium">Groq LPU compiling tones...</span>
                        </div>
                      ) : emailBody ? (
                        <div className="space-y-3 animate-fade-in">
                          {/* Tone Selectors */}
                          <div className="flex flex-col space-y-1">
                            <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Select AI Tone Expression</label>
                            <div className="flex gap-2 flex-wrap">
                              {['formal', 'casual', 'short', 'polite'].map((t) => (
                                <button
                                  key={t}
                                  onClick={() => handleToneChange(t)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                                    emailTone === t 
                                      ? 'bg-violet-500/20 border-violet-500 text-violet-400'
                                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Email Body Text Area */}
                          <div className="space-y-1">
                            <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider">AI Generated Email Body</label>
                            <textarea
                              value={emailBody}
                              onChange={(e) => setEmailBody(e.target.value)}
                              rows="6"
                              className="w-full bg-white/5 border border-white/15 focus:border-violet-400 rounded-2xl p-4 text-sm text-white font-medium outline-none transition-colors font-mono whitespace-pre-wrap leading-relaxed"
                            />
                          </div>

                          {/* Send Button */}
                          <button
                            onClick={handleSendEmail}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-violet-500/20 hover:scale-[1.01]"
                          >
                            <Send className="w-4.5 h-4.5" />
                            Send via Gmail SMTP
                          </button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}

              {/* TAB 2: SUMMARIZER PLAYGROUND */}
              {activeTab === 'summarize' && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Large text input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Original Long Text</label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows="6"
                      className="w-full bg-white/5 border border-white/15 focus:border-blue-400 rounded-2xl p-4 text-sm text-white font-medium outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={triggerSummarize}
                      disabled={isSummarizing || !inputText.trim()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
                    >
                      {isSummarizing ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing (320 tok/s)...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate AI Summary</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary output */}
                  {summaryOutput && (
                    <div className="bg-blue-950/20 border border-blue-900/35 rounded-2xl p-5 space-y-4 animate-fade-in">
                      <div>
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">
                          2-Sentence Summary Output
                        </span>
                        <p className="text-sm text-white font-medium leading-relaxed font-mono">
                          {summaryOutput}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/5">
                        {/* Play TTS button */}
                        <button
                          onClick={toggleSpeechSummary}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          {isPlayingSummary ? (
                            <>
                              <VolumeX className="w-4 h-4 text-blue-400" />
                              <span>Stop Speech Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
                              <span>Speak Summary Aloud</span>
                            </>
                          )}
                        </button>

                        {/* Forward email button */}
                        <button
                          onClick={forwardSummaryToEmail}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          <Mail className="w-4 h-4 text-blue-400" />
                          <span>Email This Summary</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TO-DO PLAYGROUND */}
              {activeTab === 'todo' && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Presets / Voice triggers */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block">
                      Choose a Simulated Spoken Task Command:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => triggerTodoRecord("add buy a new microphone sensor high priority")}
                        disabled={isRecordingTodo}
                        className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 rounded-xl text-left text-xs font-semibold text-white/80 transition-all flex justify-between items-center"
                      >
                        <span>"Add buy a new microphone sensor high priority"</span>
                        <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono">High 🔴</span>
                      </button>
                      <button
                        onClick={() => triggerTodoRecord("remind me to inspect the office thermostat settings tomorrow medium urgency")}
                        disabled={isRecordingTodo}
                        className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 rounded-xl text-left text-xs font-semibold text-white/80 transition-all flex justify-between items-center"
                      >
                        <span>"Inspect office thermostat settings medium urgency"</span>
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded font-mono">Medium 🟡</span>
                      </button>
                    </div>
                  </div>

                  {/* Manual Typing Form */}
                  <form onSubmit={handleAddTypedTodo} className="flex gap-2">
                    <input
                      type="text"
                      value={todoInput}
                      onChange={(e) => setTodoInput(e.target.value)}
                      placeholder={isRecordingTodo ? "Transcribing speech..." : "Type custom task (e.g. 'Wash the car low priority')"}
                      disabled={isRecordingTodo}
                      className="flex-1 bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isRecordingTodo || !todoInput.trim()}
                      className="px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </form>

                  {/* Speech status */}
                  {isRecordingTodo && (
                    <div className="flex items-center gap-3 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 animate-pulse">
                        Transcribing voice command...
                      </span>
                    </div>
                  )}

                  {/* Tasks List */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-white/55 font-bold uppercase tracking-wider block">
                      Active Task Database
                    </span>

                    {todos.length === 0 ? (
                      <p className="text-sm text-white/40 text-center py-6">No tasks added yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {todos.map((todo) => (
                          <div 
                            key={todo.id}
                            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                              todo.done 
                                ? 'bg-white/[0.01] border-white/5 opacity-50' 
                                : 'bg-white/[0.03] border-white/8 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input 
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodoDone(todo.id)}
                                className="w-4.5 h-4.5 rounded border-white/20 text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer"
                              />
                              <span className={`text-sm text-white font-medium ${todo.done ? 'line-through text-white/40' : ''}`}>
                                {todo.text}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-white/40 font-mono">
                                {todo.timestamp}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                todo.priority.includes("🔴")
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                  : todo.priority.includes("🟡")
                                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              }`}>
                                {todo.priority}
                              </span>
                              <button 
                                onClick={() => deleteTodo(todo.id)}
                                className="text-white/40 hover:text-white/80 p-0.5 rounded transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
