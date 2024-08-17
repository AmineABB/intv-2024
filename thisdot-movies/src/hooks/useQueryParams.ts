import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SetQueryParams = {
  key: string;
  value: string;
  replaceAll?: boolean;
  path?: string;
}

export const useQueryParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const setQueryParam = ({ key, value, path = pathname, replaceAll = false }: SetQueryParams) => {
    const params = new URLSearchParams(!replaceAll ? searchParams : '');

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${path}?${params.toString()}`);
  };

  const getQueryParam = (key: string) => {
    return searchParams.get(key)?.toString() || '';
  };

  return { setQueryParam, getQueryParam };
};
