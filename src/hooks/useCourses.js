import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../api/coursesApi';

export const useCourses = () => {
  const { data: courses = [], ...queryInfo } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // "asc" or "desc"

  // Search
  let filteredCourses = courses;
  if (searchTerm)
    filteredCourses = filteredCourses.filter(
      (course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()), // Search by title
    );

  // Filter
  if (filterCategory)
    filteredCourses = filteredCourses.filter((course) =>
      filterCategory ? course.category === filterCategory : true,
    );

  // Sorting
  filteredCourses = filteredCourses.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.title.localeCompare(b.title) // Sort A-Z
      : sortOrder === 'desc'
        ? b.title.localeCompare(a.title) // Sort Z-A
        : 0;
  });

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
