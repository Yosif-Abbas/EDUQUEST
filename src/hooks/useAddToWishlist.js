import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addToWishlist as addToWishlistApi } from '../api/wishlistAPI';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate: addToWishlist, isPending: isLoading } = useMutation({
    mutationFn: ({ userId, courseId }) =>
      addToWishlistApi({ userId, courseId }),
    onSuccess: (data) => {
      toast.success('Successfully added the course to wishlist!');

      queryClient.invalidateQueries(['wishlist', data.user_id]);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error('Error adding course to your wishlist. Please try again.');
    },
  });

  return {
    addToWishlist,
    isLoading,
  };
};
