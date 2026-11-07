import SmartImage from '../ui/SmartImage';
import { PHOTO } from '../../lib/images';

const steps = [
  { n: '01', title: 'Consult', text: 'We listen first: your hair, your skin, your routine and the feeling you want to leave with.' },
  { n: '02', title: 'Craft', text: 'Each service is carried out with unhurried precision, adapted to you as we go.' },
  { n: '03', title: 'Finish', text: 'A final, careful refinement so the result is as easy to live in as it is beautiful.' },
];

/** The page eases from ivory to espresso here, with a large line of type drifting across. */
export default function Signature() {
  return (
    <section data-bg-shift className="section overflow-hidden">
      <div aria-hidden="true" className="mb-20 overflow-hidden md:mb-32">
        <p
          data-marquee="-32"
          className="display ml-[4vw] whitespace-nowrap text-[clamp(5rem,19vw,19rem)] leading-none opacity-90"
        >
          Beauty <em>·</em> Elegance <em>·</em> You <em>·</em> Beauty <em>·</em> Elegance <em>·</em> You
        </p>
      </div>

      <div className="wrap grid items-center gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div data-img-reveal>
            <SmartImage
              id={PHOTO.makeup}
              alt="Makeup artistry at Salon Elora"
              sizes="(min-width:768px) 40vw, 100vw"
              parallax
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p data-fade className="label mb-6 text-gold">
            The signature experience
          </p>
          <h2 data-split className="display display-md">
            A ritual, <em>not an appointment.</em>
          </h2>
          <ol data-fade-group className="mt-12 space-y-0">
            {steps.map((s) => (
              <li key={s.n} data-fade-item className="grid grid-cols-[3rem_1fr] gap-4 border-t border-current/20 py-7">
                <span className="label pt-2 text-gold">{s.n}</span>
                <div>
                  <h3 className="display display-sm">{s.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed opacity-75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
