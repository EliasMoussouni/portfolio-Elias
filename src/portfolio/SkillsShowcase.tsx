import React from 'react';
import {
  FaBrain,
  FaCogs,
  FaLaptopCode,
  FaUsers,
  FaPython,
  FaJava,
  FaGitAlt,
  FaProjectDiagram,
  FaLightbulb
} from 'react-icons/fa';
import { SiC, SiTypescript, SiJavascript, SiMongodb, SiLinux, SiArduino, SiHtml5, SiCss3 } from 'react-icons/si';
import { MdDataObject, MdMemory } from 'react-icons/md';
import './skillsShowcase.css';

type SkillCard = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

type SkillCategory = {
  title: string;
  skills: SkillCard[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Data',
    skills: [
      { name: 'Deep Learning', description: 'Competence technique (CV officiel)', icon: <FaBrain /> },
      { name: 'Machine Learning', description: 'Competence technique (CV officiel)', icon: <MdDataObject /> },
      { name: 'Computer Vision', description: 'Competence technique (CV officiel)', icon: <FaLightbulb /> },
      { name: 'LLMs / RAG', description: 'Competence technique (CV officiel)', icon: <MdMemory /> },
      { name: 'Prompt Engineering', description: 'Competence technique (CV officiel)', icon: <FaProjectDiagram /> }
    ]
  },
  {
    title: 'Embedded & Systems',
    skills: [
      { name: 'Embedded Systems', description: 'Competence technique (CV officiel)', icon: <FaCogs /> },
      { name: 'FPGA / VHDL', description: 'Competence technique (CV officiel)', icon: <FaLaptopCode /> },
      { name: 'Arduino', description: 'Competence technique (CV officiel)', icon: <SiArduino /> },
      { name: 'Linux / Ubuntu', description: 'Competence technique (CV officiel)', icon: <SiLinux /> },
      { name: 'Git / GitHub', description: 'Competence technique (CV officiel)', icon: <FaGitAlt /> }
    ]
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', description: 'Langage de programmation (CV officiel)', icon: <FaPython /> },
      { name: 'C', description: 'Langage de programmation (CV officiel)', icon: <SiC /> },
      { name: 'Java', description: 'Langage de programmation (CV officiel)', icon: <FaJava /> },
      { name: 'MATLAB', description: 'Langage de programmation (CV officiel)', icon: <FaLaptopCode /> },
      { name: 'SQL', description: 'Langage de programmation (CV officiel)', icon: <SiMongodb /> },
      { name: 'HTML', description: 'Langage de programmation (CV officiel)', icon: <SiHtml5 /> },
      { name: 'CSS', description: 'Langage de programmation (CV officiel)', icon: <SiCss3 /> },
      { name: 'JavaScript', description: 'Langage de programmation (CV officiel)', icon: <SiJavascript /> },
      { name: 'TypeScript', description: 'Langage de programmation (CV officiel)', icon: <SiTypescript /> }
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Teamwork', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> },
      { name: 'Autonomie', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> },
      { name: 'Problem-solving', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> },
      { name: 'Organisation', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> },
      { name: 'Gestion de projet', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> },
      { name: 'Adaptabilite', description: 'Competence transversale (CV officiel)', icon: <FaUsers /> }
    ]
  }
];

const SkillsShowcase: React.FC = () => {
  return (
    <div className="skills-showcase">
      {skillCategories.map((category) => (
        <section key={category.title} className="skills-category" aria-label={category.title}>
          <h2>{category.title}</h2>
          <div className="skills-grid" role="list">
            {category.skills.map((skill) => (
              <article key={skill.name} className="skill-card" role="listitem">
                <div className="skill-icon" aria-hidden="true">
                  {skill.icon}
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SkillsShowcase;
