import Page from '../components/layout/Page';
import PageHeader from '../components/sections/PageHeader';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import { team } from '../lib/content';
import { PHOTO } from '../lib/images';

const pillars = [
  {
    n: '01',
    title: 'Our philosophy',
    text: 'Beauty should feel effortless and entirely yours. We design every look around the person wearing it, never around a trend, so the result feels natural the moment you leave.',
  },
  {
    n: '02',
    title: 'Beauty & wellness',
    text: 'Time in the salon is also time to pause. We treat hair, skin and the experience itself as one, so you leave looking well and feeling restored.',
  },
  {
    n: '03',
    title: 'What we hold ourselves to',
    text: 'Honest advice. Clear pricing before we begin. Careful listening. A welcoming space for everyone who walks in.',
  },
];

export default function About() {
  return (
    <Page
      title="About"
      image={PHOTO.interiorA}
      description="The story, philosophy and approach behind Salon Elora, a luxury hair and beauty salon in Sri Lanka."
    >
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Beauty, <em>personally</em> made.
          </>
        }
        intro="Salon Elora is a luxury hair and beauty salon in Sri Lanka, created for people who value quiet confidence, considered craft and a space that lets them exhale."
      />

      <section className="pb-24 md:pb-40">
        <div data-img-reveal className="wrap">
          <SmartImage
            id={PHOTO.interiorB}
            alt="The Salon Elora interior"
            sizes="100vw"
            parallax
            className="aspect-[4/3] w-full md:aspect-[21/9]"
          />
        </div>
      </section>

      <section className="pb-24 md:pb-44">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <p data-fade className="label text-gold md:col-span-3">
            The story
          </p>
          <div className="md:col-span-8">
            <p data-words-scrub className="display display-md">
              We started with a simple belief: that a salon should make you feel seen. Not rushed, not templated, but
              understood, and then beautifully looked after.
            </p>
            <p data-fade className="lead mt-12 max-w-2xl">
              Every detail, from the way we greet you to the way we finish your hair, is shaped by that idea. Our work blends
              technical precision with an eye for what suits you, and our space is designed to be calm, warm and unhurried.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-espresso py-24 text-ivory md:py-40">
        <div className="wrap">
          <ul data-fade-group>
            {pillars.map((p) => (
              <li key={p.n} data-fade-item className="grid gap-6 border-t border-ivory/20 py-12 md:grid-cols-12 md:gap-8 md:py-16">
                <span className="label text-gold md:col-span-1">{p.n}</span>
                <h2 className="display display-md md:col-span-5">{p.title}</h2>
                <p className="max-w-md leading-relaxed text-ivory/70 md:col-span-5 md:col-start-8">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p data-fade className="label mb-6 text-gold">
              The environment
            </p>
            <h2 data-split className="display display-lg">
              A space to <em>slow down.</em>
            </h2>
            <p data-fade className="lead mt-8 max-w-md">
              Soft light, natural textures and a warm palette. The salon is designed to feel more like a private retreat than a
              place of appointments.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4 md:col-span-6 md:col-start-7">
            <div data-img-reveal className="col-span-3">
              <SmartImage id={PHOTO.interiorC} alt="Salon seating" sizes="30vw" parallax className="aspect-[3/4] w-full" />
            </div>
            <div data-img-reveal className="col-span-2 mt-16">
              <SmartImage id={PHOTO.interiorD} alt="Salon detail" sizes="20vw" parallax className="aspect-[2/3] w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-champagne/40">
        <div className="wrap">
          <div className="mb-14 md:mb-20">
            <p data-fade className="label mb-6 text-gold">
              The team
            </p>
            <h2 data-split className="display display-lg">
              The hands <em>behind the work.</em>
            </h2>
          </div>

          <ul data-fade-group className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {team.map((m, i) => (
              <li key={i} data-fade-item>
                {/* [PLACEHOLDER] replace with real portrait, name and role */}
                <div className="flex aspect-[3/4] items-center justify-center rounded-t-[999px] bg-gradient-to-b from-champagne to-taupe/50">
                  <span className="font-serif text-6xl italic text-espresso/30">E</span>
                </div>
                <h3 className="display display-sm mt-5">{m.name}</h3>
                <p className="label mt-1 !text-[0.65rem] text-espresso/60">{m.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-espresso/55">Team details will be added shortly.</p>
        </div>
      </section>

      <section className="section text-center">
        <div className="wrap">
          <h2 data-split className="display display-md mx-auto max-w-[16ch]">
            Come and <em>meet us.</em>
          </h2>
          <div data-fade className="mt-10">
            <Button to="/contact">Get in touch</Button>
          </div>
        </div>
      </section>
    </Page>
  );
}
