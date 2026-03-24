import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import { getProfileBanner } from '../queries/getProfileBanner';
import { ProfileBanner as ProfileBannerType } from '../types';
import { getFrenchCvPath, loadDataFromRepo } from '../lib/loadDataFromRepo';

const ProfileBanner: React.FC = () => {


  const [bannerData, setBannerData] = useState<ProfileBannerType | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [cvPath, setCvPath] = useState<string | null>('/cv/cv_elias_moussouni_fr.pdf');

  useEffect(() => {
    async function fetchData() {
      const data = await getProfileBanner();
      setBannerData(data);
    }
    fetchData();
    loadDataFromRepo().then(({ manifest }) => {
      setCvPath(getFrenchCvPath(manifest));
    });
  }, []);

  if (!bannerData) {
    return (
      <div className="banner-skeleton" aria-live="polite">
        Chargement du hero...
      </div>
    );
  }

  const handleDownloadCv = () => {
    if (!cvPath) {
      return;
    }
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV_Elias_Moussouni_FR.pdf';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => setIsDownloading(false), 900);
  };

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline" id='headline'>{bannerData.headline}</h1>
        <p className="banner-description">
          {bannerData.profileSummary}
        </p>

        <div className="banner-buttons">
          <button
            className={`banner-cta banner-cta-primary ${isDownloading ? 'is-downloading' : ''}`}
            onClick={handleDownloadCv}
            type="button"
            aria-label="Telecharger mon CV en francais"
            disabled={!cvPath}
          >
            <span className="banner-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M5 2.7c0-.76.82-1.24 1.49-.88l16.92 9.3c.69.38.69 1.37 0 1.75L6.49 22.18c-.67.36-1.49-.12-1.49-.88V2.7z" />
              </svg>
            </span>
            <span>{!cvPath ? 'Resume indisponible' : isDownloading ? 'Downloading...' : 'Resume'}</span>
          </button>
          <a
            className="banner-cta banner-cta-secondary"
            href="https://www.linkedin.com/in/elias-moussouni-075410241/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir le profil LinkedIn de Elias Moussouni dans un nouvel onglet"
          >
            <span className="banner-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 8v8h-2v-8h2zm-.5-1.5A1.5 1.5 0 1011 7a1.5 1.5 0 001.5 1.5z"
                />
              </svg>
            </span>
            <span>Linkedin</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
