import React, { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { PortfolioSection } from '../portfolio/portfolioData';

interface TopPicksRowProps {
  sections: PortfolioSection[];
  title?: string;
  sectionOrder?: string[];
  ariaLabel?: string;
  customPicks?: Array<{
    id: string;
    title: string;
    coverImage: string;
    route: string;
  }>;
}

const DEFAULT_SECTION_ORDER = [
  'experience',
  'projects',
  'hackathon',
  'skills',
  'formation',
  'reference',
  'contact'
];

const TopPicksRow: React.FC<TopPicksRowProps> = ({
  sections,
  title = "Today's Top Picks for Elias",
  sectionOrder = DEFAULT_SECTION_ORDER,
  ariaLabel = 'Sections du CV Netflix',
  customPicks
}) => {
  const navigate = useNavigate();
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!rowRef.current) {
      return;
    }
    const amount = direction === 'left' ? -420 : 420;
    rowRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const topPicks = useMemo(() => {
    if (customPicks?.length) {
      return customPicks;
    }

    return sectionOrder
      .map((id) => sections.find((section) => section.id === id))
      .filter((section): section is PortfolioSection => Boolean(section))
      .map((section) => ({
        id: section.id,
        title: section.title,
        coverImage: section.coverImage || '/hackathon/1765896140097.jpg',
        route: `/section/${section.id}`
      }));
  }, [customPicks, sectionOrder, sections]);

  return (
    <div className="top-picks-row">
      <h2 className="row-title">{title}</h2>
      <div className="card-row-wrap">
        <button
          type="button"
          className="row-arrow row-arrow-left"
          aria-label="Defiler vers la gauche"
          onClick={() => scrollByAmount('left')}
        >
          &#8249;
        </button>
        <div className="card-row" role="list" aria-label={ariaLabel} ref={rowRef}>
        {topPicks.map((pick, index) => (
          <div
            key={pick.id}
            className="pick-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(pick.route)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(pick.route);
              }
            }}
            style={{ animationDelay: `${index * 0.2}s` }}
            aria-label={`Ouvrir la section ${pick.title}`}
          >
            <img
              src={pick.coverImage}
              alt={pick.title}
              className="pick-image"
              loading="lazy"
            />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </div>
        ))}
        </div>
        <button
          type="button"
          className="row-arrow row-arrow-right"
          aria-label="Defiler vers la droite"
          onClick={() => scrollByAmount('right')}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default TopPicksRow;
