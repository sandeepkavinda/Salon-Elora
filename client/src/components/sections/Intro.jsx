import SmartImage from '../ui/SmartImage';
import { TextLink } from '../ui/Button';
import { PHOTO } from '../../lib/images';

export default function Intro() {
  return (
    <section className="section overflow-hidden">
      <div className="wrap grid items-start gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:pt-28">
          <p data-fade className="label mb-8 text-gold">
            Welcome to Salon Elora
          </p>
          <h2 data-split className="display display-md">
            Beauty is personal. <em>So is every visit.</em>
          </h2>
          <p data-fade className="lead mt-9 max-w-md">
            Salon Elora is a luxury hair and beauty salon in Sri Lanka. We bring together considered styling, skincare and
            makeup in a calm, welcoming space, with one aim: that you leave feeling entirely like yourself, only more so.
          </p>
          <div data-fade className="mt-10">
            <TextLink to="/about">Our story</TextLink>
          </div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div data-img-reveal className="group">
            <SmartImage
              id={PHOTO.facial}
              alt="A calm skincare treatment in progress"
              sizes="(min-width:768px) 48vw, 100vw"
              parallax
              className="aspect-[4/5] w-full rounded-t-[999px]"
            />
          </div>
          <div data-img-reveal className="absolute -bottom-10 -left-4 hidden w-[44%] md:block lg:-left-24">
            <div className="border-[10px] border-ivory">
              <SmartImage
                id={PHOTO.interiorA}
                alt="Salon interior"
                sizes="22vw"
                parallax="0.05"
                className="aspect-square w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap mt-28 md:mt-44">
        <p data-words-scrub className="display display-md max-w-[22ch] md:max-w-[26ch]">
          Luxury is not excess. It is attention: to detail, to the person in the chair, and to how you feel when you leave.
        </p>
      </div>
    </section>
  );
}
