import { loadConfig, validateProductionConfig } from './config.js';
import { createApp } from './server.js';

const cfg = loadConfig();
const errs = validateProductionConfig(cfg, process.env.NODE_ENV || 'development');
if (errs.length) {
  console.error('Configuration errors:');
  errs.forEach((e) => console.error('- ' + e));
  process.exit(1);
}
const app = createApp(cfg);
const port = cfg.port;
app.listen(port, () => {
  console.log(`Backend listening on ${port} (mode: ${cfg.deliveryMode})`);
});
