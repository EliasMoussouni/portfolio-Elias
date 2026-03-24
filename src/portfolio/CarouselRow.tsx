import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioSection, PortfolioItem } from './portfolioData';
import PortfolioCard from './PortfolioCard';

interface CarouselRowProps {
  section: PortfolioSection;
  onOpen: (item: PortfolioItem) => void;
}

const CarouselRow: React.FC<CarouselRowProps> = ({ section, onOpen }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!trackRef.current) {
      return;
    }
    const amount = direction === 'left' ? -560 : 560;
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="carousel-section" aria-labelledby={`${section.id}-title`}>
      <div className="carousel-header">
        <div>
          <h2
            id={`${section.id}-title`}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/section/${section.id}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(`/section/${section.id}`);
              }
            }}
            aria-label={`Ouvrir la section ${section.title}`}
          >
            {section.title}
          </h2>
          <p>{section.description}</p>
        </div>
        <button
          type="button"
          className="see-all-button"
          onClick={() => navigate(`/section/${section.id}`)}
          aria-label={`Voir tous les elements de ${section.title}`}
        >
          Voir tout
        </button>
        <div className="carousel-controls" aria-hidden="false">
          <button type="button" onClick={() => scrollByAmount('left')} aria-label={`Defiler ${section.title} vers la gauche`}>
            {'<'}
          </button>
          <button type="button" onClick={() => scrollByAmount('right')} aria-label={`Defiler ${section.title} vers la droite`}>
            {'>'}
          </button>
        </div>
      </div>
      <div
        className="carousel-track"
        ref={trackRef}
        tabIndex={0}
        aria-label={`Carrousel ${section.title}`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollByAmount('left');
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollByAmount('right');
          }
        }}
      >
        {section.items.map((item) => (
          <PortfolioCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
};

export default CarouselRow;
