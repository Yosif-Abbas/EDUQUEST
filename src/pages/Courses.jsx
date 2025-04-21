import Card from '../components/Card';
import Loading from '../components/Loading';
import SearchControls from '../components/SearchControls';

import { useCourses } from '../hooks/useCourses';
import { useSearchParams } from 'react-router-dom';

function Courses() {
  const { courses: allCourses = [], isLoading, isError } = useCourses();

  const [searchParams] = useSearchParams();

  const [sortValue, sortOrder] = (
    searchParams.get('sortBy') || 'created_at-asc'
  ).split('-');

  const courses = allCourses.sort((a, b) =>
    sortOrder === 'asc'
      ? a[sortValue] - b[sortValue]
      : b[sortValue] - a[sortValue],
  );

  if (isError) return <div>Error fetching courses</div>;

  return (
    <>
      <SearchControls />

      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading size={150} />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
          {courses &&
            courses.map((course) => <Card course={course} key={course.id} />)}
        </ul>
      )}
    </>
  );
}

export default Courses;
