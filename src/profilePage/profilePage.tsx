import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProfilePage.css';

import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';
import { PortfolioSection, portfolioSections } from '../portfolio/portfolioData';
import { loadDataFromRepo } from '../lib/loadDataFromRepo';

const CONTINUE_WATCHING_ITEMS = [
  {
    id: 'music',
    title: 'Music',
    coverImage: '/img/music_img.png',
    route: '/music'
  },
  {
    id: 'cinema',
    title: 'Cinema',
    coverImage: '/img/cinema.jpg',
    route: '/reading'
  },
  {
    id: 'sports',
    title: 'Activites & co',
    coverImage: '/img/piano_thumbnail.jpg',
    route: '/section/activites'
  },
  {
    id: 'contact-me',
    title: 'Contact Me',
    coverImage: 'https://picsum.photos/id/1029/300/200',
    route: '/section/contact'
  }
];

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const storedBackgroundGif = (() => {
    try {
      return localStorage.getItem('selectedProfileBackgroundGif');
    } catch {
      return null;
    }
  })();
  const backgroundGif =
    location.state?.backgroundGif ||
    storedBackgroundGif ||
    'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif';
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

  return (
    <>
      <div className="profile-page" style={{ backgroundImage: `url(${backgroundGif})` }}>
        <ProfileBanner />
      </div>
      <TopPicksRow sections={sections} title="Today's Top Picks for you" ariaLabel="Top picks for you" />
      <TopPicksRow
        sections={sections}
        title="Continue Watching for you"
        customPicks={CONTINUE_WATCHING_ITEMS}
        ariaLabel="Continue watching for you"
      />
    </>
  );
};

export default ProfilePage;
