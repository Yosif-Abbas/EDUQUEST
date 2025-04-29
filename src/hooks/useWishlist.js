import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../api/wishlistAPI';

export function useWishlist(studentId) {
  const { data: { wishlist, count } = {}, isLoading } = useQuery({
    queryKey: ['wishlist', studentId],
    queryFn: () => getWishlist(studentId),
  });

  return {
    wishlist,
    count,
    isLoading,
  };
}
