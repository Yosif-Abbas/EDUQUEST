// hooks/useUploadAvatar.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentSettings } from '../../api/userApi';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isLoading } = useMutation({
    mutationFn: async ({
      id,
      first_name,
      last_name,
      phone_number,
      email,
      biography,
      password,
    }) => {
      updateStudentSettings({
        id,
        first_name,
        last_name,
        phone_number,
        email,
        biography,
        password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      toast.success('settings updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating settings:', error.message);
      toast.error('Error updating settings. Please try again.');
    },
  });

  return { updateSettings, isLoading };
}
