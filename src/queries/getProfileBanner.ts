// queries/getProfileBanner.ts
import { ProfileBanner } from '../types';
import { fallbackProfileBanner } from './fallbackData';
import { safeRequest } from './datoCMSClient';

const GET_PROFILE_BANNER = `
 {
  profilebanner {
    backgroundImage {
      url
    }
    headline
    resumeLink {
      url
    }
    linkedinLink
    profileSummary
  }
}
`;

export async function getProfileBanner(): Promise<ProfileBanner> {
  const data = await safeRequest<{ profilebanner: ProfileBanner }>(GET_PROFILE_BANNER, {
    profilebanner: fallbackProfileBanner
  });
  return data.profilebanner;
}
