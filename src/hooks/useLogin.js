import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/authApi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingUser } = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: () => {
      toast.success('Login successful!');

      if (!isLoadingUser) navigate(`/${user.role}`);
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  return { login, isLoading };
}
