import { ENDPOINTS } from '@/constants/api';
import { fetcher } from '@/utils/customFetch';

export const fetchAccessToken = async () => {
  const { token } = await fetcher({ url: ENDPOINTS.AUTH });
  return token;
}