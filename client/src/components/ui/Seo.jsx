import { PHOTO, unsplash } from '../../lib/images';

/** React 19 hoists <title> and <meta> rendered anywhere into <head>. */
export default function Seo({ title, description, image = PHOTO.hero }) {
  const fullTitle = title ? `${title} | Salon Elora` : 'Salon Elora | Luxury Hair & Beauty Salon, Sri Lanka';
  const ogImage = `${unsplash(image, 1200)}&h=630`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
    </>
  );
}
