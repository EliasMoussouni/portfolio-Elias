export interface PortfolioLink {
  label: string;
  url: string;
}

export interface PortfolioInfoPanel {
  id: string;
  label: string;
  eyebrow?: string;
  title: string;
  description: string;
  items?: string[];
  stat?: string;
  link?: PortfolioLink;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  location?: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
  image?: string;
  logo?: string;
  gallery?: string[];
  links?: PortfolioLink[];
  shortDescription?: string;
  longDescription?: string;
  backgroundImage?: string;
  accent?: string;
  extraInfos?: PortfolioInfoPanel[];
}

export interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  items: PortfolioItem[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: 'experience',
    title: 'Experience',
    description: 'Experiences professionnelles reconstituees a partir du CV officiel cv_elias_moussouni_fr.',
    coverImage: '/img/Working.jpeg',
    items: [
      {
        id: 'exp-sagemcom',
        title: 'Ingenieur IA en apprentissage',
        subtitle: 'Sagemcom',
        period: 'Oct 2025 - Oct 2027',
        location: 'Paris, France',
        summary:
          'Developpement et evaluation de solutions IA autour de la computer vision et d un assistant RAG interne.',
        bullets: [
          'Developpement d un modele CNN (MobileNetV2) avec 89% d accuracy sur 5 classes emotionnelles a partir d un dataset de 15k images.',
          'Contribution a un assistant RAG d entreprise avec chatbot interne et ingenierie d agents et prompts.',
          'Evaluation et benchmark de solutions IA, versioning des experiences et tracabilite des modeles via Git et MLflow.'
        ],
        tags: ['CNN', 'MobileNetV2', 'RAG', 'Git', 'MLflow']
      },
      {
        id: 'exp-reakt',
        title: 'Co-fondateur  AI Research & Head of Business Strategy',
        subtitle: 'ReaKt',
        period: 'Jan 2026 - Present',
        location: 'Paris, France',
        summary:
          'Projet entrepreneurial autour de l IA appliquee et de la strategie business.',
        bullets: [
          'Conception de l architecture IA avec reseaux LSTM et controle predictif MPC.',
          'Structuration du produit et de la strategie business.'
        ],
        tags: ['LSTM', 'MPC', 'AI Research', 'Business Strategy', 'Fundraising']
      },
      {
        id: 'exp-videlio-events',
        title: 'Ingenieur systemes embarques en stage',
        subtitle: 'Videlio Events',
        period: 'Jan 2024 - Fev 2024',
        location: 'Gennevilliers, France',
        summary:
          'Stage technique centre sur le diagnostic et la correction de pannes materielle et logicielle.',
        bullets: [
          'Depannage et reparation avec diagnostic et correction de pannes materielles et logicielles sur cartes electroniques et moniteurs.'
        ],
        tags: ['Embedded Systems', 'Hardware', 'Troubleshooting']
      },
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Projets issus des CV officiels et de l ancien portfolio HTML.',
    coverImage: '/img/computer-vision.png',
    items: [
      {
        id: 'proj-reakt',
        title: 'Bioreactor AI Optimisation - ReaKt',
        subtitle: 'Hack The Fork',
        period: 'Dec 2025',
        summary:
          'Projet victorieux de hackathon (2e place) avec ReaKt, autopilote de bioreacteur IA parmi les meilleures ecoles d ingenieurs en France.',
        bullets: [
          'Implementation LSTM + MPC pour la dynamique de fermentation.',
          'Simulation et controle temps reel en Python.'
        ],
        tags: ['Python', 'LSTM', 'MPC', 'AI'],
        image: '/img/ReaKt_Presentation.png',
        links: [{ label: 'GitHub', url: 'https://github.com/Gab404/ReaKt' }]
      },
      {
        id: 'proj-everyone',
        title: 'EveryOne - Local LLM Platform with RAG & Fine-Tuning',
        subtitle: 'HackEurope, Stockholm',
        summary:
          'Projet realise pendant HackEurope, cite dans le CV comme le plus grand hackathon d Europe: application privacy-first avec inference LLM 100% locale et pipeline RAG source.',
        bullets: [
          'Stack: React/Vite, FastAPI, llama.cpp, LoRA, Modal.',
          'Ingestion PDF drag-and-drop, deduplication SHA-256, reponses sourcees.'
        ],
        tags: ['React/Vite', 'FastAPI', 'llama.cpp', 'RAG'],
        image: '/img/everyone.png',
        links: [{ label: 'GitHub', url: 'https://github.com/paulChevalier78/everyone' }]
      },
      {
        id: 'proj-speech',
        title: 'On-device Speech Recognition',
        subtitle: 'Embedded AI',
        summary: 'Pipeline de reconnaissance vocale embarquee pour environnements contraints.',
        tags: ['Embedded AI', 'Speech', 'On-device']
      },
      {
        id: 'proj-cv',
        title: 'Computer Vision Projects',
        subtitle: 'Face & Emotion Recognition',
        summary: 'Projets de vision par ordinateur en reconnaissance faciale et emotions.',
        tags: ['Computer Vision', 'Deep Learning'],
        image: '/img/computer-vision.png'
      },
      {
        id: 'proj-ingleague-site',
        title: 'IngLeague.fr',
        summary:
          'Co-fondateur de l association IngLeague: tournois inter-classes (400+ etudiants) et developpement du site web.',
        links: [{ label: 'Visiter le site', url: 'https://ingleague.fr' }],
        tags: ['Association', 'Web', 'Community'],
        image: '/img/ingleague.jpg'
      },
      {
        id: 'proj-bds',
        title: 'BDS ECE Paris - Responsable Tournois',
        summary:
          'Mise en place d evenements multisports etudiants (source: ancien portfolio).',
        links: [{ label: 'Voir Instagram', url: 'https://www.instagram.com/bdsece/' }],
        tags: ['Sport', 'Evenementiel'],
        image: '/img/sport.jpg'
      },
      {
        id: 'proj-ecg-arduino',
        title: 'Electrocardiogramme Arduino',
        summary:
          'Realisation d un electrocardiogramme avec Arduino dans le cadre des projets d ingenierie.',
        tags: ['Arduino', 'Embedded'],
        image: '/img/arduino.jpg'
      },
      {
        id: 'proj-fpga-elevator',
        title: 'Projet FPGA Ascenseur',
        summary: 'Programmation d un systeme d ascenseur sur FPGA (projet academique technique).',
        tags: ['FPGA', 'VHDL'],
        image: '/img/fpga.jpg'
      }
    ]
  },
  {
    id: 'hackathon',
    title: 'Hackathon',
    description: 'Hackathons cites dans les CV avec photos des dossiers hackathon.',
    coverImage: '/hackathon/1765896140097.jpg',
    items: [
      {
        id: 'hack-fork',
        title: 'Hack The Fork',
        period: 'Dec 2025',
        summary:
          'Projet ReaKt: autopilote de bioreacteur IA, 2e place parmi les meilleures ecoles d ingenieurs en France.',
        bullets: ['Role: conception et implementation IA (LSTM/MPC).', 'Resultat: 2e place.'],
        tags: ['Hackathon', 'AI', 'Python'],
        image: '/hackathon/1765896140097.jpg',
        gallery: ['/hackathon/1765896140097.jpg', '/hackathon/1765961375533.jpg', '/hackathon/Certificat.jpg']
      },
      {
        id: 'hack-europe',
        title: 'HackEurope (Stockholm)',
        summary:
          'Developpement de EveryOne (CV: le plus grand hackathon d Europe).',
        bullets: [
          'Role: full-stack IA (React/Vite, FastAPI, local LLM, RAG).',
          'Focus: vie privee, inference locale, citations de sources.'
        ],
        tags: ['Hackathon', 'LLM', 'RAG'],
        image: '/hackathon/1771853886168.jpg',
        gallery: ['/hackathon/1771853886168.jpg', '/hackathon/demo.jpeg', '/hackathon/IMG_0366.jpeg', '/hackathon/IMG_0422.jpeg']
      }
    ]
  },
  {
    id: 'skills',
    title: 'Competences',
    description: 'Competences techniques et transversales extraites des CV officiels.',
    coverImage: '/img/Skills_competences2.jpg',
    items: [
      {
        id: 'skill-tech-1',
        title: 'Competences techniques',
        summary:
          'Apprentissage profond, machine learning, vision par ordinateur, LLMs/RAG, prompt engineering, systemes embarques, FPGA/VHDL, Arduino, Git/GitHub, Linux/Ubuntu.'
      },
      {
        id: 'skill-languages',
        title: 'Langages de programmation',
        summary: 'Python, C, Java, MATLAB, SQL, HTML, CSS, JavaScript, TypeScript.'
      },
      {
        id: 'skill-soft',
        title: 'Competences transversales',
        summary:
          'Travail en equipe, autonomie, resolution de problemes, organisation, gestion de projet, adaptabilite.'
      }
    ]
  },
  {
    id: 'formation',
    title: 'Formation',
    description: 'Parcours academique (CV) + certifications (dossier Certificats).',
    coverImage: '/img/certifications_Competences.jpg',
    items: [
      {
        id: 'edu-ece',
        title: 'ECE Paris Engineering School',
        period: 'Sep 2022 - 2027',
        location: 'Paris, France',
        summary: 'Engineering degree - Artificial Intelligence & Data (expected graduation 2027).',
        bullets: ['Cours: informatique, data, IA, mathematiques avancees, electronique.'],
        tags: ['ECE Paris', 'AI & Data']
      },
      {
        id: 'edu-omnes',
        title: 'Omnes Education London School',
        period: 'Sep 2024 - Dec 2024',
        location: 'London, United Kingdom',
        summary: 'Semestre d echange international - Intelligence Artificielle.',
        bullets: ['Focus mentionnes dans CV: neural networks, MATLAB, probabilites/statistiques, Java/React.'],
        tags: ['Exchange', 'AI']
      },
      {
        id: 'cert-1',
        title: 'Certification Professionnelle - IA Appliquee',
        subtitle: 'Dossier Certificats',
        summary:
          "Certification orientee application pratique de l'IA: modeles predictifs, evaluation de performance et deploiement de solutions.",
        image: '/certificats/certificat_1.png',
        logo: '/img/datascientest.jpg'
      },
      {
        id: 'cert-2',
        title: 'Certification Professionnelle - Methodes Agiles',
        subtitle: 'Dossier Certificats',
        summary:
          'Validation des competences Scrum/Kanban, pilotage de backlog, planification iterative et collaboration equipe.',
        image: '/certificats/certificat_2.png',
        logo: '/img/mooc_gdp.png'
      },
      {
        id: 'cert-toeic',
        title: 'TOEIC 850 - Niveau C1',
        subtitle: 'Certification linguistique',
        period: '2025',
        summary:
          "Certification d'anglais attestant un niveau C1 avec un score TOEIC de 850, valide pour un contexte academique et professionnel international.",
        image: '/certificats/toeic-850-c1.pdf',
        logo: '/img/toeic.png'
      }
    ]
  },
  {
    id: 'langues',
    title: 'Langues',
    description: 'Niveaux de langues extraits des CV officiels.',
    coverImage: '/hackathon/IMG_0422.jpeg',
    items: [
      { id: 'lang-fr', title: 'Francais', summary: 'Langue maternelle' },
      { id: 'lang-en', title: 'Anglais', summary: 'C1 (TOEIC 850)' },
      { id: 'lang-es', title: 'Espagnol', summary: 'B1' }
    ]
  },
  {
    id: 'activites',
    title: 'Activites',
    description: 'Activites extrascolaires citees dans les CV (focus piano/IngLeague/football).',
    coverImage: '/img/ingleague.jpg',
    items: [
      {
        id: 'act-piano',
        title: 'Piano',
        subtitle: 'Discipline, ecoute et precision',
        period: 'Depuis l adolescence',
        summary:
          'Une pratique reguliere qui a structure ma concentration, mon sens du rythme et mon gout du detail.',
        shortDescription:
          'Le piano est mon espace de concentration lente, la ou je travaille la nuance et la regularite.',
        longDescription:
          'Au fil des annees, le piano est devenu plus qu un loisir. C est une pratique qui m a appris a decomposer une difficulte, repeter jusqu a obtenir un geste propre et garder un haut niveau d exigence meme hors contexte academique. Cette logique de progression patiente nourrit directement ma maniere d apprendre et de construire des projets techniques.',
        backgroundImage: '/img/Piano_gif.gif',
        accent: '#d7b16b',
        tags: ['Rigueur', 'Concentration', 'Memorisation', 'Interpretation'],
        bullets: [
          'Travail de morceaux par couches successives: lecture, rythme, nuance, fluidite.',
          'Habitude de repetition reguliere avec attention aux details.',
          'Developpement d une ecoute critique utile dans les phases d iteration.'
        ],
        extraInfos: [
          {
            id: 'resume',
            label: 'Resume',
            eyebrow: 'Apercu',
            title: 'Une pratique qui calme et structure',
            description:
              'Le piano apporte une cadence plus lente et plus exigeante, avec un travail sur la precision, la memoire et l expression.',
            stat: 'Focus long',
            items: ['Travail du detail', 'Ecoute active', 'Regularite']
          },
          {
            id: 'details',
            label: 'Details',
            eyebrow: 'Pendant la lecture',
            title: 'Une logique de progression tres methodique',
            description:
              'J aborde souvent un morceau comme un probleme a resoudre: decoupage, repetition ciblee, puis assemblage progressif jusqu a un rendu fluide.',
            items: [
              'Lecture lente et decomposition des passages complexes.',
              'Stabilisation du rythme avant la vitesse.',
              'Recherche d une interpretation propre plutot qu une execution approximative.'
            ]
          },
          {
            id: 'competences',
            label: 'Competences',
            eyebrow: 'Skills transferes',
            title: 'Des reflexes utiles au travail technique',
            description:
              'Le piano m a appris a rester patient, a corriger sans brusquer et a viser une execution nette plutot qu une solution seulement fonctionnelle.',
            items: ['Discipline', 'Attention aux details', 'Gestion de la frustration', 'Memorisation']
          },
          {
            id: 'impact',
            label: 'Impact',
            eyebrow: 'Ce que ca change',
            title: 'Un levier de concentration durable',
            description:
              'Cette activite agit comme un contrepoint aux environnements rapides. Elle renforce ma capacite a rester pose, concentre et exigeant dans la duree.',
            items: ['Meilleure endurance cognitive', 'Calme dans l execution', 'Exigence sur la qualite finale']
          },
          {
            id: 'timeline',
            label: 'Timeline',
            eyebrow: 'Progression',
            title: 'Une pratique installee dans le temps',
            description:
              'Le piano m accompagne depuis plusieurs annees, avec une progression construite autour de la constance plutot que de pics d intensite.',
            items: ['Apprentissage progressif', 'Sessions regulieres', 'Repertoire enrichi avec le temps'],
            stat: 'Long terme'
          }
        ]
      },
      {
        id: 'act-ingleague',
        subtitle: 'Co-fondateur et co-president',
        title: 'IngLeague',
        period: 'Mar 2024 - Aug 2025',
        summary:
          'Association etudiante construite autour de tournois inter-promotions, de l organisation d evenements et d une vraie dynamique de communaute.',
        shortDescription:
          'Une experience de construction de communaute, d execution terrain et de coordination a grande echelle.',
        longDescription:
          'IngLeague a ete un terrain concret de leadership et de gestion de projet. Il a fallu structurer une association, embarquer les etudiants, coordonner les tournois, faire circuler l information et porter une image claire. J y ai appris a transformer une idee simple en experience collective visible, avec une execution fiable et un vrai sens du rythme evenementiel.',
        backgroundImage: '/img/ingleague.jpg',
        accent: '#e50914',
        links: [{ label: 'IngLeague.fr', url: 'https://ingleague.fr' }],
        tags: ['Association', 'Leadership', 'Evenementiel', 'Community Building'],
        bullets: [
          'Organisation de tournois inter-promotions impliquant plus de 400 etudiants.',
          'Co-pilotage de la communication, de la logistique et de la dynamique associative.',
          'Contribution au developpement du site vitrine et de la presence digitale.'
        ],
        extraInfos: [
          {
            id: 'resume',
            label: 'Resume',
            eyebrow: 'Serie originale',
            title: 'Construire une communaute qui se mobilise',
            description:
              'IngLeague a donne une forme concrete a une ambition simple: faire jouer ensemble plusieurs promotions autour d un format lisible, competitif et federateur.',
            stat: '400+ etudiants',
            items: ['Association co-fondee', 'Tournois inter-promotions', 'Presence web']
          },
          {
            id: 'details',
            label: 'Details',
            eyebrow: 'Behind the scenes',
            title: 'Organisation, communication et execution',
            description:
              'L enjeu n etait pas seulement de lancer un evenement, mais de rendre l experience claire et fluide pour tous les participants, du planning jusqu aux resultats.',
            items: [
              'Coordination des formats de tournoi et des inscriptions.',
              'Animation de la communaute et diffusion des informations.',
              'Pilotage des priorites entre logistique, visibilite et execution.'
            ]
          },
          {
            id: 'competences',
            label: 'Competences',
            eyebrow: 'Role acquis',
            title: 'Un vrai exercice de leadership terrain',
            description:
              'Cette experience a renforce mes reflexes de coordination, ma capacite a arbitrer vite et mon sens de la responsabilite dans un cadre collectif.',
            items: ['Leadership', 'Gestion de projet', 'Communication', 'Coordination d equipe']
          },
          {
            id: 'impact',
            label: 'Impact',
            eyebrow: 'Resultats',
            title: 'Une initiative visible et adoptee',
            description:
              'IngLeague a reussi a installer une dynamique identifiable sur le campus, avec une participation large et une image differenciante.',
            items: ['400+ participants cumules', 'Format memorisable', 'Engagement etudiant durable'],
            stat: 'Portee campus'
          },
          {
            id: 'timeline',
            label: 'Timeline',
            eyebrow: 'Evolution',
            title: 'Du lancement a la consolidation',
            description:
              'Le projet a passe plusieurs etapes: ideation, structuration associative, execution des tournois puis consolidation de la visibilite en ligne.',
            items: ['Lancement de l association', 'Mise en place des evenements', 'Developpement du site'],
            stat: '2024 -> 2025'
          },
          {
            id: 'links',
            label: 'Liens',
            eyebrow: 'Acces direct',
            title: 'Explorer la vitrine publique',
            description:
              'Le site IngLeague.fr permet de prolonger la lecture avec la presence web du projet.',
            link: { label: 'Visiter IngLeague.fr', url: 'https://ingleague.fr' }
          }
        ]
      },
      {
        id: 'act-football',
        subtitle: 'Gaulois de Sannois',
        title: 'Football americain',
        period: '2019 - 2022',
        summary:
          'Une pratique competitive qui a renforce la discipline collective, le sens de l engagement et la capacite a tenir un role dans une equipe.',
        shortDescription:
          'Le terrain m a appris la rigueur collective, l intensite et la confiance dans le groupe.',
        longDescription:
          'Le football americain a ete une ecole tres concrete d exigence physique et mentale. On y apprend a se preparer, executer sous pression, respecter un schema collectif et rester fiable pour l equipe. Cette culture de responsabilite partagee et de preparation avant l action me suit encore dans les projets ou la coordination compte autant que la performance individuelle.',
        backgroundImage: '/img/foots_us_gif.gif',
        accent: '#b53c2f',
        tags: ['Sport', 'Competition', 'Esprit d equipe', 'Discipline'],
        bullets: [
          'Champion Ile-de-France 2022 avec les Gaulois de Sannois.',
          'Pratique dans un cadre competitif avec entrainements reguliers.',
          'Habitude de preparer, executer et corriger collectivement.'
        ],
        extraInfos: [
          {
            id: 'resume',
            label: 'Resume',
            eyebrow: 'Match en cours',
            title: 'Un sport d execution et de confiance',
            description:
              'Le football americain demande de la preparation, de la discipline et une lecture rapide de la situation dans un cadre tres collectif.',
            stat: 'Champion 2022',
            items: ['Engagement equipe', 'Preparation tactique', 'Execution sous pression']
          },
          {
            id: 'details',
            label: 'Details',
            eyebrow: 'Game plan',
            title: 'La performance vient du collectif',
            description:
              'Chaque sequence rappelle qu une action reussie depend d un alignement clair entre preparation, role individuel et execution synchronisee.',
            items: [
              'Respect des schemas de jeu.',
              'Discipline dans l effort et la repetition.',
              'Capacite a rester lucide dans l intensite.'
            ]
          },
          {
            id: 'competences',
            label: 'Competences',
            eyebrow: 'Reflexes developpes',
            title: 'Des acquis directement transferables',
            description:
              'Cette pratique a solidifie des competences tres utiles en contexte projet: fiabilite, resilience et sens du collectif.',
            items: ['Esprit d equipe', 'Resilience', 'Gestion de l effort', 'Discipline']
          },
          {
            id: 'impact',
            label: 'Impact',
            eyebrow: 'Resultat marquant',
            title: 'Un titre regional comme repere',
            description:
              'Le titre de champion Ile-de-France 2022 symbolise une periode ou la rigueur et l engagement collectif ont produit un resultat tangible.',
            items: ['Champion Ile-de-France 2022', 'Culture du resultat', 'Preparation exigeante']
          },
          {
            id: 'timeline',
            label: 'Timeline',
            eyebrow: 'Saisons',
            title: 'Trois annees de progression competitive',
            description:
              'Entre 2019 et 2022, la pratique s est structuree autour des entrainements, des matchs et d une progression collective vers la performance.',
            items: ['2019: integration', '2020-2021: progression', '2022: titre regional']
          }
        ]
      },
      {
        id: 'act-lol',
        subtitle: 'Competition en solo queue',
        title: 'League of Legends',
        period: 'Feb 2020 - Present',
        summary:
          'Une pratique competitive en ligne qui m a appris la prise de decision rapide, l analyse de meta et l amelioration continue.',
        shortDescription:
          'Un terrain d analyse, d adaptation et de constance dans la progression.',
        longDescription:
          'League of Legends est un environnement tres exigeant en lecture de jeu, en adaptation et en remise en question. Atteindre Master m a demande de comprendre des systemes complexes, d optimiser des details repetitifs et de maintenir un niveau de concentration regulier sur la duree. C est une experience de competition qui combine analyse, execution et apprentissage continu.',
        accent: '#8a6cff',
        tags: ['Competition', 'Decision making', 'Analyse', 'Top 1%'],
        bullets: [
          'Atteinte du rang Master, soit environ le top 1% des joueurs.',
          'Analyse de la meta, des erreurs et des situations de prise de decision rapide.',
          'Progression sur la duree via repetition, revue et adaptation.'
        ],
        extraInfos: [
          {
            id: 'resume',
            label: 'Resume',
            eyebrow: 'Classement',
            title: 'Une pratique competitive a haut niveau',
            description:
              'Le jeu m interesse pour ce qu il exige en lecture, adaptation et constance, bien au dela de la simple execution mecanique.',
            stat: 'Master / Top 1%',
            items: ['Analyse rapide', 'Decision making', 'Apprentissage continu']
          },
          {
            id: 'details',
            label: 'Details',
            eyebrow: 'Meta',
            title: 'Comprendre avant de performer',
            description:
              'La progression passe par une boucle exigeante: analyser ses erreurs, lire les tendances, ajuster ses choix puis reexecuter proprement.',
            items: [
              'Lecture de draft et de macro-game.',
              'Adaptation a des environnements qui changent souvent.',
              'Revue critique des parties pour progresser.'
            ]
          },
          {
            id: 'competences',
            label: 'Competences',
            eyebrow: 'Skills developpes',
            title: 'Une ecole d adaptation rapide',
            description:
              'Cette activite a renforce ma capacite a prioriser vite, a absorber du feedback et a maintenir une progression mesurable sur le temps long.',
            items: ['Analyse systemique', 'Prise de decision', 'Adaptabilite', 'Competition']
          },
          {
            id: 'impact',
            label: 'Impact',
            eyebrow: 'Niveau atteint',
            title: 'Un rang qui valide la constance',
            description:
              'Le palier Master traduit une progression durable dans un environnement tres selectif, ou le niveau moyen est eleve et la marge d erreur faible.',
            items: ['Top 1%', 'Regularite', 'Progression mesuree'],
            stat: 'Haute elo'
          },
          {
            id: 'timeline',
            label: 'Timeline',
            eyebrow: 'Saisons',
            title: 'Une progression construite sur plusieurs annees',
            description:
              'Depuis 2020, l objectif n a jamais ete de jouer au hasard, mais de progresser par etapes jusqu a un niveau competitif solide.',
            items: ['2020: apprentissage', 'Saisons suivantes: progression', 'Aujourd hui: Master']
          }
        ]
      }
    ]
  },
  {
    id: 'reference',
    title: 'References',
    description: 'Lettres de recommandation (FR/EN) avec extraits et telechargement.',
    coverImage: '/reference/john.jpg',
    items: [
      {
        id: 'ref-john-en',
        title: 'Letter of Recommendation (EN)',
        subtitle: 'Dr John Balasuriya',
        period: 'May 19, 2025',
        summary:
          'Extract: "For his Artificial Intelligence project with me, Elias developed a face recognition system... over 100 students."',
        image: '/reference/john.jpg',
        links: [{ label: 'Telecharger la lettre (EN)', url: '/reference/reference_john_en.pdf' }],
        tags: ['Artificial Intelligence', 'London Semester', 'Reference']
      },
      {
        id: 'ref-morgado-fr',
        title: 'Lettre de recommandation (FR)',
        subtitle: 'Gabriel Morgado',
        period: '27 mars 2023',
        summary:
          'Extrait: "Elias Moussouni s est classe systematiquement dans le top 5%... C est un excellent etudiant."',
        image: '/reference/morgado.jpg',
        links: [{ label: 'Telecharger la lettre (FR)', url: '/reference/reference_morgado_fr.pdf' }],
        tags: ['Top 5%', 'Excellence academique', 'Reference']
      }
    ]
  },  {
    id: 'contact',
    title: 'Contact',
    description: 'Coordonnees disponibles dans les CV officiels.',
    coverImage: '/img/contact_Photo.jfif',
    items: [
      {
        id: 'contact-main',
        title: 'Elias Moussouni',
        summary: 'Email: elias.moussouni@edu.ece.fr | Mobile: +33 6 95 12 16 86',
        links: [
          {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/elias-moussouni-075410241/'
          }
        ]
      }
    ]
  }
];
