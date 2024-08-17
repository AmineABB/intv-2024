type Fetcher = {
  url: string;
  token?: string;
  options?: RequestInit
}

export const fetcher = async ({ url, token, options = {} }: Fetcher) => {
  const { headers = {}, ...restOptions } = options
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token && { Authorization: `${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
};