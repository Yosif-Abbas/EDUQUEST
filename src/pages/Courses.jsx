import Card from '../components/Card';
import Loading from '../components/Loading';
import SearchControls from '../components/SearchControls';

import { useCourses } from '../hooks/useCourses';

function Courses() {
  const { courses, isLoading, isError } = useCourses();

  if (isError) return <div>Error fetching courses</div>;

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  return (
    <div className="mx-auto">
      <SearchControls />

      <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
        {courses &&
          courses.map((course) => <Card course={course} key={course.id} />)}
      </ul>
    </div>
  );
}

export default Courses;
