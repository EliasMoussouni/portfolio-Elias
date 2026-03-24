// queries/getSkills.ts
import { Skill } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackSkills } from './fallbackData';

const GET_SKILLS = `
{
  allSkills(orderBy: category_ASC) {
    name
    category
    description
    icon
  }
}
`;

export async function getSkills(): Promise<Skill[]> {
  const data = await safeRequest<{ allSkills: Skill[] }>(GET_SKILLS, {
    allSkills: fallbackSkills
  });
  return data.allSkills;
}
