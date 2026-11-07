import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { validateContact } from './validate.js';
import { sendContactEmails } from './mailer.js';

const app = express();
const PORT = Number(process.env.PORT) || 5174;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.set('trust proxy', Number(process.env.TRUST_PROXY) || 0);

app.use(
  helmet({
    // The built SPA loads Google Fonts, Unsplash images and a Google Maps iframe.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
        frameSrc: ['https://www.google.com'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim());
app.use(cors({ origin: allowed, methods: ['POST'], maxAge: 600 }));
app.use(express.json({ limit: '16kb' }));

// Rate limits: a short burst limit and a stricter hourly limit per IP.
const burst = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many requests. Please wait a minute and try again.' },
});
const hourly = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'You have reached the hourly limit. Please contact us by phone or WhatsApp.' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', burst, hourly, async (req, res) => {
  const body = req.body || {};

  // Spam protection: honeypot filled, or form submitted impossibly fast. Pretend success so bots learn nothing.
  const tooFast = typeof body.elapsed === 'number' && body.elapsed < 2500;
  if ((typeof body.website === 'string' && body.website.trim() !== '') || tooFast) {
    return res.json({ ok: true });
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, message: 'Please check the highlighted fields.', errors });
  }

  try {
    await sendContactEmails(values);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact email error:', err.message);
    return res
      .status(502)
      .json({ ok: false, message: 'We could not send your message just now. Please try again shortly, or contact us by phone or WhatsApp.' });
  }
});

// Production: serve the built client and fall back to index.html for client-side routes.
const dist = path.resolve(__dirname, '../client/dist');
if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// Malformed JSON and anything unexpected
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, message: 'Invalid request.' });
  if (err.type === 'entity.too.large') return res.status(413).json({ ok: false, message: 'Request too large.' });
  console.error(err);
  return res.status(500).json({ ok: false, message: 'Something went wrong.' });
});

app.listen(PORT, () => console.log(`Salon Elora server listening on :${PORT}`));
