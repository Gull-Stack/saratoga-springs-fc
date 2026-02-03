# Saratoga Springs Football Club — Website

Official website for **Saratoga Springs Football Club (SSFC)**, a premier youth soccer club in Saratoga Springs, Utah.

🌐 **Live:** [saratogaspringsfc.com](https://saratogaspringsfc.com)

---

## About the Club

- **Founded:** 2021
- **Location:** Saratoga Springs, UT 84045
- **Head Coach:** Nick Christensen
- **Programs:** Youth Academy (4-7), Competitive Teams (U8-U18), Recreation League, Summer Camps
- **Vision:** "To form a community of competitive soccer families together"

## Tech Stack

- **Vanilla HTML5, CSS3, JavaScript** — no frameworks or dependencies
- **Responsive** — mobile-first design
- **SEO optimized** — meta tags, Open Graph, schema.org SportsClub markup, sitemap.xml
- **Accessible** — ARIA labels, skip links, semantic HTML
- **Print styles** — schedule page is print-friendly

## Design

Inspired by Real Madrid's official website (realmadrid.com):

- Dark premium aesthetic (#0a0a0a, #1a1a2e)
- Gold accent (#FEBE10)
- Clean sans-serif typography (Inter + Montserrat)
- Full-width hero sections
- Card-based layouts
- Smooth scroll animations via IntersectionObserver

## Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero, programs, stats, news, events, coaches, testimonials, gallery, sponsors |
| About | `about.html` | Club history, mission, coaching philosophy, facilities |
| Programs | `programs.html` | Youth Academy, Competitive, Recreation, Summer Camps |
| Schedule | `schedule.html` | Match schedule, results, practice times |
| Registration | `registration.html` | How to register, fees, form, FAQ |
| Gallery | `gallery.html` | Filterable photo gallery |
| Contact | `contact.html` | Contact form, info, Google Maps embed |

## File Structure

```
saratoga-springs-fc/
├── index.html
├── about.html
├── programs.html
├── schedule.html
├── registration.html
├── gallery.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── logo.svg
├── sitemap.xml
├── robots.txt
└── README.md
```

## Features

- **Sticky header** with transparent → solid scroll effect
- **Animated stat counters** (IntersectionObserver)
- **Scroll-triggered fade animations**
- **Mobile hamburger menu** with overlay
- **Gallery filtering** (All, Matches, Training, Events)
- **FAQ accordion**
- **Form validation** (contact and registration pages)
- **Responsive grid system** via CSS Grid
- **CSS custom properties** for easy theming
- **Print stylesheet** for schedule page

## Deployment

Static site — deploy to any web host, CDN, or GitHub Pages:

```bash
# GitHub Pages
git push origin main
# Enable Pages in repo settings → Source: main branch
```

## Images

Currently using placeholder images from `placehold.co`. Replace with real club photography:

- `images/hero-bg.jpg` — Main hero background
- Replace `placehold.co` URLs with actual image paths

## License

© 2026 Saratoga Springs Football Club. All rights reserved.

---

Built by [Augment Advertise](https://augmentadvertise.com) | [Gull-Stack](https://github.com/Gull-Stack)
