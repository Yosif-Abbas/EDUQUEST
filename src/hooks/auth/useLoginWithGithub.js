import { useMutation } from '@tanstack/react-query';

import { loginWithGithub as loginAPI } from '../../api/authApi';
import toast from 'react-hot-toast';

export function useLoginWithGithub() {
  const { mutate: loginWithGithub, isPending: isLoading } = useMutation({
    mutationFn: () => loginAPI(),

    onError: (error) => {
      console.error('Login failed:', error.message);
      toast.error(error.message);
    },
  });

  return { loginWithGithub, isLoading };
}
