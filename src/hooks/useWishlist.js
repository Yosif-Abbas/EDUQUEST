import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../api/wishlistAPI';

export function useWishlist() {
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  return {
    wishlist: data,
    isLoading,
  };
}
