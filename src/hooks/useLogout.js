import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAPI } from '../api/authApi';
import toast from 'react-hot-toast';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => logoutAPI(),

    onSuccess: () => {
      navigate('/home', { replace: true });

      queryClient.removeQueries(['user']);
      toast.success('Logout successful!');
    },

    onError: (error) => {
      console.error('Logout failed:', error.message);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { logout, isLoading };
}
