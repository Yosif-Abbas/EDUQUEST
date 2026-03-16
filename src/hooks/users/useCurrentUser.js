import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/authApi';

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    isError,
  };
}
