// queries/getTimeline.ts
import { TimelineItem } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackTimeline } from './fallbackData';

const GET_TIMELINE = `
{
  allTimelines {
    name
    timelineType
    title
    techStack
    summaryPoints
    dateRange
  }
}
`;

export async function getTimeline(): Promise<TimelineItem[]> {
  const data = await safeRequest<{ allTimelines: TimelineItem[] }>(GET_TIMELINE, {
    allTimelines: fallbackTimeline
  });
  return data.allTimelines;
}
