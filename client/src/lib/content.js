import { PHOTO } from './images';

/** Price placeholder. Replace with real starting prices (numbers only, e.g. '4,500'). */
const P = 'X,XXX';

export const serviceCategories = [
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    featured: true,
    image: PHOTO.styling,
    blurb:
      'From a polished blow-dry to a sculpted occasion style, finished by hand and shaped around you.',
    items: [
      { name: 'Signature Blow-Dry', desc: 'A smooth, voluminous finish with lasting movement.', price: P },
      { name: 'Occasion Styling', desc: 'Curls, waves and updos designed for the event.', price: P },
      { name: 'Braids & Updos', desc: 'Considered, structured styles for any length.', price: P },
    ],
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments',
    featured: true,
    image: PHOTO.treatments,
    blurb: 'Restorative rituals that bring back softness, strength and shine.',
    items: [
      { name: 'Deep Conditioning Ritual', desc: 'Intensive nourishment for dry or tired hair.', price: P },
      { name: 'Scalp Therapy', desc: 'A calming cleanse and massage for a balanced scalp.', price: P },
      { name: 'Smoothing Treatment', desc: 'Refined texture and manageability.', price: P },
    ],
  },
  {
    id: 'hair-colouring',
    name: 'Hair Colouring',
    featured: true,
    image: PHOTO.colouring,
    blurb: 'Colour with depth and dimension, chosen with your tone and lifestyle in mind.',
    items: [
      { name: 'Full Colour', desc: 'Rich, even colour from root to tip.', price: P },
      { name: 'Highlights & Balayage', desc: 'Soft, sun-lit dimension, hand painted.', price: P },
      { name: 'Toning & Gloss', desc: 'A finishing layer of shine and tonal balance.', price: P },
    ],
  },
  {
    id: 'haircuts',
    name: 'Haircuts',
    featured: false,
    image: PHOTO.haircuts,
    blurb: 'Precise cutting that holds its shape and grows out gracefully.',
    items: [
      { name: 'Cut & Style', desc: 'Consultation, cut and finish.', price: P },
      { name: "Men's Cut", desc: 'Clean, tailored and carefully finished.', price: P },
      { name: 'Fringe & Trim', desc: 'A quick refresh between full cuts.', price: P },
    ],
  },
  {
    id: 'facial-skincare',
    name: 'Facial & Skincare',
    featured: true,
    image: PHOTO.facial,
    blurb: 'Calm, personalised treatments for a clear and rested complexion.',
    items: [
      { name: 'Signature Facial', desc: 'Cleansing, massage and a tailored mask.', price: P },
      { name: 'Hydration Facial', desc: 'Replenishing care for dull or dry skin.', price: P },
      { name: 'Skin Consultation', desc: 'An honest look at your skin and a simple plan.', price: P },
    ],
  },
  {
    id: 'makeup',
    name: 'Makeup',
    featured: true,
    image: PHOTO.makeup,
    blurb: 'Refined makeup artistry that enhances rather than hides.',
    items: [
      { name: 'Day & Evening Makeup', desc: 'Polished looks for any occasion.', price: P },
      { name: 'Party Makeup', desc: 'Defined, long-wearing and camera ready.', price: P },
      { name: 'Makeup Lesson', desc: 'Learn the techniques that suit your face.', price: P },
    ],
  },
  {
    id: 'bridal-beauty',
    name: 'Bridal Beauty',
    featured: false,
    image: PHOTO.bridal,
    blurb: 'Hair, makeup and calm, planned together for your most photographed day.',
    items: [
      { name: 'Bridal Makeup', desc: 'Timeless, personal and made to last.', price: P },
      { name: 'Bridal Hair', desc: 'Styling to complement the gown and the venue.', price: P },
      { name: 'Bridal Package & Trial', desc: 'A full preview before the day itself.', price: P },
    ],
  },
  {
    id: 'nail-care',
    name: 'Nail Care',
    featured: false,
    image: PHOTO.nails,
    blurb: 'Meticulous manicures and pedicures with a clean, elegant finish.',
    items: [
      { name: 'Classic Manicure', desc: 'Shaping, cuticle care and polish.', price: P },
      { name: 'Classic Pedicure', desc: 'A soothing soak, care and polish.', price: P },
      { name: 'Gel Finish', desc: 'A durable, glossy colour.', price: P },
    ],
  },
];

/** Gallery. `cats` can include several categories; `ratio` controls masonry rhythm. */
export const galleryCategories = ['All', 'Hair', 'Beauty', 'Bridal', 'Transformations', 'Salon Interior'];

