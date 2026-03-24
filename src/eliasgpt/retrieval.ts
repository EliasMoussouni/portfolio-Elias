import { buildKnowledgeBase } from './knowledgeBase';
import { ChatMessage, RetrievalSummary, SearchResult } from './types';

const corpus = buildKnowledgeBase();

export type Intent = RetrievalSummary['intent'];

const STOPWORDS = new Set([
  'le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'en', 'a', 'au', 'aux', 'je', 'tu', 'il', 'elle',
  'nous', 'vous', 'ils', 'elles', 'me', 'moi', 'toi', 'te', 'se', 'son', 'sa', 'ses', 'mon', 'ma', 'mes', 'ton',
  'ta', 'tes', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs', 'que', 'qui', 'quoi', 'dont', 'ou', 'est',
  'suis', 'es', 'sur', 'dans', 'pour', 'par', 'avec', 'sans', 'comment', 'quand', 'pourquoi', 'peux', 'peut',
  'fais', 'faire', 'parle', 'parler', 'parlez', 'peux', 'avoir', 'etre', 'about', 'tell', 'you', 'your', 'the',
  'an', 'to', 'of', 'in', 'on', 'for', 'from', 'and', 'is', 'are', 'my', 'me', 'do', 'does'
]);

const SECTION_BASE_WEIGHT: Record<string, number> = {
  experience: 1.08,
  projects: 1.05,
  hackathon: 0.98,
  skills: 1,
  formation: 0.95,
  langues: 0.88,
  activites: 0.9,
  contact: 0.97
};

const INTENT_SECTIONS: Record<Intent, string[]> = {
  self_intro: ['experience', 'skills', 'projects', 'contact', 'formation'],
  contact: ['contact'],
  experience: ['experience', 'formation'],
  projects: ['projects', 'hackathon'],
  skills: ['skills'],
  education: ['formation'],
  languages: ['langues'],
  activities: ['activites'],
  rh_interview: ['experience', 'projects', 'skills', 'formation', 'activites', 'contact', 'hackathon'],
  generic: ['experience', 'projects', 'skills', 'formation', 'contact', 'hackathon', 'activites']
};

const SYNONYM_MAP: Record<string, string[]> = {
  ia: ['ai', 'machine', 'learning', 'ml', 'rag', 'llm'],
  ai: ['ia', 'machine', 'learning', 'ml'],
  poste: ['role', 'job', 'mission'],
  job: ['poste', 'role', 'mission'],
  alternance: ['apprentissage', 'stage', 'experience'],
  apprentissage: ['alternance', 'stage'],
  projet: ['project', 'hackathon', 'produit'],
  project: ['projet', 'hackathon'],
  contact: ['email', 'mail', 'telephone', 'numero', 'linkedin'],
  telephone: ['contact', 'numero', 'phone'],
  sport: ['football', 'activites', 'ingleague'],
  activites: ['piano', 'football', 'ingleague', 'lol', 'association'],
  association: ['ingleague', 'activites'],
  musique: ['music', 'piano'],
  piano: ['musique'],
  entretien: ['rh', 'recruteur', 'candidature'],
  recruteur: ['entretien', 'rh'],
  pressure: ['pression', 'stress', 'deadline'],
  pression: ['stress', 'deadline']
};

const RH_PATTERN = /(entretien|rh|recruteur|recruteuse|candidature|postuler|postule|pourquoi vous|pourquoi toi|qualites?|defauts?|defis?|echec|conflit|pression|deadline|stress|5 ans|forces?|axes d amelioration|salaire|pretentions?|manager ideal|travail en equipe|leadership|revue de code|ci cd|dette technique)/;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(' ')
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));

const expandTokens = (tokens: string[]): string[] => {
  const expanded = new Set<string>(tokens);
  tokens.forEach((token) => {
    const synonyms = SYNONYM_MAP[token];
    synonyms?.forEach((synonym) => expanded.add(synonym));
  });
  return Array.from(expanded);
};

const getRecentHistoryText = (history: ChatMessage[] = []): string =>
  history
    .slice(-4)
    .map((entry) => entry.content)
    .join(' ');

export function detectIntent(query: string): Intent {
  const q = normalize(query);

  if (/(parle .* toi|presente toi|qui es tu|tell me about yourself|about you|presentation)/.test(q)) {
    return 'self_intro';
  }
  if (/(contact|email|mail|phone|telephone|numero|joindre|reach|linkedin)/.test(q)) {
    return 'contact';
  }
  if (/(experience|stage|apprentissage|alternance|job|work|sagemcom|videlio)/.test(q)) {
    return 'experience';
  }
  if (/(projet|project|reakt|everyone|hackathon)/.test(q)) {
    return 'projects';
  }
  if (/(competence|skill|techno|stack|langage|language|python|typescript|java|sql)/.test(q)) {
    return 'skills';
  }
  if (/(formation|education|diplome|ecole|ece|omnes|london school)/.test(q)) {
    return 'education';
  }
  if (/(langue|language|francais|anglais|espagnol|toeic)/.test(q)) {
    return 'languages';
  }
  if (/(activite|association|ingleague|football|piano|lol|league of legends)/.test(q)) {
    return 'activities';
  }
  if (RH_PATTERN.test(q)) {
    return 'rh_interview';
  }
  return 'generic';
}

