// hooks/useUploadAvatar.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../supabase';
import { updateStudentSettings } from '../api/userApi';

export function useUpdateStudentSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateStudent, isPending: isLoading } = useMutation({
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
    },
  });

  return { updateStudent, isLoading };
}
