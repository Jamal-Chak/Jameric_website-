import nodemailer from 'nodemailer';
import type { EnquiryInput } from './validation.js';
import type { Config } from './config.js';

export interface DeliveryResult {
  mode: 'preview' | 'smtp';
  accepted: boolean;
  previewContent?: string;
}

export interface DeliveryAdapter {
  send(enquiry: EnquiryInput, cfg: Config): Promise<DeliveryResult>;
}

export const previewAdapter: DeliveryAdapter = {
  async send(enquiry, _cfg) {
    const content = `To: (configured recipient)\nReply-To: ${enquiry.email}\nSubject: Enquiry: ${enquiry.service}\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone || '-'}\nService: ${enquiry.service}\nModel: ${enquiry.model || '-'}\nMessage: ${enquiry.message}`;
    return { mode: 'preview', accepted: true, previewContent: content };
  },
};

export const smtpAdapter: DeliveryAdapter = {
  async send(enquiry, cfg) {
    if (!cfg.smtp) throw new Error('SMTP not configured');
    const transporter = nodemailer.createTransport({
      host: cfg.smtp.host,
      port: cfg.smtp.port,
      secure: cfg.smtp.secure,
      auth: { user: cfg.smtp.user, pass: cfg.smtp.pass },
      connectionTimeout: 10000,
    });
    await transporter.sendMail({
      from: cfg.sender,
      to: cfg.recipient,
      replyTo: enquiry.email,
      subject: `Enquiry: ${enquiry.service}`,
      text: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone || '-'}\nService: ${enquiry.service}\nModel: ${enquiry.model || '-'}\nMessage: ${enquiry.message}`,
    });
    return { mode: 'smtp', accepted: true };
  },
};
