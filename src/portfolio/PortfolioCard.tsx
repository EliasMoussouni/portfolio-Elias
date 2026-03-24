import React from 'react';
import { PortfolioItem } from './portfolioData';

interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onOpen }) => {
  return (
    <article
      className="netflix-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(item);
        }
      }}
      aria-label={`Ouvrir la fiche ${item.title}`}
    >
      {item.image ? (
        <img src={item.image} alt={item.title} loading="lazy" className="netflix-card-image" />
      ) : (
        <div className="netflix-card-placeholder" aria-hidden="true">
          <span>{item.title}</span>
        </div>
      )}
      <div className="netflix-card-gradient" />
      <div className="netflix-card-center-title">
        <h3>{item.title}</h3>
      </div>
      <div className="netflix-card-content">
        {item.subtitle ? <p className="card-subtitle">{item.subtitle}</p> : null}
        {item.period ? <p className="card-period">{item.period}</p> : null}
        <p className="card-summary">{item.summary}</p>
        {item.tags?.length ? (
          <div className="card-tags" aria-label="Tags">
            {item.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default PortfolioCard;
