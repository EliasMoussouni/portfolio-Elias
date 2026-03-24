import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope, FaRobot } from 'react-icons/fa'; // Import icons
import './Navbar.css';
import blueImage from '../images/blue.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentProfileFromPath = location.pathname.match(/^\/profile\/([^/]+)/)?.[1];
  const storedProfileName = (() => {
    try {
      return localStorage.getItem('selectedProfileName');
    } catch {
      return null;
    }
  })();
  const storedProfileImage = (() => {
    try {
      return localStorage.getItem('selectedProfileImage');
    } catch {
      return null;
    }
  })();
  const storedBackgroundGif = (() => {
    try {
      return localStorage.getItem('selectedProfileBackgroundGif');
    } catch {
      return null;
    }
  })();
  const activeProfileName = currentProfileFromPath || storedProfileName;
  const homeRoute = activeProfileName ? `/profile/${activeProfileName}` : '/browse';
  const homeState = activeProfileName
    ? {
        profileImage: location.state?.profileImage || storedProfileImage || blueImage,
        backgroundGif: location.state?.backgroundGif || storedBackgroundGif || undefined
      }
    : undefined;
  const profileImage = location.state?.profileImage || storedProfileImage || blueImage;

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to={homeRoute} state={homeState} className="navbar-logo-text" aria-label="Accueil Elias Moussouni">
            ELIAS MOUSSOUNI
          </Link>
          <ul className="navbar-links">
            <li><Link to={homeRoute} state={homeState}>Home</Link></li>
            <li><Link to="/section/experience">Professional</Link></li>
            <li><Link to="/section/skills">Skills</Link></li>
            <li><Link to="/section/projects">Projects</Link></li>
            <li><Link to="/section/contact">Contact</Link></li>
            <li><Link to="/elias-gpt">EliasGPT</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          {/* Hamburger menu for mobile */}
          <div className="hamburger" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img
            src={profileImage}
            alt="Profile"
            className="profile-icon"
            onClick={() => { navigate('/browse'); }}
          />
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      {/* Sidebar (only visible on mobile) */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">ELIAS MOUSSOUNI</div>
        <ul>
          <li><Link to={homeRoute} state={homeState} onClick={closeSidebar}><FaHome /> Home</Link></li>
          <li><Link to="/section/experience" onClick={closeSidebar}><FaBriefcase /> Professional</Link></li>
          <li><Link to="/section/skills" onClick={closeSidebar}><FaTools /> Skills</Link></li>
          <li><Link to="/section/projects" onClick={closeSidebar}><FaProjectDiagram /> Projects</Link></li>
          <li><Link to="/section/contact" onClick={closeSidebar}><FaEnvelope /> Contact</Link></li>
          <li><Link to="/elias-gpt" onClick={closeSidebar}><FaRobot /> EliasGPT</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
