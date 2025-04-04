import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../api/coursesApi';

export const useCourses = (
  _searchTerm = '',
  _filterCategory = [],
  _sortOrder = '',
  currentCourseId = null,
) => {
  const { data: courses = [], ...queryInfo } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const [searchTerm, setSearchTerm] = useState(_searchTerm);
  const [filterCategory, setFilterCategory] = useState(
    Array.isArray(_filterCategory)
      ? _filterCategory
      : _filterCategory.split(' '),
  );
  const [sortOrder, setSortOrder] = useState(_sortOrder);

  // Search
  let filteredCourses = courses;
  if (searchTerm)
    filteredCourses = filteredCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // Filter
  if (Array.isArray(filterCategory) && filterCategory.length > 0) {
    filteredCourses = filteredCourses.filter((course) =>
      course.subject
        ? filterCategory.some((category) =>
            course.subject.toLowerCase().includes(category.toLowerCase()),
          )
        : false,
    );
  }

  if (currentCourseId) {
    filteredCourses = filteredCourses.filter(
      (course) => course.id !== currentCourseId,
    );
  }

  // Sorting
  filteredCourses = filteredCourses.sort((a, b) =>
    sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : 0,
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
