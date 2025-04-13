import { useQuery } from '@tanstack/react-query';
import { getCourse } from './../api/coursesApi';
export function useCourse(id) {
  const {
    data: course = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourse(id),
  });

  return { course, error, isLoading };
}
