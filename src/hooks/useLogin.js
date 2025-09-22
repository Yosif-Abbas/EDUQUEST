import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/authApi';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ loginEmail, password }) =>
      loginAPI({ loginEmail, password }),
    onSuccess: (user) => {
      if (user?.role) {
        navigate(`/${user?.role}`, { replace: true });
      } else {
        navigate('/onboarding');
      }

      queryClient.setQueryData(['user'], user);

      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);

      toast.error(error.message);
    },
  });

  return { login, isLoading };
}
