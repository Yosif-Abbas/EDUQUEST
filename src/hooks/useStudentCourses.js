import { useQuery } from '@tanstack/react-query';
import { getStudentCourses } from '../api/coursesApi';
import { useSearchParams } from 'react-router-dom';

export function useStudentCourses(studentID) {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'created_at-des';
  const [sortValue, sortOrder] = sortBy.split('-');
  const sort = { value: sortValue, order: sortOrder };

  const {
    data: { data: studentCourses, count } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studentCourses', sort],
    queryFn: () => getStudentCourses({ studentID, sort }),
  });

  console.log(studentCourses, count);

  return { studentCourses, count, isLoading, isError };
}
