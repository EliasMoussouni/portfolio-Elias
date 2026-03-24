import { portfolioSections } from '../portfolio/portfolioData';
import { KnowledgeDoc } from './types';

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

export function buildKnowledgeBase(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];

  portfolioSections.forEach((section) => {
    section.items.forEach((item) => {
      const fields = [
        item.title,
        item.subtitle,
        item.period,
        item.location,
        item.summary,
        item.bullets?.join(' '),
        item.tags?.join(' ')
      ].filter(Boolean);

      docs.push({
        id: `${section.id}-${item.id}`,
        title: item.title,
        sectionId: section.id,
        sectionTitle: section.title,
        content: normalizeWhitespace(fields.join(' ')),
        sourceRoute: `/section/${section.id}`,
        subtitle: item.subtitle,
        summary: item.summary,
        period: item.period,
        location: item.location,
        tags: item.tags
      });
    });

    docs.push({
      id: `${section.id}-section-overview`,
      title: `${section.title} (overview)`,
      sectionId: section.id,
      sectionTitle: section.title,
      content: normalizeWhitespace(`${section.title}. ${section.description}`),
      sourceRoute: `/section/${section.id}`,
      summary: section.description
    });
  });

  return docs;
}
