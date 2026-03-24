import React, { useState } from 'react';
import './Reading.css';

type Film = {
  title: string;
  director: string;
  year: string;
  image: string;
  heroImage: string;
  blurb: string;
  tags: string[];
  imageClassName?: string;
};

const films: Film[] = [
  {
    title: 'Goodfellas',
    director: 'Martin Scorsese',
    year: '1990',
    image: '/img/film/goodfellas-landscape-poster.jpg',
    heroImage: '/img/film-hero/goodfellas-hero.png',
    blurb: 'For style, pace and one of the sharpest cinematic atmospheres ever put on screen.',
    tags: ['Crime', 'Style', 'Classic'],
  },
  {
    title: 'Parasite',
    director: 'Bong Joon-ho',
    year: '2019',
    image: '/img/film/parasite-still.jpg',
    heroImage: '/img/film-hero/parasite-hero.webp',
    blurb: 'For tension, precision and the feeling that every small detail matters.',
    tags: ['Thriller', 'Social', 'Tension'],
  },
  {
    title: 'Whiplash',
    director: 'Damien Chazelle',
    year: '2014',
    image: '/img/film/whiplash-landscape-poster.jpg',
    heroImage: '/img/film-hero/whiplash-hero.jpg',
    blurb: 'For intensity, obsession and the kind of pressure that keeps you locked in.',
    tags: ['Intensity', 'Performance', 'Rhythm'],
  },
  {
    title: 'The Pianist',
    director: 'Roman Polanski',
    year: '2002',
    image: '/img/film/pianist-landscape-poster.jpg',
    heroImage: '/img/film-hero/the-pianist-hero.jpg',
    blurb: 'For emotional depth, restraint and the weight a film can carry without excess.',
    tags: ['Drama', 'War', 'Emotion'],
  },
  {
    title: 'Green Book',
    director: 'Peter Farrelly',
    year: '2018',
    image: '/img/film/green-book.jpg',
    heroImage: '/img/film-hero/green-book-hero.jpg',
    blurb: 'For chemistry, warmth and the kind of film that stays accessible without being empty.',
    tags: ['Road Movie', 'Human', 'Dialogue'],
  },
  {
    title: "JoJo's Bizarre Adventure",
    director: 'Hirohiko Araki',
    year: '1987',
    image: '/img/film/jojo-bizar-vertical.jpg',
    heroImage: '/img/film-hero/jojo-bizar-hero.png',
    blurb: 'For pure style, eccentricity and a visual identity that is impossible to confuse with anything else.',
    tags: ['Stylized', 'Cult', 'Iconic'],
    imageClassName: 'cinema-card-image-jojo',
  },
];

const rows = [
  { title: 'Top Picks for Elias', items: [films[0], films[1], films[2], films[3]] },
  { title: 'Style And Impact', items: [films[5], films[4], films[0], films[2]] },
  { title: 'Tension And Emotion', items: [films[1], films[3], films[4], films[5]] },
];

const Reading: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const heroFilm = activeFilm ?? films[0];

  return (
    <div className="cinema-page">
      <section
        className="cinema-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.72) 36%, rgba(0,0,0,0.28) 66%, rgba(0,0,0,0.84) 100%), url(${heroFilm.heroImage})`,
        }}
      >
        <div key={activeFilm?.title ?? 'intro'} className="cinema-hero-copy">
          <p className="cinema-kicker">Cinema</p>
          <h1>{activeFilm ? activeFilm.title : 'Films That Marked Me'}</h1>
          <p className="cinema-meta">
            {activeFilm ? `${activeFilm.director} • ${activeFilm.year}` : 'A selection of films, moods and obsessions'}
          </p>
          <p className="cinema-description">
            {activeFilm
              ? activeFilm.blurb
              : "I care a lot about cinema for atmosphere, tension, rhythm and identity. These are some of the films that stayed with me, shaped my taste, and that I keep wanting to revisit."}
          </p>
          <div className="cinema-tags">
            {(activeFilm?.tags ?? ['Atmosphere', 'Intensity', 'Style']).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {rows.map((row) => (
        <section key={row.title} className="cinema-row-section">
          <h2>{row.title}</h2>
          <div className="cinema-row" role="list" aria-label={row.title}>
            {row.items.map((film, index) => (
              <button
                key={`${row.title}-${film.title}-${index}`}
                type="button"
                className={`cinema-card ${activeFilm?.title === film.title ? 'cinema-card-active' : ''}`}
                role="listitem"
                onClick={() => setActiveFilm(film)}
                aria-label={`Afficher ${film.title} dans le hero`}
              >
                <img
                  src={film.image}
                  alt={film.title}
                  className={`cinema-card-image ${film.imageClassName ?? ''}`.trim()}
                />
                <div className="cinema-card-overlay" />
                <div className="cinema-card-copy">
                  <p className="cinema-card-year">{film.year}</p>
                  <h3>{film.title}</h3>
                  <p className="cinema-card-director">{film.director}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Reading;
