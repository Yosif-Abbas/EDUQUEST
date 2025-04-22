import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../api/coursesApi';
import { useSearchParams } from 'react-router-dom';

export const useCourses = () => {
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get('category') || 'all';
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'category', value: filterValue };

  // Sorting
  const sortBy = searchParams.get('sortBy') || 'created_at-dec';
  const [sortValue, sortOrder] = sortBy.split('-');
  const sort = { value: sortValue, order: sortOrder };

  const { data: courses = [], ...queryInfo } = useQuery({
    queryKey: ['courses', sort, filter],
    queryFn: () => getCourses({ sort, filter }),
  });

  return {
    courses,
    ...queryInfo,
  };
};
