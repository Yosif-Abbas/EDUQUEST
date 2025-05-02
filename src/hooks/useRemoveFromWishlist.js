import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeFromWishlist as removeFromWishlistApi } from '../api/wishlistAPI';

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate: removeFromWishlist, isPending: isLoading } = useMutation({
    mutationFn: ({ userId, courseId }) =>
      removeFromWishlistApi({ userId, courseId }),
    onSuccess: (data) => {
      toast.success('Successfully removed the course from wishlist!');

      queryClient.invalidateQueries(['wishlist', data.user_id]);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(
        'Error removing course from your wishlist. Please try again.',
      );
    },
  });

  return {
    removeFromWishlist,
    isLoading,
  };
};
