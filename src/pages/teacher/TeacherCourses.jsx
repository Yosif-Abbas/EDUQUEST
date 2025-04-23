import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { useCourses } from './../../hooks/useCourses';

function TeacherCourses() {
  const { courses, isLoading, isError } = useCourses();

  if (isError) return <div>Error fetching courses</div>;

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  return (
    <div>
      {/* <div></div> */}
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {courses &&
          courses.map((course) => <Card course={course} key={course.id} />)}
      </ul>
    </div>
  );
}

export default TeacherCourses;
