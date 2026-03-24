export interface KnowledgeDoc {
  id: string;
  title: string;
  sectionId: string;
  sectionTitle: string;
  content: string;
  sourceRoute: string;
  subtitle?: string;
  summary?: string;
  period?: string;
  location?: string;
  tags?: string[];
}

export interface SearchResult {
  doc: KnowledgeDoc;
  score: number;
  matchedTerms: string[];
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  meta?: {
    sections?: string[];
    confidence?: 'low' | 'medium' | 'high';
    sources?: Array<{
      label: string;
      route: string;
    }>;
    intent?: string;
    entity?: string;
  };
}

export interface ContextSnippet {
  id: string;
  title: string;
  sectionId: string;
  sectionTitle: string;
  content: string;
  sourceRoute: string;
  score: number;
  reason: string;
}

export interface RetrievalSummary {
  intent:
    | 'self_intro'
    | 'contact'
    | 'experience'
    | 'projects'
    | 'skills'
    | 'education'
    | 'languages'
    | 'activities'
    | 'rh_interview'
    | 'generic';
  confidence: 'low' | 'medium' | 'high';
  hits: SearchResult[];
  queryTerms: string[];
}

export interface AssistantAnswer {
  answer: string;
  suggestions: string[];
  meta: NonNullable<ChatMessage['meta']>;
}
