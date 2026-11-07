/**
 * Central image manifest. Every photograph on the site is referenced from here,
 * so swapping in the salon's own photography is a one-file change.
 *
 * Values are Unsplash photo IDs (free licence). Replace with your own assets when available.
 * <SmartImage> falls back to a tonal placeholder if any image fails to load.
 */
export const PHOTO = {
  hero: 'photo-1522337360788-8b13dee7a37e',

  styling: 'photo-1562322140-8baeececf3df',
  treatments: 'photo-1527799820374-dcf8d9d4a388',
  colouring: 'photo-1492106087820-71f1a00d2b11',
  haircuts: 'photo-1521590832167-7bcbfaa6381f',
  facial: 'photo-1570172619644-dfd03ed5d881',
  makeup: 'photo-1487412947147-5cebf100ffc2',
  bridal: 'photo-1519741497674-611481863552',
  nails: 'photo-1604654894610-df63bc536371',

  interiorA: 'photo-1560066984-138dadb4c035',
  interiorB: 'photo-1633681926022-84c23e8cb2d6',
  interiorC: 'photo-1595476108010-b4d1f102b1b1',
  interiorD: 'photo-1560869713-7d0a29430803',

  productA: 'photo-1556228720-195a672e8a03',
  productB: 'photo-1596462502278-27bfdc403348',
  beautyA: 'photo-1522335789203-aabd1fc54bc9',
  beautyB: 'photo-1516975080664-ed2fc6a32937',
  skincareB: 'photo-1512290923902-8a9f81dc236c',
  nailsB: 'photo-1519014816548-bf5fe059798b',
  bridalB: 'photo-1583939003579-730e3918a45a',
  bridalC: 'photo-1519415510236-718bdfcd89c8',
};

export const unsplash = (id, width, quality = 72) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

export const srcSet = (id, widths) =>
  widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', ');
