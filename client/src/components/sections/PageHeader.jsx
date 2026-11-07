/** Shared opener for inner pages so every page begins with the same rhythm. */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <header className="wrap pb-16 pt-40 md:pb-24 md:pt-56">
      <p data-fade className="label mb-8 text-gold">
        {eyebrow}
      </p>
      <h1 data-split className="display display-xl max-w-[14ch]">
        {title}
      </h1>
      {intro && (
        <p data-fade="0.15" className="lead mt-10 max-w-xl">
          {intro}
        </p>
      )}
      {children}
      <div data-line className="gold-line mt-16 md:mt-24" />
    </header>
  );
}
