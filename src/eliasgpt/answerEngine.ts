import { portfolioSections, PortfolioItem } from '../portfolio/portfolioData';
import { AssistantAnswer, ChatMessage } from './types';
import { searchKnowledge } from './retrieval';

type Intent =
  | 'greeting'
  | 'self_intro'
  | 'current_role'
  | 'projects'
  | 'project_proud'
  | 'experience'
  | 'skills'
  | 'education'
  | 'languages'
  | 'activities'
  | 'contact'
  | 'references'
  | 'generic';

const HUMAN_FALLBACK =
  'Je peux surtout repondre sur mon experience, mes projets, ma formation, mes activites et mes coordonnees. Si tu veux sortir de ce cadre, contacte ma version humaine au 06 95 12 16 86.';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasAny = (text: string, patterns: string[]) => patterns.some((pattern) => text.includes(pattern));

const sectionById = (id: string) => portfolioSections.find((section) => section.id === id);

const experiences = sectionById('experience')?.items ?? [];
const projects = sectionById('projects')?.items ?? [];
const hackathons = sectionById('hackathon')?.items ?? [];
const skills = sectionById('skills')?.items ?? [];
const education = sectionById('formation')?.items ?? [];
const languages = sectionById('langues')?.items ?? [];
const activities = sectionById('activites')?.items ?? [];
const references = sectionById('reference')?.items ?? [];
const contact = sectionById('contact')?.items?.[0] ?? null;

const entityAliases: Array<{
  key: string;
  aliases: string[];
  sections: Array<'experience' | 'projects' | 'hackathon' | 'activities' | 'formation' | 'reference'>;
}> = [
  { key: 'sagemcom', aliases: ['sagemcom'], sections: ['experience'] },
  { key: 'reakt', aliases: ['reakt', 'bioreactor', 'bioreacteur'], sections: ['experience', 'projects', 'hackathon'] },
  { key: 'everyone', aliases: ['everyone', 'hackeurope', 'local llm'], sections: ['projects', 'hackathon'] },
  { key: 'videlio', aliases: ['videlio', 'videlio events'], sections: ['experience'] },
  { key: 'ingleague', aliases: ['ingleague', 'association'], sections: ['projects', 'activities'] },
  { key: 'football', aliases: ['football', 'football americain', 'gaulois'], sections: ['activities'] },
  { key: 'piano', aliases: ['piano', 'musique'], sections: ['activities'] },
  { key: 'lol', aliases: ['lol', 'league of legends', 'league'], sections: ['activities'] },
  { key: 'ece', aliases: ['ece', 'ece paris'], sections: ['formation'] },
  { key: 'omnes', aliases: ['omnes', 'london school', 'london'], sections: ['formation'] },
  { key: 'john', aliases: ['john', 'balasuriya', 'recommendation english'], sections: ['reference'] },
  { key: 'morgado', aliases: ['morgado', 'recommendation francaise', 'lettre'], sections: ['reference'] }
];

function findEntity(question: string, history: ChatMessage[] = []) {
  const q = normalize(question);
  const direct = entityAliases.find((entry) => hasAny(q, entry.aliases.map(normalize)));
  if (direct) {
    return direct.key;
  }

  if (!/\b(ca|cela|ce projet|celui ci|avant ca|et avant|en parallele|la bas|cette experience)\b/.test(q)) {
    return null;
  }

  for (let index = history.length - 1; index >= 0; index -= 1) {
    const entity = history[index].meta?.entity;
    if (entity) {
      return entity;
    }
  }

  return null;
}

function findItemsForEntity(entity: string | null) {
  if (!entity) {
    return [];
  }

  const aliasEntry = entityAliases.find((entry) => entry.key === entity);
  if (!aliasEntry) {
    return [];
  }

  const buckets: PortfolioItem[] = [];
  aliasEntry.sections.forEach((sectionId) => {
    const items =
      sectionId === 'experience'
        ? experiences
        : sectionId === 'projects'
          ? projects
          : sectionId === 'hackathon'
            ? hackathons
            : sectionId === 'activities'
              ? activities
              : sectionId === 'formation'
                ? education
                : references;

    const match = items.find((item) => {
      const haystack = normalize(
        [item.id, item.title, item.subtitle, item.summary, item.tags?.join(' ')].filter(Boolean).join(' ')
      );
      return aliasEntry.aliases.some((alias) => haystack.includes(normalize(alias)));
    });

    if (match) {
      buckets.push(match);
    }
  });

  return buckets;
}

