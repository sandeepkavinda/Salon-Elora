# Salon Elora

Luxury hair & beauty salon website. React + Vite + Tailwind CSS v4, GSAP (ScrollTrigger, SplitText), Framer Motion, Lenis, and an Express + Nodemailer backend for the contact form. No booking, accounts or admin panel.

## Run locally

```bash
# 1. Backend (terminal 1)
cd server
cp .env.example .env      # fill in SMTP details and CONTACT_TO
npm install
npm run dev               # http://localhost:5174

# 2. Frontend (terminal 2)
cd client
npm install
npm run dev               # http://localhost:5173  (proxies /api to :5174)
```

## Production

```bash
cd client && npm run build          # outputs client/dist
cd ../server && npm start           # serves the API and the built site on one port
```

Set `CLIENT_ORIGIN` to the public site URL, and `TRUST_PROXY=1` when behind a proxy or load balancer. If the frontend is hosted separately, set `VITE_API_URL` at build time.

## Replace before launch

| What | Where |
| --- | --- |
| Phone, email, WhatsApp, address, map query, hours, social links | `client/src/lib/siteConfig.js` |
| Service names, descriptions and prices (`X,XXX` placeholders) | `client/src/lib/content.js` |
| Testimonials (placeholders, **not real reviews**) | `client/src/lib/content.js` |
| Team names, roles, portraits | `client/src/lib/content.js`, `client/src/pages/About.jsx` |
| Photography (Unsplash IDs) | `client/src/lib/images.js` |
| Brand copy on Home and About | Review for accuracy; it is draft copy |
| Email recipient / sender | `server/.env` (`CONTACT_TO`, `MAIL_FROM`) |

## Contact form protection

Server-side validation and sanitisation (control characters stripped, preventing header injection), honeypot field, minimum fill time, JSON body limit, per-IP rate limits (5/min and 10/hour), Helmet security headers with a CSP, CORS restricted to `CLIENT_ORIGIN`, and credentials only in `server/.env`. A failed customer confirmation email never hides a delivered enquiry.

## Animation system

`src/lib/motion.js` holds the shared easing and timing. `src/hooks/usePageAnimations.js` drives all scroll choreography from data attributes (`data-split`, `data-fade`, `data-fade-group`, `data-img-reveal`, `data-parallax`, `data-line`, `data-words-scrub`, `data-marquee`, `data-bg-shift`). Everything is skipped under `prefers-reduced-motion` and reverted on route change.
