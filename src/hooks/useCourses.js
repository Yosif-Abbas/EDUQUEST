import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../api/coursesApi';
import { useSearchParams } from 'react-router-dom';

export const useCourses = () => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'created_at-des';
  const [sortValue, sortOrder] = sortBy.split('-');
  const sort = { value: sortValue, order: sortOrder };

  const { data: courses = [], ...queryInfo } = useQuery({
    queryKey: ['courses', sort],
    queryFn: () => getCourses({ sort }),
  });

  return {
    courses,
    ...queryInfo,
  };
};
