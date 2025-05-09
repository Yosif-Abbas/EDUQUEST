// hooks/useUploadAvatar.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { uploadAvatarApi } from '../api/uploadAvatarApi';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const {
    mutate: uploadAvatar,
    isPending: isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: () => {
      toast.success('Avatar updated successfully!');
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      console.error('Error uploading avatar:', error.message);
      toast.error('Error updating avatar. Please try again.');
    },
  });

  return { uploadAvatar, isLoading, isSuccess, isError };
}
