import React, { useEffect, useRef } from 'react';
import { PortfolioItem } from './portfolioData';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div className="portfolio-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="portfolio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Fermer la fiche">
          Fermer
        </button>
        {item.image ? <img src={item.image} alt={item.title} loading="lazy" className="modal-image" /> : null}
        {item.gallery?.length ? (
          <div className="modal-gallery" aria-label="Galerie">
            {item.gallery.map((image) => (
              <img key={image} src={image} alt={`${item.title} visuel`} loading="lazy" />
            ))}
          </div>
        ) : null}
        <h3 id="portfolio-modal-title">{item.title}</h3>
        {item.subtitle ? <p className="modal-subtitle">{item.subtitle}</p> : null}
        {item.period ? <p className="modal-period">{item.period}</p> : null}
        {item.location ? <p className="modal-location">{item.location}</p> : null}
        <p className="modal-summary">{item.summary}</p>

        {item.bullets?.length ? (
          <ul className="modal-bullets">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}

        {item.links?.length ? (
          <div className="modal-links">
            {item.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PortfolioModal;
