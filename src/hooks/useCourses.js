import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../api/coursesApi';

export const useCourses = () => {
  const { data: courses = [], ...queryInfo } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(''); // Example filter
  const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"

  // Filter, search, and sort courses
  const filteredCourses = courses
    .filter(
      (course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()), // Search by title
    )
    .filter((course) =>
      filterCategory ? course.category === filterCategory : true,
    ) // Filter by category
    .sort(
      (a, b) =>
        sortOrder === 'asc'
          ? a.title.localeCompare(b.title) // Sort A-Z
          : b.title.localeCompare(a.title), // Sort Z-A
    );

  return {
    courses: filteredCourses,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    sortOrder,
    setSortOrder,
    ...queryInfo,
  };
};
