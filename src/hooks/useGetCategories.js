import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/coursesApi';

export function useCategories() {
  const {
    data: categories = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  return { categories, error, isLoading };
}
