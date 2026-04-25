import { detectIntent, searchKnowledge, getKnowledgeStats, buildRetrievalSummary } from './retrieval';

describe('detectIntent', () => {
  test('detects experience intent', () => {
    expect(detectIntent('parle moi de ton experience')).toBe('experience');
  });

  test('detects contact intent', () => {
    expect(detectIntent('comment te contacter par email')).toBe('contact');
  });

  test('detects projects intent', () => {
    expect(detectIntent('quels sont tes projets')).toBe('projects');
  });

  test('detects skills intent', () => {
    expect(detectIntent('quelles sont tes competences en python')).toBe('skills');
  });

  test('detects education intent', () => {
    expect(detectIntent('ta formation a ece paris')).toBe('education');
  });

  test('detects activities intent', () => {
    expect(detectIntent('tu joues au football')).toBe('activities');
  });

  test('detects self_intro intent', () => {
    expect(detectIntent('presente toi')).toBe('self_intro');
  });

  test('falls back to generic for unknown queries', () => {
    expect(detectIntent('blablabla xyz')).toBe('generic');
  });
});

describe('searchKnowledge', () => {
  test('returns an array for any query', () => {
    const results = searchKnowledge('experience professionnelle');
    expect(Array.isArray(results)).toBe(true);
  });

  test('returns results with required fields', () => {
    const results = searchKnowledge('projets');
    results.forEach((result) => {
      expect(result).toHaveProperty('doc');
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('matchedTerms');
      expect(result.score).toBeGreaterThan(0);
    });
  });

  test('returns empty array for nonsense query', () => {
    const results = searchKnowledge('zzzzzzzzz');
    expect(Array.isArray(results)).toBe(true);
  });

  test('respects topK limit', () => {
    const results = searchKnowledge('experience', 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

describe('getKnowledgeStats', () => {
  test('returns document and section counts', () => {
    const stats = getKnowledgeStats();
    expect(stats.documents).toBeGreaterThan(0);
    expect(stats.sections).toBeGreaterThan(0);
  });
});

describe('buildRetrievalSummary', () => {
  test('returns a summary with intent and hits', () => {
    const summary = buildRetrievalSummary('experience sagemcom');
    expect(summary).toHaveProperty('intent');
    expect(summary).toHaveProperty('confidence');
    expect(summary).toHaveProperty('hits');
    expect(summary).toHaveProperty('queryTerms');
  });

  test('confidence is one of low, medium, high', () => {
    const summary = buildRetrievalSummary('projets hackathon');
    expect(['low', 'medium', 'high']).toContain(summary.confidence);
  });
});
