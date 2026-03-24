import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';
import { getContactMe } from '../queries/getContactMe';

const githubUrl = 'https://github.com/eliasmoussouni';

const ContactMe: React.FC = () => {
  const [userData, setUserData] = useState<IContactMe>();

  useEffect(() => {
    async function fetchUserData() {
      const data = await getContactMe();
      setUserData(data);
    }

    fetchUserData();
  }, []);

  if (!userData) {
    return <div className="contact-loading">Loading...</div>;
  }

  return (
    <div className="contact-showcase-page">
      <section className="contact-hero-card" aria-label="Contact profile">
        <div className="contact-hero-copy">
          <h1>{userData.name}</h1>
          <h2>{userData.title}</h2>
          <p className="contact-hero-summary">{userData.summary}</p>
          <p className="contact-hero-meta">{userData.companyUniversity}</p>

          <div className="contact-hero-links">
            <a
              href={userData.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-primary-link"
            >
              <FaLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-link"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="contact-photo-shell">
          <img
            src={userData.profilePicture?.url || '/img/contact_Photo.jfif'}
            alt={`Portrait de ${userData.name}`}
            className="contact-photo"
            loading="lazy"
          />
        </div>
      </section>

      <div className="contact-cta-row">
        <a href={`mailto:${userData.email}`} className="contact-cta-pill">
          <FaEnvelope aria-hidden="true" />
          <span>Email Me</span>
        </a>

        <a href={`tel:${userData.phoneNumber}`} className="contact-cta-pill">
          <FaPhoneAlt aria-hidden="true" />
          <span>Contact Me</span>
        </a>
      </div>

      <p className="contact-coffee-note">Or catch up over a coffee!</p>
    </div>
  );
};

export default ContactMe;
