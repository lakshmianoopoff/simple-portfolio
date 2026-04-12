# 🌿 Lakshmi Anoop — Personal Portfolio Website

A clean, fully responsive personal portfolio and resume website built with vanilla **HTML**, **CSS**, and **JavaScript** — no frameworks, no dependencies.

---

## 📁 File Structure

```
portfolio/
├── index.html       → Page structure and all sections
├── style.css        → All styles, themes, and animations
├── script.js        → JavaScript logic (form, admin)
├── photo.jpg        → Your profile photo 
└── README.md        → This file
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌗 Dark / Light Theme | Toggle in navbar, saved to `localStorage` |
| 📸 Animated Profile Photo | Spinning gradient ring, float animation, hover shimmer |
| 📬 Contact Form | Validates inputs and saves responses as JSON to `localStorage` |
| 🔐 Admin Login | CSS + JS show/hide panel — credentials: `admin` / `admin123` |
| 📥 Admin Inbox | Displays all contact submissions with timestamps |
| 📊 Scroll Progress Bar | Thin accent bar at the top tracks scroll position |
| 🔗 Active Nav Links | Highlights current section in navbar while scrolling |
| 📱 Fully Responsive | Adapts gracefully to mobile, tablet, and desktop |

---

## 🚀 Getting Started

### Run Locally

1. Download or clone the project folder
2. Open the folder in **VS Code**
3. Install the **Live Server** extension (by Ritwick Dey)
4. Right-click `index.html` → **Open with Live Server**
5. The site opens at `http://127.0.0.1:5500`

> No build steps, no installs, no terminal commands needed.

---

## 🔐 Admin Panel

| Field | Value |
|---|---|
| Username | `portfolio` |
| Password | `lacha@123` |

- Navigate to the **Admin** section at the bottom of the page
- Log in to view all contact form submissions
- Each response shows name, email, subject, message, and timestamp
- Use **Clear All** to wipe stored responses
- Data is stored in **Chrome LocalStorage** — it persists across page refreshes but is browser-specific

> To change credentials, open `script.js` and update the `ADMIN_USER` and `ADMIN_PASS` values at the top of the Admin Login section.

---

## 🎨 Customisation Quick Reference

| What to change | Where |
|---|---|
| Your name, bio, about text | `index.html` — Hero & About sections |
| Projects | `index.html` — Projects section |
| Skills | `index.html` — Skills section |
| Experience / Timeline | `index.html` — Experience section |
| Accent color (green) | `style.css` → `--accent` in `:root` |
| Admin credentials | `script.js` → `ADMIN_USER` / `ADMIN_PASS` |


---

## 🌐 Sections

1. **Home** — Hero with animated photo, name, role, and CTA buttons
2. **About** — Bio text and quick-facts card grid
3. **Skills** — Technology skill cards with tags
4. **Projects** — Project cards with descriptions and links
5. **Experience** — Timeline of academic and professional milestones
6. **Contact** — Form that saves responses to localStorage
7. **Admin** — Login-protected inbox for viewing contact submissions

---

## 🛠 Built With

- **HTML5** — Semantic structure with ARIA roles
- **CSS3** — Custom properties, Grid, Flexbox, keyframe animations
- **Vanilla JavaScript** — DOM manipulation, localStorage, IntersectionObserver

---

## 📄 License

This project is personal and not licensed for redistribution.  
Feel free to use it as a reference or template for your own portfolio.

---
