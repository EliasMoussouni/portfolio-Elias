// queries/getWorkPermit.ts
import { WorkPermit } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackWorkPermit } from './fallbackData';

const GET_WORK_PERMIT = `
  query {
    workPermit {
      visaStatus
      expiryDate
      summary
      additionalInfo
    }
  }
`;

export async function getWorkPermit(): Promise<WorkPermit> {
  const data = await safeRequest<{ workPermit: WorkPermit }>(GET_WORK_PERMIT, {
    workPermit: fallbackWorkPermit
  });
  return data.workPermit;
}
