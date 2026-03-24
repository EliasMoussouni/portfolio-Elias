import React, { useEffect, useMemo, useState } from 'react';
import CarouselRow from './CarouselRow';
import PortfolioModal from './PortfolioModal';
import { PortfolioItem, portfolioSections, PortfolioSection } from './portfolioData';
import './portfolio.css';
import { loadDataFromRepo } from '../lib/loadDataFromRepo';

const PortfolioRows: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [sections, setSections] = useState<PortfolioSection[]>(portfolioSections);

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

  const orderedSections = useMemo(() => {
    const order = ['experience', 'projects', 'hackathon', 'skills', 'education', 'languages', 'activities'];
    return order
      .map((id) => sections.find((section) => section.id === id))
      .filter((section): section is NonNullable<typeof section> => Boolean(section));
  }, [sections]);

  return (
    <div className="portfolio-rows">
      {orderedSections.map((section) => (
        <CarouselRow key={section.id} section={section} onOpen={setSelectedItem} />
      ))}
      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default PortfolioRows;
