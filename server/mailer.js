import nodemailer from 'nodemailer';
import { escapeHtml } from './validate.js';

let transporter;

export function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Email is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS in server/.env');
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true', // true for 465, false for 587 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const wrap = (inner) => `<!doctype html><html><body style="margin:0;background:#F8F5EF;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#302820">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E9DDCB">
<tr><td style="padding:36px 36px 8px;text-align:center">
<div style="font-size:11px;letter-spacing:6px;color:#B7A58D">SALON</div>
<div style="font-size:26px;letter-spacing:9px;margin-top:4px">ELORA</div>
<div style="width:44px;height:1px;background:#C5A46D;margin:18px auto 0"></div>
</td></tr>
<tr><td style="padding:24px 36px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7">${inner}</td></tr>
</table></body></html>`;

export async function sendContactEmails(values) {
  const mail = getTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const to = process.env.CONTACT_TO;
  if (!to) throw new Error('CONTACT_TO is not set in server/.env');

  const { name, email, phone, subject, message } = values;
  const safe = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, escapeHtml(v)]));

  // 1. Enquiry to the salon. Reply-To lets staff answer the customer directly.
  await mail.sendMail({
    from: `"Salon Elora Website" <${from}>`,
    to,
    replyTo: `"${name.replace(/["\\]/g, '')}" <${email}>`,
    subject: `New enquiry: ${subject}`,
    text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}\n`,
    html: wrap(`<p style="margin:0 0 18px;font-size:12px;letter-spacing:3px;color:#B7A58D">NEW WEBSITE ENQUIRY</p>
<table role="presentation" width="100%" style="font-size:15px">
<tr><td style="padding:4px 0;color:#8a7a66;width:90px">Name</td><td>${safe.name}</td></tr>
<tr><td style="padding:4px 0;color:#8a7a66">Email</td><td><a href="mailto:${safe.email}" style="color:#302820">${safe.email}</a></td></tr>
<tr><td style="padding:4px 0;color:#8a7a66">Phone</td><td>${safe.phone}</td></tr>
<tr><td style="padding:4px 0;color:#8a7a66">Subject</td><td>${safe.subject}</td></tr>
</table>
<div style="height:1px;background:#E9DDCB;margin:20px 0"></div>
<p style="white-space:pre-wrap;margin:0">${safe.message}</p>`),
  });

  // 2. Confirmation to the customer. A failure here must not hide that the enquiry itself was delivered.
  try {
    await mail.sendMail({
      from: `"Salon Elora" <${from}>`,
      to: email,
      subject: 'Thank you for contacting Salon Elora',
      text: `Dear ${name},\n\nThank you for getting in touch. We have received your message and will reply personally as soon as we can.\n\nYour message:\n"${subject}"\n\nWith warm regards,\nSalon Elora\nBeauty. Elegance. You.\n`,
      html: wrap(`<p style="margin:0 0 16px;font-size:20px;font-family:Georgia,serif">Dear ${safe.name},</p>
<p style="margin:0 0 16px">Thank you for getting in touch. We have received your message and will reply personally as soon as we can.</p>
<p style="margin:0 0 6px;font-size:12px;letter-spacing:3px;color:#B7A58D">YOUR ENQUIRY</p>
<p style="margin:0 0 22px;font-style:italic">${safe.subject}</p>
<p style="margin:0">With warm regards,<br><span style="font-family:Georgia,serif;letter-spacing:3px">SALON ELORA</span><br><span style="color:#B7A58D;font-size:13px">Beauty. Elegance. You.</span></p>`),
    });
  } catch (err) {
    console.error('Confirmation email failed (enquiry was delivered):', err.message);
  }
}
