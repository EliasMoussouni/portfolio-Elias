import React from 'react';
import './Music.css';

const favoriteStyles = ['Pop', 'Hip-Hop', 'Classical', 'Storytelling', 'Piano'];

type FavoriteTrack = {
  title: string;
  artist: string;
  note: string;
  imgSrc: string;
  imageClassName?: string;
};

const favoriteTracks: FavoriteTrack[] = [
  {
    title: 'Smooth Criminal',
    artist: 'Michael Jackson',
    note: 'Rhythm, tension and stage presence. One of the cleanest pop performances ever made.',
    imgSrc: '/img/music/Michael.jpg',
  },
  {
    title: 'Big Poppa',
    artist: 'The Notorious B.I.G.',
    note: 'Flow, confidence and timeless delivery. A track with instant presence.',
    imgSrc: '/img/music/BigPoppa.jpg',
  },
  {
    title: 'Ballade No. 1 in G minor, Op. 23',
    artist: 'Frédéric Chopin',
    note: 'Intensity, elegance and emotional build-up. The piano piece I come back to the most.',
    imgSrc: '/img/music/Frederic_Chopin_photo.jpeg',
    imageClassName: 'album-image-chopin',
  },
];

const Music: React.FC = () => {
  return (
    <div className="music-page">
      <header className="music-hero">
        <p className="music-kicker">What I listen to most</p>
        <h1>Michael Jackson, Biggie, Chopin</h1>
        <p className="music-intro">
          Three very different worlds, but the same thing keeps me hooked: precision, identity and
          emotional impact.
        </p>
      </header>

      <section className="genre-section">
        <h2>Favorite styles</h2>
        <div className="genres">
          {favoriteStyles.map((genre, index) => (
            <div key={genre} className="genre-card" style={{ animationDelay: `${index * 0.08}s` }}>
              <p>{genre}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="albums-section">
        <h2>Favorite tracks</h2>
        <div className="albums">
          {favoriteTracks.map((track, index) => (
            <article key={track.title} className="album-card" style={{ animationDelay: `${index * 0.12}s` }}>
              <img
                src={track.imgSrc}
                alt={track.artist}
                className={`album-image ${track.imageClassName ?? ''}`.trim()}
              />
              <div className="album-details">
                <h3>{track.title}</h3>
                <p className="album-artist">{track.artist}</p>
                <p className="album-note">{track.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Music;
