'use client';

import { MediaImage } from '@/components/portfolio/media-image';
import { useState } from 'react';

type BeyondCodeMoment = {
  image: string;
  alt: string;
  title: string;
  narrative: string;
  label: string;
};

const moments: BeyondCodeMoment[] = [
  {
    image: '/images/beyond_code/with_my_wife.jpg',
    alt: 'Felix and his wife standing together on a viewpoint above a tropical landscape',
    title: 'The life around the work',
    narrative: 'The work is meaningful, but it is only one part of life. Time with my wife and the people I love gives everything else its shape—and makes the difficult days feel worthwhile.',
    label: '01 / together',
  },
  {
    image: '/images/beyond_code/wife_sunset.jpg',
    alt: 'A person seen from behind looking over layered hills beneath a golden sunset',
    title: 'Shared quiet',
    narrative: 'Some memories are defined by who was there and how little needed to be said. A sunset may be ordinary, but sharing the stillness makes it worth remembering.',
    label: '02 / stillness',
  },
  {
    image: '/images/beyond_code/bingo.jpg',
    alt: 'A small black-and-tan puppy lying on a tiled floor while a hand reaches in to play',
    title: 'Bingo, interrupting the day',
    narrative: 'Some parts of life refuse to be scheduled. Bingo is a reminder that attention is not only something to manage—it is also something to give freely when a curious puppy asks for it.',
    label: '03 / companionship',
  },
  {
    image: '/images/beyond_code/coffee.jpg',
    alt: 'A cup of latte art on a red saucer beside a planted aquarium',
    title: 'A slower kind of focus',
    narrative: 'Coffee, water, and a few quiet minutes create a welcome counterweight to technical work. The ritual is simple: settle in, notice what is in front of me, and let the next idea arrive without forcing it.',
    label: '04 / ritual',
  },
  {
    image: '/images/beyond_code/coffee_sea.jpg',
    alt: 'A cup and plate of food on a table beside a window overlooking calm water',
    title: 'Room to look outward',
    narrative: 'A good view changes the pace of a day. Near the water, the horizon gives small problems a larger frame and creates the kind of perspective that is difficult to find at a desk.',
    label: '05 / perspective',
  },
  {
    image: '/images/beyond_code/mountain_flower.jpg',
    alt: 'Orange and yellow flowers in the foreground of a green mountain landscape',
    title: 'The details in the landscape',
    narrative: 'The smallest details can hold the whole mood of a place. Flowers in the foreground, a distant ridge, and changing weather invite me to pay attention before moving on.',
    label: '06 / attention',
  },
  {
    image: '/images/beyond_code/in_the_woods.jpg',
    alt: 'Felix standing on a narrow bamboo bridge among trees and water',
    title: 'Taking the longer way through',
    narrative: 'Being outdoors makes progress feel physical again: a path, a bridge, a little uncertainty, and a destination that does not need to be rushed. It is a welcome change from measuring everything in tasks.',
    label: '07 / outdoors',
  },
  {
    image: '/images/beyond_code/our_car.jpg',
    alt: 'A white car parked on a road with a green mountain rising behind it',
    title: 'The freedom to go somewhere',
    narrative: 'A car is practical, but it also represents possibility: a free afternoon, an unfamiliar road, and the freedom to turn a nearby place into a small adventure together.',
    label: '08 / movement',
  },
  {
    image: '/images/beyond_code/roro_sunset.jpg',
    alt: 'A ferry ramp and parked cars silhouetted against a bright orange sunset over the sea',
    title: 'Between one shore and the next',
    narrative: 'Transitions are their own kind of place. On a ferry at sunset, there is nowhere to optimize for a while—only the crossing, the light, and the anticipation of arriving somewhere new.',
    label: '09 / transition',
  },
];

export function BeyondCodeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = moments[activeIndex];

  const showMoment = (index: number) => {
    setActiveIndex((index + moments.length) % moments.length);
  };

  const railIndexes = [-3, -2, -1, 0, 1, 2, 3, 4].map((offset) => (activeIndex + offset + moments.length) % moments.length);

  return (
    <div
      className="beyond-code-carousel"
      aria-label="Beyond the code photo journal"
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') showMoment(activeIndex + 1);
        if (event.key === 'ArrowLeft') showMoment(activeIndex - 1);
      }}
    >
      <nav className="beyond-code-carousel__rail" aria-label="Choose a visual journal entry">
        {railIndexes.map((index) => (
          <button
            type="button"
            className={`beyond-code-carousel__rail-photo ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => showMoment(index)}
            aria-label={`Show ${moments[index].title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            aria-controls="beyond-code-active-image"
            key={`${moments[index].image}-${index}`}
          >
            <MediaImage src={moments[index].image} alt="" fill loading="lazy" sizes="(max-width: 48rem) 4rem, 7rem" />
          </button>
        ))}
      </nav>

      <div className="beyond-code-carousel__main">
        <div id="beyond-code-active-image" className="beyond-code-carousel__stage" role="group" aria-label={`Active photo: ${activeMoment.title}`}>
          <div className="beyond-code-carousel__image-wrap">
            <MediaImage
              key={activeMoment.image}
              src={activeMoment.image}
              alt={activeMoment.alt}
              fill
              sizes="(max-width: 48rem) 100vw, 28rem"
              className="beyond-code-carousel__image"
              priority={activeIndex === 0}
            />
          </div>
          <div className="beyond-code-carousel__counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(moments.length).padStart(2, '0')}
          </div>
          <div className="beyond-code-carousel__controls beyond-code-carousel__controls--mobile" aria-label="Photo navigation">
            <button type="button" onClick={() => showMoment(activeIndex - 1)} aria-label="Previous photo">
              <span aria-hidden="true">‹</span>
            </button>
            <button type="button" onClick={() => showMoment(activeIndex + 1)} aria-label="Next photo">
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="beyond-code-carousel__copy" aria-live="polite">
          <div className="beyond-code-carousel__copy-body">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">{activeMoment.label}</p>
            <h3>{activeMoment.title}</h3>
            <p>{activeMoment.narrative}</p>
          </div>
          <div className="beyond-code-carousel__controls beyond-code-carousel__controls--desktop">
            <button type="button" onClick={() => showMoment(activeIndex - 1)} aria-label="Previous photo">← <span>Previous</span></button>
            <button type="button" onClick={() => showMoment(activeIndex + 1)} aria-label="Next photo"><span>Next</span> →</button>
          </div>
        </div>
      </div>

    </div>
  );
}
