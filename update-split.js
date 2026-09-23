const fs = require('fs');

const newHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project Details — Lakshmi Anoop</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=9" />
</head>

<body class="project-details-page single-page-layout">

  <main class="pd-split-container">
    <!-- Left: Image Cover -->
    <div class="pd-left-pane">
      <a href="index.html#projects" class="pd-back-btn pd-absolute-back">← Back</a>
      <img id="pd-image" src="" alt="Project Image" class="pd-main-image" onerror="this.style.display='none'">
      <div id="pd-image-fallback" class="img-fallback pd-main-fallback" style="display:none;">?</div>
    </div>

    <!-- Right: Content -->
    <div class="pd-right-pane">
      <div class="pd-content-inner">
        <div class="pd-tags" id="pd-tags"></div>
        
        <h1 class="pd-title" id="pd-title">Project Title</h1>
        <p class="pd-subtitle" id="pd-subtitle">Project short description goes here.</p>
        
        <div class="pd-desc-block">
          <h3>Overview</h3>
          <p id="pd-desc">Detailed information will appear here.</p>
        </div>

        <div class="pd-tech">
          <h3>Technologies</h3>
          <div class="pd-tech-list" id="pd-tech-list"></div>
        </div>

        <div class="pd-links-bottom">
          <a href="#" id="pd-live" class="cta-btn" target="_blank" rel="noopener noreferrer">
            <span>View Live Site</span>
            <span>↗</span>
          </a>
          <a href="#" id="pd-github" class="cta-btn btn-outline" target="_blank" rel="noopener noreferrer">
            <span>GitHub Repo</span>
            <span>⌥</span>
          </a>
        </div>
      </div>
    </div>
  </main>

  <script>
    // Theme setup
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Project Data
    const projects = {
      'resq': {
        title: 'ResQ – AI Command Center',
        subtitle: 'AI-powered real-time campus crisis management system.',
        desc: 'Built using React, Vite, Firebase, Node.js, and Gemini 1.5 Flash. It integrates AI-based incident triage, automated report generation, and Firebase real-time services for instant alerts and synchronization across campus authorities.',
        image: 'image-project/resq.jpeg',
        fallback: 'R',
        tags: ['React', 'Firebase', 'Node.js', 'Gemini 1.5 flash'],
        live: '#',
        github: '#'
      },
      'voice': {
        title: 'Voice-First Task Assistant',
        subtitle: 'React + FastAPI app with Groq LLM integration.',
        desc: 'A powerful voice-controlled assistant built under a one-hour time constraint. Features voice-controlled emails, clipboard summaries, and to-do management using the fast Groq API.',
        image: 'image-project/voice-ivory.jpeg',
        fallback: 'V',
        tags: ['React', 'FastAPI', 'Groq API', 'Gmail SMTP'],
        live: '#',
        github: '#'
      },
      'pylon': {
        title: 'Pylon - Scholarship Hub',
        subtitle: 'A student platform to discover and apply for scholarships.',
        desc: 'Students can fill in their comprehensive profile and get intelligently matched with relevant scholarship opportunities, streamlining the financial aid discovery process.',
        image: 'image-project/pylon.jpeg',
        fallback: 'P',
        tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
        live: '#',
        github: '#'
      },
      'codeburry': {
        title: 'CodeBurry',
        subtitle: 'Gamified Learning Platform',
        desc: 'Built an interactive learning platform that turns skill development into a game-like experience. It uses a growth-based progress system to keep learners continually motivated and engaged.',
        image: 'image-project/code-burry.jpeg',
        fallback: 'C',
        tags: ['React', 'TypeScript', 'TailwindCSS'],
        live: '#',
        github: '#'
      },
      'silentguard': {
        title: 'SilentGuard',
        subtitle: 'AI Failure Detection System',
        desc: 'Designed an intelligent system that meticulously monitors behavioral patterns to predict and prevent system failures before they happen. Focused on anomaly detection.',
        image: 'image-project/Silent-quard.png',
        fallback: 'S',
        tags: ['Python', 'Streamlite', 'Numpy'],
        live: '#',
        github: '#'
      }
    };

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const project = projects[id];

    if (project) {
      document.getElementById('pd-title').textContent = project.title;
      document.getElementById('pd-subtitle').textContent = project.subtitle;
      document.getElementById('pd-desc').textContent = project.desc;
      
      const img = document.getElementById('pd-image');
      img.src = project.image;
      img.onerror = () => {
        img.style.display = 'none';
        const fallback = document.getElementById('pd-image-fallback');
        fallback.textContent = project.fallback;
        fallback.style.display = 'flex';
      };

      document.getElementById('pd-live').href = project.live;
      document.getElementById('pd-github').href = project.github;

      const tagsContainer = document.getElementById('pd-tags');
      const techContainer = document.getElementById('pd-tech-list');
      
      project.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'pd-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);

        const techSpan = document.createElement('span');
        techSpan.className = 'pd-tech-item';
        techSpan.textContent = tag;
        techContainer.appendChild(techSpan);
      });
    } else {
      document.getElementById('pd-title').textContent = 'Project Not Found';
      document.getElementById('pd-subtitle').textContent = 'Please return to the portfolio.';
    }
  </script>
</body>
</html>`;

fs.writeFileSync('project-details.html', newHtml);

let css = fs.readFileSync('style.css', 'utf8');
const newCss = `
/* Single Page Project Details Layout */
.single-page-layout {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scrolling entirely */
  height: 100vh;
  width: 100vw;
  background: var(--bg);
}

.pd-split-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.pd-left-pane {
  flex: 1;
  position: relative;
  background: var(--bg-card);
  height: 100%;
}

.pd-absolute-back {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  margin: 0;
}
.pd-absolute-back:hover {
  background: rgba(0,0,0,0.8);
  color: var(--accent);
}

.pd-left-pane .pd-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pd-left-pane .pd-main-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 150px;
  color: var(--accent);
}

.pd-right-pane {
  flex: 1;
  max-width: 650px;
  height: 100%;
  overflow-y: auto; /* allow inner scrolling only if strictly necessary, but goal is fit */
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg);
  border-left: 1px solid var(--border);
}

.pd-content-inner {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.pd-content-inner .pd-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  margin-bottom: 0;
  line-height: 1.1;
  font-family: var(--font-display);
  font-weight: 800;
}

.pd-content-inner .pd-subtitle {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--accent);
  font-family: var(--font-body);
}

.pd-desc-block h3, .pd-tech h3 {
  font-family: var(--font-body);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.pd-desc-block p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.pd-links-bottom {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.pd-links-bottom .cta-btn {
  flex: 1;
}

@media (max-width: 900px) {
  .pd-split-container {
    flex-direction: column;
    overflow-y: auto;
  }
  .single-page-layout {
    overflow-y: auto;
  }
  .pd-left-pane {
    height: 40vh;
    flex: none;
  }
  .pd-right-pane {
    height: auto;
    max-width: 100%;
    padding: 30px;
    border-left: none;
    border-top: 1px solid var(--border);
  }
  .pd-links-bottom {
    flex-direction: column;
  }
}
`;

if (!css.includes('.single-page-layout')) {
  fs.appendFileSync('style.css', newCss);
  console.log('Split screen layout applied');
} else {
  // If we already added it, let's replace the old project-details CSS block.
  // Actually the previous script just appended .project-details-page
  fs.appendFileSync('style.css', newCss);
  console.log('Split screen layout applied');
}
