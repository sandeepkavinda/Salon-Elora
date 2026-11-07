import { whyItems } from '../../lib/content';

export default function Why() {
  return (
    <section className="section bg-espresso text-ivory">
      <div className="wrap grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p data-fade className="label mb-6 text-gold">
              Why Salon Elora
            </p>
            <h2 data-split className="display display-lg">
              The <em>details</em> are the difference.
            </h2>
          </div>
        </div>

        <ul data-fade-group className="md:col-span-6 md:col-start-7">
          {whyItems.map((item, i) => (
            <li key={item.title} data-fade-item className="border-t border-ivory/20 py-9 first:border-t-0 first:pt-0 md:py-12 md:first:pt-3">
              <div className="flex items-baseline gap-6">
                <span className="label text-gold">0{i + 1}</span>
                <div>
                  <h3 className="display display-sm">{item.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ivory/70">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
