import { portfolioSections, PortfolioSection } from '../portfolio/portfolioData';

export interface RepoManifest {
  cv: string[];
  certificats: string[];
  hackathon: string[];
  sources?: Record<string, string[]>;
}

const FALLBACK_MANIFEST: RepoManifest = {
  cv: ['/cv/cv_elias_moussouni_fr.pdf', '/cv/cv_elias_moussouni_eng.pdf'],
  certificats: ['/certificats/certificat_1.png', '/certificats/certificat_2.png'],
  hackathon: ['/hackathon/1765896140097.jpg']
};

function mergeSectionsWithManifest(manifest: RepoManifest): PortfolioSection[] {
  return portfolioSections.map((section) => {
    if (section.id !== 'formation') {
      return section;
    }

    const certifications = manifest.certificats.length ? manifest.certificats : FALLBACK_MANIFEST.certificats;
    const certItems = section.items.map((item) => {
      if (!item.id.startsWith('cert-')) {
        return item;
      }

      const index = item.id === 'cert-1' ? 0 : 1;
      const image = certifications[index] ?? certifications[0];
      return {
        ...item,
        image
      };
    });

    return {
      ...section,
      coverImage: certifications[0] ?? section.coverImage,
      items: certItems
    };
  });
}

export async function loadDataFromRepo(): Promise<{ sections: PortfolioSection[]; manifest: RepoManifest }> {
  try {
    const response = await fetch('/repo-manifest.json');
    if (!response.ok) {
      return { sections: mergeSectionsWithManifest(FALLBACK_MANIFEST), manifest: FALLBACK_MANIFEST };
    }

    const manifest = (await response.json()) as RepoManifest;
    return { sections: mergeSectionsWithManifest(manifest), manifest };
  } catch {
    return { sections: mergeSectionsWithManifest(FALLBACK_MANIFEST), manifest: FALLBACK_MANIFEST };
  }
}

export function getFrenchCvPath(manifest: RepoManifest): string | null {
  const frMatch = manifest.cv.find((entry) => /fr/i.test(entry));
  return frMatch ?? manifest.cv[0] ?? null;
}
