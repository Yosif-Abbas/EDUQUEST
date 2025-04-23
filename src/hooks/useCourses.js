import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../api/coursesApi';
import { useSearchParams } from 'react-router-dom';

export const useCourses = () => {
  const [searchParams] = useSearchParams();

  // Searching
  const searchValue = searchParams.get('search') || '';
  const search = searchValue ? { field: 'search', value: searchValue } : null;

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
    queryKey: ['courses', sort, filter, search],
    queryFn: () => getCourses({ sort, filter, search }),
  });

  return {
    courses,
    ...queryInfo,
  };
};
