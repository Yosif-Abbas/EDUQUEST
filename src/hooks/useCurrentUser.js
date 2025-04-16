import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/authApi';

export function useCurrentUser() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  return {
    currentUser,
    isLoading,
    isAuthenticated: currentUser?.aud === 'authenticated',
  };
}
