import { headers } from 'next/headers';
import { HEADERS } from '@/constants/common';

export const useAccessToken = () => headers().get(HEADERS.AUTHORIZATION) as string;