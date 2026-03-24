// queries/getProjects.ts
import { Project } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackProjects } from './fallbackData';

const GET_PROJECTS = `
  query {
    allProjects(orderBy: title_ASC) {
      title
      description
      techUsed
      image {
        url
      }
    }
  }
`;

export async function getProjects(): Promise<Project[]> {
  const data = await safeRequest<{ allProjects: Project[] }>(GET_PROJECTS, {
    allProjects: fallbackProjects
  });
  return data.allProjects;
}
