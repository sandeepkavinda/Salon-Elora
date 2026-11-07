/**
 * Server-side validation and sanitisation for the contact form.
 * Returns { values, errors }. `values` are trimmed, control-character-free strings.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d][\d\s()+-]{6,19}$/;

// Strip control characters (including CR/LF, which enable header injection) from single-line fields.
const singleLine = (s) => String(s ?? '').replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim();
// Multi-line: keep \n, drop other control characters.
const multiLine = (s) =>
  String(s ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();

export function validateContact(body = {}) {
  const values = {
    name: singleLine(body.name),
    email: singleLine(body.email).toLowerCase(),
    phone: singleLine(body.phone),
    subject: singleLine(body.subject),
    message: multiLine(body.message),
  };
  const errors = {};

  if (values.name.length < 2 || values.name.length > 80) errors.name = 'Please enter your full name.';
  if (!EMAIL.test(values.email) || values.email.length > 120) errors.email = 'Please enter a valid email address.';
  if (!PHONE.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (values.subject.length < 3 || values.subject.length > 120) errors.subject = 'Please add a short subject.';
  if (values.message.length < 10 || values.message.length > 2000)
    errors.message = 'Please write a message of at least 10 characters.';

  return { values, errors };
}

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
