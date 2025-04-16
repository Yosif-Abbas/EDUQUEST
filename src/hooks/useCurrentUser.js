import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/authApi';

export function useCurrentUser() {
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  return currentUser;
}
