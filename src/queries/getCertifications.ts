// queries/getCertifications.ts
import { Certification } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackCertifications } from './fallbackData';

const GET_CERTIFICATIONS = `
  query {
    allCertifications {
      title
      issuer
      issuedDate
      link
      iconName
    }
  }
`;

export async function getCertifications(): Promise<Certification[]> {
  const data = await safeRequest<{ allCertifications: Certification[] }>(GET_CERTIFICATIONS, {
    allCertifications: fallbackCertifications
  });
  return data.allCertifications;
}
