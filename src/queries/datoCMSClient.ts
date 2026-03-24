import { GraphQLClient } from 'graphql-request';
import { getDatoCmsToken } from './getDatoCmsToken';

const DATO_CMS_ENDPOINT = 'https://graphql.datocms.com/';
const DATO_CMS_API_TOKEN = getDatoCmsToken();
const hasToken = Boolean(DATO_CMS_API_TOKEN && DATO_CMS_API_TOKEN.trim());

const datoCMSClient = new GraphQLClient(DATO_CMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${DATO_CMS_API_TOKEN}`,
  },
});

export async function safeRequest<T>(query: string, fallback: T): Promise<T> {
  if (!hasToken) {
    return fallback;
  }

  try {
    return await datoCMSClient.request<T>(query);
  } catch (error) {
    console.warn('DatoCMS unavailable, fallback content enabled.', error);
    return fallback;
  }
}

export default datoCMSClient;
