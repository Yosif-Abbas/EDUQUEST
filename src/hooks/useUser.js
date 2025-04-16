import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/authApi';

export function useUser(id) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(id),
  });

  return { user, isLoading };
}
