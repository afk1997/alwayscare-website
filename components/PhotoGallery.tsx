import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

const row1Items: MediaItem[] = [
  { src: '/images/photo/up-1.jpg', type: 'image' },
  { src: '/images/photo/up-2.jpg', type: 'image' },
  { src: '/images/photo/up-3.mp4', type: 'video' },
  { src: '/images/photo/up-4.jpg', type: 'image' },
  { src: '/images/photo/up-5.jpg', type: 'image' },
];

const row2Items: MediaItem[] = [
  { src: '/images/photo/down-1.jpg', type: 'image' },
  { src: '/images/photo/down-2.jpg', type: 'image' },
  { src: '/images/photo/down-3.mp4', type: 'video' },
  { src: '/images/photo/down-4.jpg', type: 'image' },
  { src: '/images/photo/down-5.jpg', type: 'image' },
];

const MediaElement: React.FC<{ item: MediaItem; alt: string }> = ({ item, alt }) => {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[180px] md:h-[220px] lg:h-[240px] object-cover"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={alt}
      loading="lazy"
      className="w-full h-[180px] md:h-[220px] lg:h-[240px] object-cover hover:scale-105 transition-transform duration-500"
    />
  );
};

const MarqueeRow: React.FC<{ items: MediaItem[]; direction: 'left' | 'right' }> = ({ items, direction }) => (
  <div className="overflow-hidden group">
    <div
      className={`flex w-max ${
        direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
      } group-hover:[animation-play-state:paused]`}
    >
      {/* Set 1 */}
      <div className="flex gap-4 shrink-0 pr-4">
        {items.map((item, i) => (
          <div
            key={`a-${i}`}
            className="shrink-0 w-[260px] md:w-[320px] lg:w-[360px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <MediaElement item={item} alt="Always Care field work" />
          </div>
        ))}
      </div>
      {/* Set 2 (duplicate for seamless loop) */}
      <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
        {items.map((item, i) => (
          <div
            key={`b-${i}`}
            className="shrink-0 w-[260px] md:w-[320px] lg:w-[360px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <MediaElement item={item} alt="" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PhotoGallery: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] overflow-hidden" ref={ref}>
      <MarqueeRow items={row1Items} direction="left" />

      {/* S E V A divider */}
      <div
        className={`scroll-reveal ${isVisible ? 'visible' : ''} py-8 md:py-12 text-center`}
        style={{ animationDelay: '200ms' }}
      >
        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[0.3em] md:tracking-[0.5em] text-slate-200/80 select-none leading-none">
          SEVA
        </h2>
      </div>

      <MarqueeRow items={row2Items} direction="right" />
    </section>
  );
};

export default PhotoGallery;
