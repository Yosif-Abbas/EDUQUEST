// hooks/useUploadAvatar.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../supabase';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const {
    mutate: uploadAvatar,
    isPending: isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ file, userId }) => {
      if (!file) {
        console.log('No file provided');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('Users')
        .update({ image_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return { uploadAvatar, isLoading, isSuccess, isError };
}