function detectIntent(question: string): Intent {
  const q = normalize(question);

  if (/^(bonjour|salut|hello|hi|bonsoir)\b/.test(q)) return 'greeting';
  if (/(parle moi de toi|presente toi|qui es tu|presentation|resume ton parcours)/.test(q)) return 'self_intro';
  if (/(actuellement|en ce moment|aujourd hui|role actuel|ce que tu fais en ce moment|que fais tu actuellement|what are you doing now)/.test(q)) return 'current_role';
  if (/(projet dont tu es le plus fier|projet le plus fier|plus fier|plus gros projet|projet prefere)/.test(q)) return 'project_proud';
  if (/(projet|project|hackathon|reakt|everyone)/.test(q)) return 'projects';
  if (/(experience|alternance|apprentissage|stage|job|sagemcom|videlio)/.test(q)) return 'experience';
  if (/(competence|skill|stack|langage|langages|python|typescript|java|sql|soft skills|points forts techniques)/.test(q)) return 'skills';
  if (/(formation|education|ecole|diplome|ece|omnes|london school)/.test(q)) return 'education';
  if (/(langues|anglais|francais|espagnol|toeic|language)/.test(q)) return 'languages';
  if (/(activite|association|ingleague|football|piano|league of legends|lol)/.test(q)) return 'activities';
  if (/(contact|linkedin|email|mail|telephone|numero|joindre)/.test(q)) return 'contact';
  if (/(reference|recommandation|lettre)/.test(q)) return 'references';
  return 'generic';
}

function buildSources(items: Array<{ sectionId: string; item: PortfolioItem }>) {
  return items.map(({ sectionId, item }) => ({
    label: `${sectionById(sectionId)?.title || sectionId} • ${item.title}`,
    route: `/section/${sectionId}`
  }));
}

function asMeta(intent: Intent, confidence: 'low' | 'medium' | 'high', entity: string | null, sections: string[], sources: Array<{ label: string; route: string }>) {
  return {
    confidence,
    intent,
    entity: entity || undefined,
    sections,
    sources
  };
}

function answerGreeting(): AssistantAnswer {
  return {
    answer:
      'Salut, je suis EliasGPT. Je peux te repondre de facon fiable sur mon experience actuelle, mes projets, mes competences, ma formation, mes activites et mon contact.',
    suggestions: [
      'Que fais-tu actuellement ?',
      'Quel projet te rend le plus fier ?',
      'Quelles sont tes competences principales ?'
    ],
    meta: asMeta('greeting', 'high', null, ['Experience', 'Projects', 'Skills'], [])
  };
}

function answerSelfIntro(): AssistantAnswer {
  const current = experiences[0];
  const side = experiences[1];
  const reakt = projects.find((item) => item.id === 'proj-reakt');
  const everyone = projects.find((item) => item.id === 'proj-everyone');

  const answer = [
    `Je suis Elias Moussouni, actuellement ${current?.title || 'ingenieur IA'}${current?.subtitle ? ` chez ${current.subtitle}` : ''}.`,
    'Je travaille surtout sur l IA appliquee, avec un focus computer vision, assistants RAG et sujets systemes.',
    side ? `En parallele, j ai aussi une dimension entrepreneuriale avec ${side.subtitle || side.title}.` : '',
    reakt && everyone ? `Cote projets marquants, je peux notamment parler de ${reakt.title} et de ${everyone.title}.` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return {
    answer,
    suggestions: ['Que fais-tu actuellement ?', 'Quel projet te rend le plus fier ?', 'Pourquoi l IA appliquee ?'],
    meta: asMeta(
      'self_intro',
      'high',
      null,
      ['Experience', 'Projects'],
      buildSources(
        [current, reakt, everyone]
          .filter(Boolean)
          .map((item) => ({ sectionId: item && projects.includes(item) ? 'projects' : 'experience', item: item as PortfolioItem }))
      )
    )
  };
}

function answerCurrentRole(): AssistantAnswer {
  const current = experiences[0];
  const sideProject = experiences[1];

  const answer = [
    current
      ? `En ce moment, je suis ${current.title}${current.subtitle ? ` chez ${current.subtitle}` : ''}${current.period ? ` (${current.period})` : ''}.`
      : '',
    current?.summary || '',
    sideProject
      ? `En parallele, je porte aussi ${sideProject.subtitle || sideProject.title}, avec un axe plus entrepreneurial et strategie produit.`
      : ''
  ]
    .filter(Boolean)
    .join(' ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Sur quoi travailles-tu chez Sagemcom ?', 'Quelle experience t a le plus fait progresser ?', 'Tu peux resumer ton parcours ?'],
    meta: asMeta(
      'current_role',
      answer ? 'high' : 'low',
      current?.subtitle ? normalize(current.subtitle) : null,
      ['Experience'],
      buildSources(
        [current, sideProject]
          .filter(Boolean)
          .map((item) => ({ sectionId: 'experience', item: item as PortfolioItem }))
      )
    )
  };
}

