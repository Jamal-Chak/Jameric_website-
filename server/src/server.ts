import express from 'express';
import cors from 'cors';
import { loadConfig } from './config.js';
import { validateEnquiry, ALLOWED_SERVICES } from './validation.js';
import { previewAdapter, smtpAdapter } from './delivery.js';

export function createApp(cfg = loadConfig(), adapterOverride?: any) {
  const app = express();
  app.use(express.json({ limit: '16kb' }));
  app.use(cors({ origin: cfg.allowedOrigin, methods: ['POST', 'OPTIONS'] }));

  const rateMap = new Map<string, number[]>();
  const WINDOW = 60_000;
  const MAX = 5;

  function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const arr = (rateMap.get(ip) || []).filter((t) => now - t < WINDOW);
    if (arr.length >= MAX) {
      return res.status(429).json({ ok: false, error: 'Too many requests' });
    }
    arr.push(now);
    rateMap.set(ip, arr);
    next();
  }

  app.post('/api/enquiries', rateLimit, async (req, res) => {
    const v = validateEnquiry(req.body, ALLOWED_SERVICES);
    if (!v.ok) {
      return res.status(400).json({ ok: false, errors: v.errors });
    }
    const adapter = adapterOverride || (cfg.deliveryMode === 'preview' ? previewAdapter : smtpAdapter);
    try {
      const result = await adapter.send(v.data, cfg);
      if (cfg.deliveryMode === 'preview') {
        return res.json({ ok: true, mode: 'preview', message: 'Preview only — no email was sent.', preview: result.previewContent });
      }
      return res.json({ ok: true, mode: 'smtp', message: 'Your enquiry has been submitted. Please call if you need to follow up.' });
    } catch {
      console.error('Delivery failed');
      return res.status(502).json({ ok: false, error: 'Delivery failed' });
    }
  });

  app.get('/api/health', (_req, res) => res.json({ ok: true, mode: cfg.deliveryMode }));

  return app;
}
