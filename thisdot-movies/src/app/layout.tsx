import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Search } from '@/components/Search';
import { useAccessToken } from '@/hooks/useAccessToken';
import { fetchGenres } from '@/services/moviesAPI';
import { Genres } from '@/components/Genres';
import '@/styles/globals.css';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies App',
  description: 'Simple movies application',
};

type RootLayout = {
  readonly children: React.ReactNode
}

export default async function RootLayout({ children}: RootLayout) {
  const token = useAccessToken();
  const { data: genres } = await fetchGenres(token);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <div className="header_wrapper">
            <Search />
            {genres && <Genres items={genres} />}
          </div>
        </Suspense>
        {children}
      </body>
    </html>
  );
}
