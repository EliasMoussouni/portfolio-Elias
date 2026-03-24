import React from 'react';
import AnimatedTestimonials, { Testimonial } from '../components/ui/animated-testimonials';
import './referencesTestimonials.css';

const testimonials: Testimonial[] = [
  {
    name: 'Dr John Balasuriya',
    designation: 'Lecturer of Artificial Intelligence - Omnes Education London School',
    src: '/reference/john.jpg',
    quote:
      "For his Artificial Intelligence project with me, Elias developed a face recognition system that could recognise the students in his engineering class of over 100 students.",
    downloadUrl: '/reference/reference_john_en.pdf',
    downloadLabel: 'Download reference (EN)'
  },
  {
    name: 'Gabriel Morgado',
    designation: 'Enseignant',
    src: '/reference/morgado.jpg',
    quote:
      "Elias Moussouni s est classe systematiquement dans le top 5% lors des examens de mes cours. C est un excellent etudiant. Il participait, restait attentif et demandait toujours a aller plus loin.",
    downloadUrl: '/reference/reference_morgado_fr.pdf',
    downloadLabel: 'Telecharger la lettre (FR)'
  }
];

const ReferencesTestimonials: React.FC = () => {
  return (
    <div className="references-testimonials-page">
      <AnimatedTestimonials testimonials={testimonials} autoplay className="references-testimonials-carousel" />
    </div>
  );
};

export default ReferencesTestimonials;
