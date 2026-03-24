import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileText,
  Layers3,
  LucideIcon,
  RotateCcw,
  RotateCw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { PortfolioItem } from './portfolioData';
import './activitiesShowcase.css';

interface ActivitiesShowcaseProps {
  items: PortfolioItem[];
  title: string;
  description: string;
  onBack: () => void;
}

type PanelView = 'resume' | 'details' | 'competences' | 'impact' | 'timeline' | 'links';

interface PlayerCopy {
  body: string;
  detail?: string;
  link?: { label: string; url: string };
}

const panelIcons: Record<PanelView, LucideIcon> = {
  resume: FileText,
  details: Layers3,
  competences: Sparkles,
  impact: Trophy,
  timeline: Clock3,
  links: ExternalLink
};

const panelOrder: PanelView[] = ['resume', 'details', 'competences', 'impact', 'timeline', 'links'];

const activityVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 32 : -32,
    y: 10
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -24 : 24,
    y: -6
  })
};

const textVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const backgroundVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 }
};

const formatIndex = (value: number): string => String(value).padStart(2, '0');

const getDefaultPanelId = (item: PortfolioItem): PanelView => {
  const firstPanel = item.extraInfos?.[0]?.id as PanelView | undefined;
  return firstPanel && panelOrder.includes(firstPanel) ? firstPanel : 'resume';
};

const getPanelCopy = (item: PortfolioItem, panelId: PanelView): PlayerCopy => {
  const panel = item.extraInfos?.find((entry) => entry.id === panelId);

  if (panel?.link) {
    return {
      body: panel.description,
      detail: panel.items?.slice(0, 3).join(' • '),
      link: panel.link
    };
  }

  if (panel) {
    return {
      body: panel.description,
      detail: panel.items?.slice(0, 3).join(' • ')
    };
  }

  return {
    body: item.longDescription ?? item.summary,
    detail: item.tags?.slice(0, 3).join(' • ')
  };
};

const ActivitiesShowcase: React.FC<ActivitiesShowcaseProps> = ({
  items,
  title,
  description,
  onBack
}) => {
  const activityItems = items.length
    ? items
    : [
        {
          id: 'fallback-activity',
          title,
          summary: description
        }
      ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activePanelId, setActivePanelId] = useState<PanelView>(getDefaultPanelId(activityItems[0]));

  const activeItem = activityItems[activeIndex];
  const availablePanels = useMemo(
    () =>
      panelOrder.filter((panelId) =>
        panelId === 'links'
          ? Boolean(activeItem.extraInfos?.some((panel) => panel.id === panelId) || activeItem.links?.length)
          : Boolean(activeItem.extraInfos?.some((panel) => panel.id === panelId))
      ),
    [activeItem]
  );

  const activeCopy = useMemo(
    () => getPanelCopy(activeItem, activePanelId),
    [activeItem, activePanelId]
  );

  useEffect(() => {
    document.body.classList.add('activities-player-mode');

    return () => {
      document.body.classList.remove('activities-player-mode');
    };
  }, []);

  useEffect(() => {
    setActivePanelId(getDefaultPanelId(activeItem));
  }, [activeItem]);

  const goToIndex = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + activityItems.length) % activityItems.length);
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % activityItems.length);
  };

  const progressPercent =
    activityItems.length <= 1 ? 0 : (activeIndex / (activityItems.length - 1)) * 100;

  return (
    <div
      className="activities-player"
      style={{ '--activity-accent': activeItem.accent ?? '#e50914' } as React.CSSProperties}
    >
      <div className="activities-player-background" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            className="activities-player-image"
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={
              activeItem.backgroundImage
                ? { backgroundImage: `url(${activeItem.backgroundImage})` }
                : undefined
            }
          />
        </AnimatePresence>
        <div className="activities-player-darkness" />
        <div className="activities-player-gradient" />
      </div>

      <section className="activities-player-scene" aria-label={title}>
        <header className="activities-player-topbar">
          <button className="activities-player-back" onClick={onBack} type="button">
            <ArrowLeft size={17} />
            <span>Retour</span>
          </button>

          <div className="activities-player-index" aria-label="Position dans le carousel">
            {formatIndex(activeIndex + 1)} <span>—</span> {formatIndex(activityItems.length)}
          </div>
        </header>

        <div className="activities-player-main">
          <button
            className="activities-player-side activities-player-side-left"
            onClick={goToPrevious}
            type="button"
            aria-label="Activite precedente"
          >
            <RotateCcw size={28} strokeWidth={1.8} />
            <span>Precedent</span>
          </button>

          <div className="activities-player-copy">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeItem.id}
                className="activities-player-copy-block"
                variants={activityVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="activities-player-eyebrow">{activeItem.subtitle ?? title}</p>
                <h1>{activeItem.title}</h1>
                <p className="activities-player-hook">
                  {activeItem.shortDescription ?? activeItem.summary}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem.id}-${activePanelId}`}
                    className="activities-player-context"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="activities-player-description">{activeCopy.body}</p>
                    {activeCopy.detail ? (
                      <p className="activities-player-detail">{activeCopy.detail}</p>
                    ) : null}
                    {activeCopy.link ? (
                      <a
                        className="activities-player-link"
                        href={activeCopy.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} />
                        <span>{activeCopy.link.label}</span>
                      </a>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="activities-player-tags">
                  {activeItem.period ? <span>{activeItem.period}</span> : null}
                  {activeItem.tags?.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="activities-player-side activities-player-side-right"
            onClick={goToNext}
            type="button"
            aria-label="Activite suivante"
          >
            <RotateCw size={28} strokeWidth={1.8} />
            <span>Suivant</span>
          </button>
        </div>

        <div className="activities-player-bottom">
          <div className="activities-player-progress">
            <div className="activities-player-progress-bar">
              <div className="activities-player-progress-track" />
              <motion.div
                className="activities-player-progress-fill"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.button
                type="button"
                className="activities-player-progress-thumb"
                animate={{ left: `${progressPercent}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Activite ${activeIndex + 1}`}
                onClick={() => goToIndex(activeIndex)}
              />
            </div>
            <span className="activities-player-progress-label">{activeItem.title}</span>
          </div>

          <div className="activities-player-controls" role="tablist" aria-label="Vues activite">
            {availablePanels.map((panelId) => {
              const Icon = panelIcons[panelId];
              const panel = activeItem.extraInfos?.find((entry) => entry.id === panelId);
              const label =
                panelId === 'links' ? panel?.label ?? 'Liens' : panel?.label ?? panelId;

              return (
                <button
                  key={panelId}
                  type="button"
                  role="tab"
                  aria-selected={activePanelId === panelId}
                  className={`activities-player-control ${activePanelId === panelId ? 'is-active' : ''}`}
                  onClick={() => setActivePanelId(panelId)}
                >
                  <Icon size={16} strokeWidth={1.9} />
                  <span>{label}</span>
                </button>
              );
            })}

            <button
              type="button"
              className="activities-player-control activities-player-control-next"
              onClick={goToNext}
            >
              <ChevronRight size={16} strokeWidth={1.9} />
              <span>Suivant</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesShowcase;
