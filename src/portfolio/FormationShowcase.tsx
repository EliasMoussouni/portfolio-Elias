import React, { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SplineSceneBasic } from '../components/ui/spline-scene-basic';
import { PortfolioItem } from './portfolioData';
import './formationShowcase.css';

interface FormationShowcaseProps {
  items: PortfolioItem[];
  onBack: () => void;
}

interface CertificationCardData {
  id: string;
  title: string;
  description: string;
  documentUrl?: string;
  logoUrl?: string;
}

interface PointerState {
  x: number;
  y: number;
}

const mapToCertification = (item: PortfolioItem): CertificationCardData => ({
  id: item.id,
  title: item.title,
  description: item.summary,
  documentUrl: item.links?.[0]?.url ?? item.image,
  logoUrl: item.logo,
});

const FormationShowcase: React.FC<FormationShowcaseProps> = ({ items, onBack }) => {
  const certificationCards = useMemo(
    () => items.filter((item) => item.id.startsWith('cert-')).map(mapToCertification),
    [items]
  );
  const [hoveredCertificationId, setHoveredCertificationId] = useState<string | null>(null);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });

  if (!certificationCards.length) {
    return null;
  }

  return (
    <section className="formation-certifications-page" aria-label="Mes certifications">
      <header className="formation-certifications-header">
        <button
          className="formation-back-btn"
          onClick={onBack}
          type="button"
          aria-label="Retour a l accueil sections"
        >
          Retour
        </button>
        <h1>My Certifications</h1>
      </header>

      <div className="formation-certifications-grid" role="list" aria-label="Liste des certifications">
        {certificationCards.map((certification) => (
          <article
            key={certification.id}
            className="formation-certification-card"
            role="listitem"
            onMouseEnter={() => setHoveredCertificationId(certification.id)}
            onMouseLeave={() => {
              setHoveredCertificationId(null);
              setPointer({ x: 0, y: 0 });
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
              setPointer({ x, y });
            }}
            onFocus={() => setHoveredCertificationId(certification.id)}
            onBlur={() => {
              setHoveredCertificationId(null);
              setPointer({ x: 0, y: 0 });
            }}
          >
            <div className="formation-certification-logo-slot" aria-label={`Logo ${certification.title}`}>
              {certification.logoUrl ? (
                <img src={certification.logoUrl} alt="Logo certification" loading="lazy" />
              ) : (
                <span>Logo</span>
              )}
            </div>

            <h2>{certification.title}</h2>
            <p>{certification.description}</p>

            {certification.documentUrl ? (
              <a
                href={certification.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="formation-certification-btn"
                aria-label={`Voir le certificat ${certification.title}`}
              >
                <ExternalLink size={16} />
                <span>View Certificate</span>
              </a>
            ) : (
              <button type="button" className="formation-certification-btn is-disabled" disabled>
                <ExternalLink size={16} />
                <span>Certificate unavailable</span>
              </button>
            )}
          </article>
        ))}
      </div>

      <section className="formation-spline-section" aria-label="Interactive 3D showcase">
        <SplineSceneBasic
          alertEyes={hoveredCertificationId !== null}
          pointerX={pointer.x}
          pointerY={pointer.y}
        />
      </section>
    </section>
  );
};

export default FormationShowcase;
