import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../api/userApi';
import toast from 'react-hot-toast';

export function useUpdateUser() {

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: ({ id, obj }) => {
      updateUserApi({
        id,
        obj,
      });
    },
    onSuccess: () => {
      toast.success('user updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating user:', error.message);
      toast.error('Error updating user. Please try again.');
    },
  });

  return { updateUser, isLoading };
}
