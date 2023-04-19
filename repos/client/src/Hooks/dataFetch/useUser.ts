import fetcher from '../../Utils/fetchers';
import useSWR from 'swr';

export const useUser = () => {
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    '/api/users',

    fetcher,
  );
  return { userData, error, isLoading, mutate, isLogined: !!userData };
};
