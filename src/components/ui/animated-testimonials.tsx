import React, { useEffect, useMemo, useState } from 'react';
import { IconArrowLeft, IconArrowRight, IconDownload } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import './animated-testimonials.css';

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  downloadUrl?: string;
  downloadLabel?: string;
};

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = false,
  className
}) => {
  const [active, setActive] = useState(0);

  const hasTestimonials = testimonials.length > 0;

  useEffect(() => {
    if (!autoplay || !hasTestimonials) {
      return;
    }
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5600);
    return () => window.clearInterval(interval);
  }, [autoplay, hasTestimonials, testimonials.length]);

  const cards = useMemo(() => testimonials, [testimonials]);

  if (!hasTestimonials) {
    return (
      <section className={`animated-testimonials ${className ?? ''}`.trim()}>
        <p className="animated-testimonials-empty">info non disponible</p>
      </section>
    );
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <section className={`animated-testimonials ${className ?? ''}`.trim()}>
      <div className="animated-testimonials-grid">
        <div className="animated-testimonials-media-col">
          <div className="animated-testimonials-media-stack">
            <AnimatePresence>
              {cards.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    rotate: randomRotateY(),
                    y: 30
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.55,
                    scale: isActive(index) ? 1 : 0.95,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 20 : cards.length - index,
                    y: isActive(index) ? [0, -10, 0] : 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: 24
                  }}
                  transition={{ duration: 0.34, ease: 'easeInOut' }}
                  className="animated-testimonials-media-card"
                >
                  <img src={testimonial.src} alt={testimonial.name} loading="lazy" draggable={false} />
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="animated-testimonials-content-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${cards[active].name}-${active}`}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="animated-testimonials-text-block"
            >
              <h3>{cards[active].name}</h3>
              <p className="animated-testimonials-designation">{cards[active].designation}</p>

              <motion.p className="animated-testimonials-quote">
                {cards[active].quote.split(' ').map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ filter: 'blur(7px)', opacity: 0, y: 4 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut', delay: 0.012 * index }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {cards[active].downloadUrl ? (
                <a
                  href={cards[active].downloadUrl}
                  download
                  className="animated-testimonials-download"
                  aria-label={`Telecharger ${cards[active].downloadLabel || cards[active].name}`}
                >
                  <IconDownload size={18} aria-hidden="true" />
                  {cards[active].downloadLabel || 'Telecharger la lettre'}
                </a>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="animated-testimonials-nav">
            <button type="button" onClick={handlePrev} aria-label="Temoignage precedent">
              <IconArrowLeft size={18} />
            </button>
            <button type="button" onClick={handleNext} aria-label="Temoignage suivant">
              <IconArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
