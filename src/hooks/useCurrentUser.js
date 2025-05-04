import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../api/authApi';

export function useCurrentUser() {
  const queryClient = useQueryClient();

  const cachedUser = queryClient.getQueryData(['user']);

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !cachedUser,
  });

  return {
    currentUser: cachedUser || currentUser,
    isLoading: !cachedUser && isLoading,
    isAuthenticated: !!(cachedUser || currentUser),
    isError,
  };
}