function answerProjectProud(): AssistantAnswer {
  const reakt = projects.find((item) => item.id === 'proj-reakt');
  if (!reakt) {
    return {
      answer: HUMAN_FALLBACK,
      suggestions: ['Tu peux me parler de ReaKt ?', 'Quel etait ton role sur EveryOne ?', 'Quel projet te represente le mieux ?'],
      meta: asMeta('project_proud', 'low', null, ['Projects'], [])
    };
  }

  return {
    answer: `Le projet dont je suis le plus fier est ${reakt.title}. Il combine un vrai niveau technique avec une execution concrete en hackathon, autour d un autopilote de bioreacteur IA avec approche LSTM et MPC. C est aussi un projet marquant parce qu il a ete distingue avec une 2e place.`,
    suggestions: ['Quel etait ton role sur ReaKt ?', 'Tu peux me parler de EveryOne ?', 'Pourquoi ce projet te represente bien ?'],
    meta: asMeta('project_proud', 'high', 'reakt', ['Projects', 'Hackathon'], buildSources([
      { sectionId: 'projects', item: reakt }
    ]))
  };
}

function answerEntitySummary(intent: Intent, entity: string | null): AssistantAnswer | null {
  const items = findItemsForEntity(entity);
  if (!items.length) {
    return null;
  }

  const first = items[0];
  const answer = [
    `${first.title}${first.subtitle ? `, ${first.subtitle}` : ''}${first.period ? ` (${first.period})` : ''}.`,
    first.summary,
    first.bullets?.[0] || ''
  ]
    .filter(Boolean)
    .join(' ');

  const sectionIds = Array.from(
    new Set(
      items.map((item) => {
        if (experiences.includes(item)) return 'experience';
        if (projects.includes(item)) return 'projects';
        if (hackathons.includes(item)) return 'hackathon';
        if (activities.includes(item)) return 'activites';
        if (education.includes(item)) return 'formation';
        return 'reference';
      })
    )
  );

  return {
    answer,
    suggestions:
      intent === 'projects'
        ? ['Quel etait ton role exact ?', 'Quelles technos as-tu utilisees ?', 'Quel impact a eu ce projet ?']
        : intent === 'experience'
          ? ['Quel etait ton role exact ?', 'Quelles competences y as-tu developpees ?', 'Qu as-tu appris dans cette experience ?']
          : ['Tu peux detailler ?', 'Quel impact cela a eu ?', 'Qu as-tu retenu de cette experience ?'],
    meta: asMeta(
      intent,
      'high',
      entity,
      sectionIds.map((id) => sectionById(id)?.title || id),
      buildSources(
        items.map((item) => {
          const sectionId = experiences.includes(item)
            ? 'experience'
            : projects.includes(item)
              ? 'projects'
              : hackathons.includes(item)
                ? 'hackathon'
                : activities.includes(item)
                  ? 'activites'
                  : education.includes(item)
                    ? 'formation'
                    : 'reference';
          return { sectionId, item };
        })
      )
    )
  };
}

