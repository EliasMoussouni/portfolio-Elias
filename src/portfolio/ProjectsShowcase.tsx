import React, { useMemo } from 'react';
import { FaLink, FaBriefcase, FaProjectDiagram, FaTag } from 'react-icons/fa';
import { PortfolioItem } from './portfolioData';
import './projectsShowcase.css';

interface ProjectsShowcaseProps {
  projectItems: PortfolioItem[];
}

type ShowcaseCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: { label: string; url: string };
  type: 'project' | 'experience';
};

const fallbackImages = [
  '/hackathon/demo.jpeg',
  '/hackathon/1771853886168.jpg',
  '/hackathon/1765896140097.jpg',
  '/hackathon/1765961375533.jpg',
  '/hackathon/IMG_0366.jpeg',
  '/hackathon/IMG_0422.jpeg'
];

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projectItems }) => {
  const cards = useMemo<ShowcaseCard[]>(() => {
    const fromProjects: ShowcaseCard[] = projectItems.map((item, index) => ({
      id: item.id,
      title: item.title,
      description: item.summary,
      image: item.image || fallbackImages[index % fallbackImages.length],
      tags: item.tags || ['info non disponible'],
      link: item.links?.[0],
      type: 'project'
    }));
    return fromProjects;
  }, [projectItems]);

  return (
    <div className="projects-showcase">
      <header className="projects-showcase-header">
        <p className="projects-showcase-kicker">Projects</p>
        <h1>Selected Projects</h1>
        <p className="projects-showcase-intro">
          Projects that best reflect how I prototype, build and solve problems.
        </p>
      </header>

      <div className="projects-showcase-grid" role="list" aria-label="Projects and experience highlights">
        {cards.map((card, index) => (
          <article
            className="project-showcase-card"
            key={card.id}
            role="listitem"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div className="project-showcase-media">
              <img src={card.image} alt={card.title} loading="lazy" />
            </div>

            <div className="project-showcase-body">
              <div className="project-showcase-kind">
                {card.type === 'project' ? <FaProjectDiagram aria-hidden="true" /> : <FaBriefcase aria-hidden="true" />}
                <span>{card.type === 'project' ? 'Project' : 'Experience highlight'}</span>
              </div>

              <h2>{card.title}</h2>
              <p>{card.description}</p>

              <div className="project-showcase-tags" aria-label="Technologies">
                {card.tags.slice(0, 5).map((tag) => (
                  <span key={`${card.id}-${tag}`}>
                    <FaTag aria-hidden="true" /> {tag}
                  </span>
                ))}
              </div>

              {card.link ? (
                <a href={card.link.url} target="_blank" rel="noopener noreferrer" className="project-showcase-link">
                  <FaLink aria-hidden="true" /> {card.link.label}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
