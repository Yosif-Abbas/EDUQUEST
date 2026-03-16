import { useMutation } from '@tanstack/react-query';

import { loginWithGoogle as loginAPI } from '../../api/authApi';
import toast from 'react-hot-toast';

export function useLoginWithGoogle() {
  const { mutate: loginWithGoogle, isPending: isLoading } = useMutation({
    mutationFn: () => loginAPI(),

    onError: (error) => {
      console.error('Login failed:', error.message);
      toast.error(error.message);
    },
  });

  return { loginWithGoogle, isLoading };
}