function answerProjects(entity: string | null): AssistantAnswer {
  const entityAnswer = answerEntitySummary('projects', entity);
  if (entityAnswer) {
    return entityAnswer;
  }

  const reakt = projects.find((item) => item.id === 'proj-reakt');
  const everyone = projects.find((item) => item.id === 'proj-everyone');
  const answer = [
    reakt ? `${reakt.title}: ${reakt.summary}` : '',
    everyone ? `${everyone.title}: ${everyone.summary}` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Quel projet te rend le plus fier ?', 'Tu peux me parler de ReaKt ?', 'Quel etait ton role sur EveryOne ?'],
    meta: asMeta(
      'projects',
      answer ? 'medium' : 'low',
      null,
      ['Projects', 'Hackathon'],
      buildSources(
        [reakt, everyone]
          .filter(Boolean)
          .map((item) => ({ sectionId: 'projects', item: item as PortfolioItem }))
      )
    )
  };
}

function answerExperience(entity: string | null): AssistantAnswer {
  const entityAnswer = answerEntitySummary('experience', entity);
  if (entityAnswer) {
    return entityAnswer;
  }

  const current = experiences[0];
  const previous = experiences[2];
  const answer = [
    current ? `Actuellement, je suis ${current.title}${current.subtitle ? ` chez ${current.subtitle}` : ''}. ${current.summary}` : '',
    previous ? `Avant cela, j ai aussi fait ${previous.title}${previous.subtitle ? ` chez ${previous.subtitle}` : ''}.` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Que fais-tu actuellement ?', 'Sur quoi travailles-tu chez Sagemcom ?', 'Quelle experience t a le plus fait progresser ?'],
    meta: asMeta(
      'experience',
      answer ? 'high' : 'low',
      entity,
      ['Experience'],
      buildSources(
        [current, previous]
          .filter(Boolean)
          .map((item) => ({ sectionId: 'experience', item: item as PortfolioItem }))
      )
    )
  };
}

function answerSkills(question: string): AssistantAnswer {
  const q = normalize(question);
  const isLanguages = /(langage|langages|python|typescript|java|sql|matlab|c\b)/.test(q);
  const isSoft = /(soft|transvers|teamwork|autonomie|organisation|leadership|problem)/.test(q);

  const selected = isLanguages ? skills[1] : isSoft ? skills[2] : skills[0];

  return {
    answer: selected?.summary || HUMAN_FALLBACK,
    suggestions: ['Quel est ton stack principal ?', 'Quelles competences veux-tu approfondir ?', 'Tu codes surtout en quels langages ?'],
    meta: asMeta('skills', selected ? 'high' : 'low', null, ['Competences'], selected ? buildSources([{ sectionId: 'skills', item: selected }]) : [])
  };
}

function answerEducation(entity: string | null): AssistantAnswer {
  const entityAnswer = answerEntitySummary('education', entity);
  if (entityAnswer) {
    return entityAnswer;
  }

  const main = education.filter((item) => item.id.startsWith('edu-'));
  const answer = main.map((item) => `${item.title}${item.period ? ` (${item.period})` : ''}. ${item.summary}`).join(' ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Tu peux me parler de l ECE ?', 'Pourquoi ce parcours IA ?', 'Qu as-tu retenu de ton exchange a Londres ?'],
    meta: asMeta(
      'education',
      answer ? 'high' : 'low',
      entity,
      ['Formation'],
      buildSources(main.map((item) => ({ sectionId: 'formation', item })))
    )
  };
}

function answerLanguages(): AssistantAnswer {
  const answer = languages.map((item) => `${item.title}: ${item.summary}`).join(' | ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Quel est ton niveau d anglais ?', 'As-tu un TOEIC ?', 'Quelles langues parles-tu ?'],
    meta: asMeta(
      'languages',
      answer ? 'high' : 'low',
      null,
      ['Langues'],
      buildSources(languages.map((item) => ({ sectionId: 'langues', item })))
    )
  };
}

function answerActivities(entity: string | null): AssistantAnswer {
  const entityAnswer = answerEntitySummary('activities', entity);
  if (entityAnswer) {
    return entityAnswer;
  }

  const answer = activities
    .slice(0, 4)
    .map((item) => `${item.title}${item.period ? ` (${item.period})` : ''}: ${item.summary}`)
    .join(' ');

  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Quel role avais-tu dans IngLeague ?', 'Qu est-ce que le sport t a appris ?', 'Depuis quand fais-tu du piano ?'],
    meta: asMeta(
      'activities',
      answer ? 'high' : 'low',
      entity,
      ['Activites'],
      buildSources(activities.map((item) => ({ sectionId: 'activites', item })))
    )
  };
}

