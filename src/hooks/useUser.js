import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/authApi';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { user, isLoading };
}
