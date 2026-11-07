/**
 * SALON ELORA – editable business information.
 *
 * Everything marked [PLACEHOLDER] must be replaced with real details before launch.
 * Nothing here is a real phone number, address, price or staff member.
 */
export const site = {
  name: 'Salon Elora',
  tagline: 'Beauty. Elegance. You.',

  contact: {
    // [PLACEHOLDER] replace all contact details
    phone: '+94 00 000 0000',
    phoneHref: '+94000000000',
    email: 'hello@your-domain.example',
    whatsappNumber: '94000000000', // digits only, with country code
    addressLines: ['[Salon street address]', '[City], Sri Lanka'],
    mapQuery: 'Colombo, Sri Lanka', // [PLACEHOLDER] replace with the salon address or Google Maps place name
  },

  // [PLACEHOLDER] opening hours
  hours: [
    ['Monday – Friday', '00:00 – 00:00'],
    ['Saturday', '00:00 – 00:00'],
    ['Sunday', '00:00 – 00:00'],
  ],

  // [PLACEHOLDER] social profile URLs and handle
  social: {
    handle: '@your.handle',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export const whatsappLink = (text = 'Hello Salon Elora') =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