export const galleryItems = [
  { id: 'g1', src: PHOTO.hero, cats: ['Hair'], ratio: 'aspect-[3/4]', alt: 'Long, softly waved hair styled at Salon Elora' },
  { id: 'g2', src: PHOTO.interiorA, cats: ['Salon Interior'], ratio: 'aspect-[4/3]', alt: 'Salon interior with styling stations' },
  { id: 'g3', src: PHOTO.beautyB, cats: ['Beauty'], ratio: 'aspect-[4/5]', alt: 'Makeup artistry in progress' },
  { id: 'g4', src: PHOTO.bridal, cats: ['Bridal'], ratio: 'aspect-[3/4]', alt: 'Bridal beauty portrait' },
  { id: 'g5', src: PHOTO.colouring, cats: ['Hair', 'Transformations'], ratio: 'aspect-[4/5]', alt: 'Dimensional hair colour' },
  { id: 'g6', src: PHOTO.facial, cats: ['Beauty'], ratio: 'aspect-square', alt: 'Facial and skincare treatment' },
  { id: 'g7', src: PHOTO.interiorC, cats: ['Salon Interior'], ratio: 'aspect-[3/4]', alt: 'Calm salon environment' },
  { id: 'g8', src: PHOTO.styling, cats: ['Hair'], ratio: 'aspect-[4/5]', alt: 'Professional hair styling' },
  { id: 'g9', src: PHOTO.bridalB, cats: ['Bridal'], ratio: 'aspect-[4/5]', alt: 'Bridal hair and makeup' },
  { id: 'g10', src: PHOTO.treatments, cats: ['Hair', 'Transformations'], ratio: 'aspect-[3/4]', alt: 'Healthy, glossy hair after treatment' },
  { id: 'g11', src: PHOTO.makeup, cats: ['Beauty'], ratio: 'aspect-[4/3]', alt: 'Makeup brushes and palettes' },
  { id: 'g12', src: PHOTO.interiorB, cats: ['Salon Interior'], ratio: 'aspect-[4/5]', alt: 'Salon detail' },
  { id: 'g13', src: PHOTO.haircuts, cats: ['Hair', 'Transformations'], ratio: 'aspect-[3/4]', alt: 'Precision haircut' },
  { id: 'g14', src: PHOTO.nails, cats: ['Beauty'], ratio: 'aspect-square', alt: 'Manicured nails' },
  { id: 'g15', src: PHOTO.bridalC, cats: ['Bridal'], ratio: 'aspect-[3/4]', alt: 'Bridal styling detail' },
  { id: 'g16', src: PHOTO.productA, cats: ['Beauty'], ratio: 'aspect-[4/5]', alt: 'Beauty products' },
  { id: 'g17', src: PHOTO.interiorD, cats: ['Salon Interior'], ratio: 'aspect-[4/3]', alt: 'Salon reception and seating' },
  { id: 'g18', src: PHOTO.colouring, cats: ['Transformations'], ratio: 'aspect-[4/5]', alt: 'Colour transformation' },
];

export const whyItems = [
  {
    title: 'Consultation first',
    text: 'Every visit begins with a conversation about your hair, skin, routine and what you want to feel.',
  },
  {
    title: 'Tailored to you',
    text: 'Nothing is applied by formula. Each look is shaped around your features and your lifestyle.',
  },
  {
    title: 'A considered space',
    text: 'A calm, welcoming environment designed to let you slow down for a while.',
  },
  {
    title: 'Finished with care',
    text: 'Small details are checked before you leave, so the result looks as good at home as it does in the chair.',
  },
];

/**
 * [PLACEHOLDER] Testimonials. These are NOT real reviews.
 * Replace each entry with a genuine client review (with permission) before launch.
 */
export const testimonials = [
  {
    quote: '[Placeholder] A genuine client review will appear here once collected.',
    name: 'Client name',
    detail: 'Service received',
  },
  {
    quote: '[Placeholder] Add a short, real quote about the experience at Salon Elora.',
    name: 'Client name',
    detail: 'Service received',
  },
  {
    quote: '[Placeholder] Replace this with real feedback, shared with the client’s permission.',
    name: 'Client name',
    detail: 'Service received',
  },
];

export const instagramTiles = [
  PHOTO.styling,
  PHOTO.beautyA,
  PHOTO.interiorA,
  PHOTO.bridalB,
  PHOTO.colouring,
  PHOTO.productB,
];

/** [PLACEHOLDER] Team. Replace with real names, roles and portraits. */
export const team = [
  { name: 'Team member name', role: 'Creative Director' },
  { name: 'Team member name', role: 'Senior Stylist' },
  { name: 'Team member name', role: 'Makeup Artist' },
  { name: 'Team member name', role: 'Skin Specialist' },
];
