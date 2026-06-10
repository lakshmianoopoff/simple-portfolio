const fs = require('fs');
let html = fs.readFileSync('contact.html', 'utf8');

// 1. Ambient gradient
html = html.replace(/<div class="background-silhouette">/, '<div class="ambient-gradient"></div>\n    <div class="background-silhouette">');

// 3. Availability badge
html = html.replace(/<div class="profile-name">Lakshmi Anoop<\/div>/, '<div class="profile-name">Lakshmi Anoop</div>\n      <div class="availability-badge"><span class="pulse-dot"></span> Available for freelance work</div>');

// 5. Glow divider
html = html.replace(/<\/div>\s*<div class="category-label">/, '</div>\n      <hr class="glow-divider" />\n      <div class="category-label">');

// Now inject CSS rules
const newCss = `
    .ambient-gradient {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at 50% 30%, rgba(127, 255, 178, 0.05), transparent 60%);
      animation: ambientPulse 8s infinite alternate ease-in-out;
      z-index: 1;
      pointer-events: none;
    }
    [data-theme="light"] .ambient-gradient {
      background: radial-gradient(circle at 50% 30%, rgba(26, 122, 60, 0.05), transparent 60%);
    }
    @keyframes ambientPulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.1); opacity: 1; }
    }

    .profile-avatar-wrap::before {
      content: '';
      position: absolute;
      top: -3px; left: -3px; right: -3px; bottom: -3px;
      border-radius: 50%;
      background: conic-gradient(var(--accent), #1abc9c, var(--accent));
      animation: spinBorder 4s linear infinite;
      z-index: -1;
    }
    @keyframes spinBorder {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .profile-avatar {
      border: 3px solid var(--bio-bg) !important;
      padding: 0 !important;
    }

    .availability-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--accent);
      background: rgba(127, 255, 178, 0.1);
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 8px;
      opacity: 0;
      transform: translateY(15px);
      animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      animation-delay: 0.15s;
      border: 1px solid rgba(127, 255, 178, 0.2);
    }
    [data-theme="light"] .availability-badge {
      background: rgba(26, 122, 60, 0.1);
      border-color: rgba(26, 122, 60, 0.2);
    }

    .pill-btn {
      position: relative;
      overflow: hidden;
    }
    .pill-btn::after {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
      animation: shimmerLoop 3s infinite;
    }
    @keyframes shimmerLoop {
      0% { left: -100%; }
      40% { left: 200%; }
      100% { left: 200%; }
    }
    [data-theme="light"] .pill-btn::after {
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent);
    }

    .glow-divider {
      width: 100%;
      height: 1px;
      border: none;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      margin: 0 0 32px 0;
      opacity: 0.5;
    }
`;

html = html.replace('/* CATEGORY LABEL */', newCss + '\n    /* CATEGORY LABEL */');

fs.writeFileSync('contact.html', html);
console.log('Contact HTML updated.');
