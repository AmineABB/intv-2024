import { NextResponse, type NextRequest } from 'next/server';
import { fetchAccessToken } from '@/services/authAPI';
import { HEADERS } from '@/constants/common';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const hasAuthorization = requestHeaders.has(HEADERS.AUTHORIZATION);
  
  if (!hasAuthorization) {
    const accessToken = await fetchAccessToken();
    requestHeaders.set(HEADERS.AUTHORIZATION, `Bearer ${accessToken}`);
  }
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
