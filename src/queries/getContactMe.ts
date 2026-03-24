// queries/getContactMe.ts
import { ContactMe } from '../types';
import { safeRequest } from './datoCMSClient';
import { fallbackContactMe } from './fallbackData';

const GET_CONTACT_ME = `
  query {
    contactMe {
      profilePicture {
        url
      }
      name
      title
      summary
      companyUniversity
      linkedinLink
      email
      phoneNumber
    }
  }
`;

export async function getContactMe(): Promise<ContactMe> {
  const data = await safeRequest<{ contactMe: ContactMe }>(GET_CONTACT_ME, {
    contactMe: fallbackContactMe
  });
  return data.contactMe;
}
