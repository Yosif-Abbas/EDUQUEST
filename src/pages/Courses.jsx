import Card from '../components/Card';

import { useCourses } from '../hooks/useCourses';

function Courses() {
  const { courses, isLoading, isError } = useCourses();

  if (isError) return <div>Error fetching courses</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <ul className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-6 px-3 sm:gap-x-8 sm:px-16">
        {courses &&
          courses.map((course) => <Card course={course} key={course.id} />)}
      </ul>
    </div>
  );
}

export default Courses;
