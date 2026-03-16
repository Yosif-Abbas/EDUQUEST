import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTeacher, updateUser as updateUserApi } from '../../api/userApi';
import toast from 'react-hot-toast';
import { useCurrentUser } from './useCurrentUser';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    currentUser: { role },
  } = useCurrentUser();

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: ({ id, obj }) => {
      updateUserApi({
        id,
        obj,
      });
      if (role !== obj.role) obj.role === 'teacher' && createTeacher({ user_id: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('user updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating user:', error.message);
      toast.error('Error updating user. Please try again.');
    },
  });

  return { updateUser, isLoading };
}