function answerContact(): AssistantAnswer {
  if (!contact) {
    return {
      answer: HUMAN_FALLBACK,
      suggestions: ['Quel est ton email ?', 'Quel est ton LinkedIn ?', 'Comment te joindre rapidement ?'],
      meta: asMeta('contact', 'low', null, ['Contact'], [])
    };
  }

  const answer = contact.links?.[0]?.url
    ? `${contact.summary}. Tu peux aussi me joindre sur LinkedIn: ${contact.links[0].url}`
    : contact.summary;

  return {
    answer,
    suggestions: ['Quel est ton LinkedIn ?', 'Quel est ton email ?', 'Comment te joindre rapidement ?'],
    meta: asMeta('contact', 'high', null, ['Contact'], buildSources([{ sectionId: 'contact', item: contact }]))
  };
}

function answerReferences(entity: string | null): AssistantAnswer {
  const entityAnswer = answerEntitySummary('references', entity);
  if (entityAnswer) {
    return entityAnswer;
  }

  const answer = references.map((item) => `${item.title}: ${item.summary}`).join(' ');
  return {
    answer: answer || HUMAN_FALLBACK,
    suggestions: ['Qui t a recommande ?', 'As-tu une lettre en anglais ?', 'Que disent tes references ?'],
    meta: asMeta(
      'references',
      answer ? 'medium' : 'low',
      entity,
      ['References'],
      buildSources(references.map((item) => ({ sectionId: 'reference', item })))
    )
  };
}

function answerGeneric(question: string): AssistantAnswer {
  const results = searchKnowledge(question, 3);
  if (!results.length || results[0].score < 0.45) {
    return {
      answer: HUMAN_FALLBACK,
      suggestions: ['Que fais-tu actuellement ?', 'Quel projet te rend le plus fier ?', 'Quelles sont tes competences principales ?'],
      meta: asMeta('generic', 'low', null, [], [])
    };
  }

  const answer = results
    .slice(0, 2)
    .map((result) => result.doc.summary || result.doc.content)
    .filter(Boolean)
    .join(' ');

  return {
    answer,
    suggestions: ['Peux-tu preciser sur quelle section tu veux aller ?', 'Parle-moi de ton experience actuelle', 'Quel projet te rend le plus fier ?'],
    meta: {
      confidence: results[0].score > 1 ? 'medium' : 'low',
      intent: 'generic',
      sections: Array.from(new Set(results.map((result) => result.doc.sectionTitle))),
      sources: results.map((result) => ({
        label: `${result.doc.sectionTitle} • ${result.doc.title}`,
        route: result.doc.sourceRoute
      }))
    }
  };
}

export function generateAssistantAnswer(
  question: string,
  options?: {
    history?: ChatMessage[];
  }
): AssistantAnswer {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    return {
      answer: 'Je peux repondre a tes questions sur mon parcours, mes projets, mes competences, mes activites et mon contact.',
      suggestions: ['Que fais-tu actuellement ?', 'Quel projet te rend le plus fier ?', 'Comment te contacter ?'],
      meta: asMeta('generic', 'high', null, ['Experience', 'Projects', 'Contact'], [])
    };
  }

  const history = options?.history ?? [];
  const intent = detectIntent(cleanQuestion);
  const entity = findEntity(cleanQuestion, history);

  switch (intent) {
    case 'greeting':
      return answerGreeting();
    case 'self_intro':
      return answerSelfIntro();
    case 'current_role':
      return answerCurrentRole();
    case 'project_proud':
      return answerProjectProud();
    case 'projects':
      return answerProjects(entity);
    case 'experience':
      return answerExperience(entity);
    case 'skills':
      return answerSkills(cleanQuestion);
    case 'education':
      return answerEducation(entity);
    case 'languages':
      return answerLanguages();
    case 'activities':
      return answerActivities(entity);
    case 'contact':
      return answerContact();
    case 'references':
      return answerReferences(entity);
    default:
      return answerGeneric(cleanQuestion);
  }
}