const docIndex = corpus.map((doc) => {
  const titleTokens = tokenize(doc.title);
  const subtitleTokens = tokenize(doc.subtitle || '');
  const summaryTokens = tokenize(doc.summary || '');
  const tagTokens = tokenize((doc.tags || []).join(' '));
  const bodyTokens = tokenize(doc.content);
  const allTokens = [...titleTokens, ...subtitleTokens, ...summaryTokens, ...tagTokens, ...bodyTokens];
  const tf: Record<string, number> = {};

  allTokens.forEach((token) => {
    tf[token] = (tf[token] || 0) + 1;
  });

  return {
    doc,
    titleTokens,
    subtitleTokens,
    summaryTokens,
    tagTokens,
    bodyTokens,
    allTokens,
    tf
  };
});

const df: Record<string, number> = {};
docIndex.forEach(({ allTokens }) => {
  new Set(allTokens).forEach((token) => {
    df[token] = (df[token] || 0) + 1;
  });
});

const corpusSize = docIndex.length;

const idf = (token: string) => {
  const frequency = df[token] || 0;
  return Math.log((corpusSize + 1) / (frequency + 1)) + 1;
};

function scoreDocument(query: string, queryTerms: string[], intent: Intent, entry: typeof docIndex[number]): SearchResult | null {
  const normalizedQuery = normalize(query);
  const matchedTerms = new Set<string>();
  let score = 0;

  queryTerms.forEach((term) => {
    const weight = idf(term);

    if (entry.titleTokens.includes(term)) {
      score += 1.8 * weight;
      matchedTerms.add(term);
    }
    if (entry.subtitleTokens.includes(term)) {
      score += 1.2 * weight;
      matchedTerms.add(term);
    }
    if (entry.summaryTokens.includes(term)) {
      score += 1.1 * weight;
      matchedTerms.add(term);
    }
    if (entry.tagTokens.includes(term)) {
      score += 1.35 * weight;
      matchedTerms.add(term);
    }

    const bodyFrequency = entry.tf[term] || 0;
    if (bodyFrequency) {
      score += (bodyFrequency / Math.max(entry.allTokens.length, 1)) * weight * 4.8;
      matchedTerms.add(term);
    }
  });

  if (!score && !queryTerms.length) {
    return null;
  }

  if (normalize(entry.doc.title).includes(normalizedQuery) && normalizedQuery.length > 2) {
    score += 0.65;
  }

  if (normalize(entry.doc.sectionTitle).includes(normalizedQuery) && normalizedQuery.length > 2) {
    score += 0.28;
  }

  if (INTENT_SECTIONS[intent].includes(entry.doc.sectionId)) {
    score += 0.35;
  }

  if (intent === 'rh_interview' && ['experience', 'projects', 'skills', 'formation'].includes(entry.doc.sectionId)) {
    score += 0.18;
  }

  score *= SECTION_BASE_WEIGHT[entry.doc.sectionId] || 0.85;

  if (score <= 0) {
    return null;
  }

  const reason =
    matchedTerms.size > 0
      ? `matches ${Array.from(matchedTerms).slice(0, 4).join(', ')}`
      : `section boost: ${entry.doc.sectionTitle}`;

  return {
    doc: entry.doc,
    score,
    matchedTerms: Array.from(matchedTerms),
    reason
  };
}

function selectDiverse(results: SearchResult[], topK: number, intent: Intent): SearchResult[] {
  const selected: SearchResult[] = [];
  const perSectionCount: Record<string, number> = {};
  const maxPerSection = intent === 'self_intro' || intent === 'rh_interview' ? 2 : 3;

  for (const candidate of results) {
    const sectionId = candidate.doc.sectionId;
    const count = perSectionCount[sectionId] || 0;
    if (count >= maxPerSection) {
      continue;
    }
    selected.push(candidate);
    perSectionCount[sectionId] = count + 1;
    if (selected.length >= topK) {
      break;
    }
  }

  return selected;
}

function estimateConfidence(results: SearchResult[]): RetrievalSummary['confidence'] {
  const top = results[0]?.score || 0;
  const second = results[1]?.score || 0;

  if (top > 2.6 && top - second > 0.4) {
    return 'high';
  }

  if (top > 1.25) {
    return 'medium';
  }

  return 'low';
}

export function buildRetrievalSummary(
  query: string,
  options?: {
    history?: ChatMessage[];
    topK?: number;
  }
): RetrievalSummary {
  const topK = options?.topK ?? 5;
  const historyText = getRecentHistoryText(options?.history);
  const intent = detectIntent(`${historyText} ${query}`.trim());

  const directTokens = tokenize(query);
  const historyTokens = tokenize(historyText).slice(-8);
  const queryTerms = expandTokens([...directTokens, ...historyTokens]);

  const ranked = docIndex
    .map((entry) => scoreDocument(query, queryTerms, intent, entry))
    .filter((entry): entry is SearchResult => Boolean(entry))
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return {
      intent,
      confidence: 'low',
      hits: [],
      queryTerms
    };
  }

  const diverse = selectDiverse(ranked, topK, intent);

  return {
    intent,
    confidence: estimateConfidence(diverse),
    hits: diverse,
    queryTerms
  };
}

export function buildContextForQuestion(
  query: string,
  topK = 5,
  history: ChatMessage[] = []
): SearchResult[] {
  return buildRetrievalSummary(query, { topK, history }).hits;
}

export function searchKnowledge(query: string, topK = 5): SearchResult[] {
  return buildContextForQuestion(query, topK);
}

export function getKnowledgeStats() {
  return {
    documents: corpusSize,
    sections: Array.from(new Set(corpus.map((doc) => doc.sectionTitle))).length
  };
}
