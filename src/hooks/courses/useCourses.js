import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getCourses } from '../../api/coursesApi';

export const useCourses = () => {
  const [searchParams] = useSearchParams();

  // Searching
  const searchValue = searchParams.get('search') || '';
  const search = searchValue ? { field: 'search', value: searchValue } : null;

  // Filtering
  const filterValue = searchParams.get('category') || 'all';
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'category', value: filterValue };

  // Sorting
  const sortBy = searchParams.get('sortBy') || 'created_at-dec';
  const [sortValue, sortOrder] = sortBy.split('-');
  const sort = { value: sortValue, order: sortOrder };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data: { data: courses, count } = {}, ...queryInfo } = useQuery({
    queryKey: ['courses', { sort, filter, search, page }],
    queryFn: () => getCourses({ sort, filter, search, page }),
  });

  // [
  //   'courses',
  //   {
  //     filter: { field: 'category', value: 'language' },
  //     page: 1,
  //     search: { field: 'search', value: 'math' },
  //     sort: { order: 'asc', value: 'created_at' },
  //   },
  // ];

  return {
    courses,
    count,
    ...queryInfo,
  };
};
