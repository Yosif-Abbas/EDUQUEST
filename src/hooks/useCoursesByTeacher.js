import { useQuery } from '@tanstack/react-query';
import { getCoursesByTeacherId } from '../api/coursesApi';
export function useCoursesByTeacher(teacherId) {
  const {
    data: courses = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['courses', teacherId],
    queryFn: () => getCoursesByTeacherId(teacherId),
  });

  return { courses, error, isLoading };
}
