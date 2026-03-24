import { Certification, ContactMe, ProfileBanner, Project, Skill, TimelineItem, WorkPermit } from '../types';

export const fallbackProfileBanner: ProfileBanner = {
  backgroundImage: { url: '' },
  headline: 'Elias Moussouni - AI Engineer',
  resumeLink: { url: '/cv/cv_elias_moussouni_fr.pdf' },
  linkedinLink: 'https://www.linkedin.com/in/elias-moussouni-075410241/',
  profileSummary:
    'AI engineering, RAG, computer vision, embedded systems, and project delivery in academic and hackathon contexts.'
};

export const fallbackWorkPermit: WorkPermit = {
  visaStatus: 'Info non disponible',
  expiryDate: new Date('2028-12-31'),
  summary: 'Information de permis non disponible dans les CV fournis.',
  additionalInfo: 'Info non disponible'
};

export const fallbackTimeline: TimelineItem[] = [
  {
    timelineType: 'work',
    name: 'Sagemcom',
    title: 'AI Engineer (Apprenticeship)',
    techStack: 'Computer Vision, RAG, Prompt Engineering',
    summaryPoints: ['Emotion recognition models and enterprise RAG assistant contribution.'],
    dateRange: 'Oct 2025 - Oct 2027'
  },
  {
    timelineType: 'education',
    name: 'ECE Paris Engineering School',
    title: 'Engineering degree - AI & Data',
    techStack: 'AI, Data, Electronics',
    summaryPoints: ['Expected graduation in 2027.'],
    dateRange: 'Sep 2022 - Present'
  }
];

export const fallbackProjects: Project[] = [
  {
    title: 'Bioreactor AI Optimisation - ReaKt',
    description: 'AI bioreactor autopilot, Hack The Fork (2nd place).',
    techUsed: 'Python, LSTM, MPC',
    image: { url: '/hackathon/Certificat.jpg' }
  },
  {
    title: 'EveryOne - Local LLM Platform',
    description: '100% local inference with RAG and source-cited responses.',
    techUsed: 'ReactJS, FastAPI, Python',
    image: { url: '/hackathon/demo.jpeg' }
  }
];

export const fallbackCertifications: Certification[] = [
  {
    title: 'Certification (image 1)',
    issuer: 'Certificats/',
    issuedDate: 'Info non disponible',
    link: '/certificats/certificat_1.png',
    iconName: 'udemy'
  },
  {
    title: 'Certification (image 2)',
    issuer: 'Certificats/',
    issuedDate: 'Info non disponible',
    link: '/certificats/certificat_2.png',
    iconName: 'university'
  }
];

export const fallbackContactMe: ContactMe = {
  profilePicture: { url: '/img/contact_Photo.jfif' },
  name: 'Elias Moussouni',
  title: 'AI Engineer (Apprenticeship)',
  summary:
    'AI engineering profile with experience in computer vision, RAG assistants, embedded systems, and hackathon-driven product delivery.',
  companyUniversity: 'Sagemcom | ECE Paris Engineering School',
  linkedinLink: 'https://www.linkedin.com/in/elias-moussouni-075410241/',
  email: 'elias.moussouni@edu.ece.fr',
  phoneNumber: '+33 6 95 12 16 86'
};

export const fallbackSkills: Skill[] = [
  {
    name: 'Deep Learning',
    category: 'AI',
    description: 'Mentioned in official CV technical skills.',
    icon: 'FaReact'
  },
  {
    name: 'Computer Vision',
    category: 'AI',
    description: 'Mentioned in official CV technical skills.',
    icon: 'FaReact'
  },
  {
    name: 'Python',
    category: 'Programming',
    description: 'Mentioned in official CV programming languages.',
    icon: 'FaNodeJs'
  },
  {
    name: 'TypeScript',
    category: 'Programming',
    description: 'Mentioned in official CV programming languages.',
    icon: 'SiTypescript'
  }
];
