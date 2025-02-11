import { useQuery } from '@tanstack/react-query';
import { fetchCourse } from '../api/coursesApi';

export const useCourse = (id) => {
  const { data: course, ...queryInfo } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourse(id),

    // staleTime: 1000 * 60 * 15, // 15 minutes
  });


  return { course, isLoading: queryInfo.isLoading, isError: queryInfo.isError };
};
