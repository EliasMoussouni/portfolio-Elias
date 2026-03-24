"use client";

import { GraduationCap, Award, BookOpen, ScrollText } from "lucide-react";
import RadialOrbitalTimeline from "./radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "ECE PARIS",
    date: "2018 - 2021",
    content:
      "Ecole d'ingenieurs generaliste. Specialisation en Systemes d'Information et Cybersecurite.",
    category: "Education" as const,
    icon: GraduationCap,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
    documentUrl: "/docs/diplome-ece.pdf",
  },
  {
    id: 2,
    title: "OMNES EDUCATION LONDON",
    date: "2020",
    content:
      "Semestre international a Londres. Focus sur le Management International et la Finance.",
    category: "Education" as const,
    icon: BookOpen,
    relatedIds: [1],
    status: "completed" as const,
    energy: 90,
    documentUrl: "/docs/certificat-omnes.pdf",
  },
  {
    id: 3,
    title: "Certification Cloud",
    date: "2022",
    content:
      "Certification professionnelle sur l'architecture Cloud et les microservices.",
    category: "Certification" as const,
    icon: Award,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 70,
    documentUrl: "/docs/certif-cloud.pdf",
  },
  {
    id: 4,
    title: "Certification Agile",
    date: "2023",
    content: "Maitrise des methodologies Scrum et Kanban pour la gestion de projet.",
    category: "Certification" as const,
    icon: ScrollText,
    relatedIds: [3],
    status: "completed" as const,
    energy: 60,
    documentUrl: "/docs/certif-agile.pdf",
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
