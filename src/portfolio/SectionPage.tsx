import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import PortfolioModal from './PortfolioModal';
import { PortfolioItem, PortfolioSection, portfolioSections } from './portfolioData';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsShowcase from './SkillsShowcase';
import ProjectsShowcase from './ProjectsShowcase';
import HackathonShowcase from './HackathonShowcase';
import ContactMe from '../pages/ContactMe';
import ReferencesTestimonials from './ReferencesTestimonials';
import FormationShowcase from './FormationShowcase';
import ActivitiesShowcase from './ActivitiesShowcase';
import './sectionPage.css';
import './portfolio.css';
import { loadDataFromRepo } from '../lib/loadDataFromRepo';

const SectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState<PortfolioSection[]>(portfolioSections);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    let active = true;
    loadDataFromRepo().then((data) => {
      if (active) {
        setSections(data.sections);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const section = useMemo(
    () => sections.find((entry) => entry.id === sectionId),
    [sectionId, sections]
  );

  if (!section) {
    return (
      <div className="section-page">
        <button className="section-back" onClick={() => navigate(-1)} type="button">
          Retour
        </button>
        <h1>Section introuvable</h1>
      </div>
    );
  }

  const heroImage = section.coverImage || section.items.find((item) => item.image)?.image;
  if (section.id === 'experience') {
    const eceFormation = sections
      .find((entry) => entry.id === 'formation')
      ?.items.filter((item) => item.id === 'edu-ece') ?? [];

    return (
      <div className="section-page experience-section-page">
        <button
          className="section-back experience-back"
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Retour a l accueil sections"
        >
          Retour
        </button>
        <ExperienceTimeline experienceItems={section.items} educationItems={eceFormation} />
      </div>
    );
  }

  if (section.id === 'skills') {
    return (
      <div className="section-page skills-section-page">
        <button
          className="section-back experience-back"
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Retour a l accueil sections"
        >
          Retour
        </button>
        <SkillsShowcase />
      </div>
    );
  }

  if (section.id === 'projects') {
    return (
      <div className="section-page skills-section-page">
        <button
          className="section-back experience-back"
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Retour a l accueil sections"
        >
          Retour
        </button>
        <ProjectsShowcase projectItems={section.items} />
      </div>
    );
  }

  if (section.id === 'hackathon') {
    return <HackathonShowcase items={section.items} onBack={() => navigate(-1)} />;
  }

  if (section.id === 'contact') {
    return <ContactMe />;
  }

  if (section.id === 'reference') {
    return (
      <div className="section-page skills-section-page">
        <button
          className="section-back experience-back"
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Retour a l accueil sections"
        >
          Retour
        </button>
        <ReferencesTestimonials />
      </div>
    );
  }

  if (section.id === 'formation') {
    return (
      <div className="section-page skills-section-page formation-section-page">
        <FormationShowcase items={section.items} onBack={() => navigate(-1)} />
      </div>
    );
  }

  if (section.id === 'activites') {
    return (
      <ActivitiesShowcase
        items={section.items}
        title={section.title}
        description={section.description}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="section-page">
      <header
        className="section-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <div className="section-hero-overlay">
          <button
            className="section-back"
            onClick={() => navigate(-1)}
            type="button"
            aria-label="Retour a l accueil sections"
          >
            Retour
          </button>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      </header>

      <section className="section-carousel" aria-label={`Carrousel ${section.title}`}>
        <div className="carousel-track section-track">
          {section.items.map((item) => (
            <PortfolioCard key={item.id} item={item} onOpen={setSelectedItem} />
          ))}
        </div>
      </section>

      <div className="section-grid" role="list">
        {section.items.map((item) => (
          <article className="section-card" key={item.id} role="listitem">
            <div className="section-card-content">
              <h2>{item.title}</h2>
              {item.subtitle ? <p className="section-card-subtitle">{item.subtitle}</p> : null}
              {item.period ? <p className="section-card-period">{item.period}</p> : null}
              {item.location ? <p className="section-card-location">{item.location}</p> : null}
              <p>{item.summary}</p>
              {item.bullets?.length ? (
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {item.tags?.length ? (
                <div className="section-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
              <div className="section-card-actions">
                <button type="button" onClick={() => setSelectedItem(item)}>
                  Ouvrir la fiche
                </button>
                {item.links?.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default SectionPage;
