import React, { useMemo } from 'react';
import { CalendarDays, Github, MapPin, Trophy } from 'lucide-react';
import { Timeline } from '../components/ui/timeline';
import { PortfolioItem } from './portfolioData';
import './hackathonShowcase.css';

interface HackathonShowcaseProps {
  items: PortfolioItem[];
  onBack: () => void;
}

type HackathonCard = {
  id: string;
  timelineTitle: string;
  displayTitle: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
  images: string[];
  meta: string;
  githubUrl?: string;
};

const cardMeta: Record<string, Pick<HackathonCard, 'timelineTitle' | 'displayTitle' | 'location' | 'meta' | 'githubUrl'>> = {
  'hack-fork': {
    timelineTitle: 'Hack The Fork',
    displayTitle: 'ReaKt',
    location: 'Paris, France',
    meta: '2e place',
    githubUrl: 'https://github.com/Gab404/ReaKt'
  },
  'hack-europe': {
    timelineTitle: 'HackEurope',
    displayTitle: 'EveryOne',
    location: 'Stockholm, Sweden',
    meta: 'Local LLM + RAG',
    githubUrl: 'https://github.com/paulChevalier78/everyone'
  }
};

const fallbackImages = [
  '/hackathon/1765896140097.jpg',
  '/hackathon/1765961375533.jpg',
  '/hackathon/1771853886168.jpg',
  '/hackathon/demo.jpeg',
  '/hackathon/IMG_0366.jpeg',
  '/hackathon/IMG_0422.jpeg'
];

const imageShadow =
  'shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.08)_inset]';

const HackathonShowcase: React.FC<HackathonShowcaseProps> = ({ items, onBack }) => {
  const cards = useMemo<HackathonCard[]>(() => {
    return items.map((item, index) => {
      const meta = cardMeta[item.id] || {
        timelineTitle: item.title,
        displayTitle: item.title,
        location: 'Location unavailable',
        meta: 'Hackathon'
      };

      const images = item.gallery?.length
        ? item.gallery
        : [item.image || fallbackImages[index % fallbackImages.length]];

      return {
        id: item.id,
        timelineTitle: meta.timelineTitle,
        displayTitle: meta.displayTitle,
        period: item.period || 'Date unavailable',
        location: meta.location,
        summary: item.summary,
        bullets: item.bullets || [],
        tags: item.tags || [],
        images,
        meta: meta.meta,
        githubUrl: meta.githubUrl
      };
    });
  }, [items]);

  return (
    <div className="hackathon-page">
      <div className="hackathon-page-glow" />
      <div className="hackathon-back-row">
        <button
          type="button"
          onClick={onBack}
          className="hackathon-back"
        >
          Retour
        </button>
      </div>

      <div className="hackathon-page-shell">

        <header className="hackathon-hero">
          <p className="hackathon-hero-kicker">Hackathons</p>
          <h1>Hackathon Stories</h1>
          <p className="hackathon-hero-intro">
            Competitive builds that best reflect how I prototype, ship and present AI products under pressure.
          </p>
        </header>

        <Timeline
          className="hackathon-timeline"
          data={cards.map((card) => ({
            title: card.timelineTitle,
            content: (
              <div className="hackathon-entry">
                <div className="hackathon-entry-header">
                  <p className="hackathon-badge">
                    <Trophy className="hackathon-badge-icon" />
                    {card.meta}
                  </p>
                  <h3 className="hackathon-entry-title">{card.displayTitle}</h3>
                  <div className="hackathon-meta-row">
                    <span className="hackathon-meta-item">
                      <CalendarDays className="hackathon-meta-icon" />
                      {card.period}
                    </span>
                    <span className="hackathon-meta-item">
                      <MapPin className="hackathon-meta-icon" />
                      {card.location}
                    </span>
                  </div>
                </div>

                <p className="hackathon-summary">{card.summary}</p>

                <div className="hackathon-copy-list">
                  {card.bullets.map((bullet) => (
                    <p key={bullet} className="hackathon-copy-item">
                      {bullet}
                    </p>
                  ))}
                </div>

                {card.githubUrl ? (
                  <div className="hackathon-link-row">
                    <a
                      href={card.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hackathon-github-link"
                    >
                      <Github className="hackathon-github-icon" />
                      Voir le GitHub
                    </a>
                  </div>
                ) : null}

                <div className="hackathon-image-grid">
                  {card.images.slice(0, card.id === 'hack-europe' ? 3 : 4).map((image, index) => (
                    <img
                      key={`${card.id}-${image}-${index}`}
                      src={image}
                      alt={`${card.timelineTitle} visuel ${index + 1}`}
                      className={`hackathon-image ${imageShadow}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )
          }))}
        />

        <div className="hackathon-coming-soon">
          <p className="hackathon-coming-soon-title">NEXT ARE COMING SOON...</p>
        </div>
      </div>
    </div>
  );
};

export default HackathonShowcase;
