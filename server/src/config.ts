export type DeliveryMode = 'preview' | 'smtp';

export interface Config {
  port: number;
  allowedOrigin: string;
  deliveryMode: DeliveryMode;
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  sender: string;
  recipient: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const deliveryMode = (env.DELIVERY_MODE || 'preview') as DeliveryMode;
  const port = Number(env.PORT || 3001);
  const allowedOrigin = env.ALLOWED_ORIGIN || 'http://localhost:5173';
  const sender = env.SENDER_EMAIL || '';
  const recipient = env.RECEIVING_EMAIL || '';
  const cfg: Config = { port, allowedOrigin, deliveryMode, sender, recipient };
  if (deliveryMode === 'smtp') {
    cfg.smtp = {
      host: env.SMTP_HOST || '',
      port: Number(env.SMTP_PORT || 587),
      secure: env.SMTP_SECURE === 'true',
      user: env.SMTP_USER || '',
      pass: env.SMTP_PASS || '',
    };
  }
  return cfg;
}

export function validateProductionConfig(cfg: Config, nodeEnv: string) {
  const errors: string[] = [];
  if (nodeEnv === 'production') {
    if (cfg.deliveryMode !== 'smtp') errors.push('DELIVERY_MODE must be smtp in production');
    if (!cfg.sender) errors.push('SENDER_EMAIL is required');
    if (!cfg.recipient) errors.push('RECEIVING_EMAIL is required');
    if (cfg.deliveryMode === 'smtp') {
      if (!cfg.smtp?.host) errors.push('SMTP_HOST is required');
      if (!cfg.smtp?.user) errors.push('SMTP_USER is required');
      if (!cfg.smtp?.pass) errors.push('SMTP_PASS is required');
    }
  }
  return errors;
}
