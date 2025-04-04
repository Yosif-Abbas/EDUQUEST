import { useQuery } from '@tanstack/react-query';
import { getInstructor } from '../api/instructorApi';

export function useInstructor(id) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['teachers', id],
    queryFn: () => getInstructor(id),
  });

  return {
    instructor: data,
    isLoading,
    error,
  };
}
