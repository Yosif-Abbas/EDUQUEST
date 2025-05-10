import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useCourses } from './../../hooks/useCourses';
import { useCoursesByTeacher } from './../../hooks/useCoursesByTeacher';

function TeacherCourses() {
  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const teacherId = currentUser?.userTeacher?.id;

  const {
    courses,
    error,
    isLoading: isLoadingCourses,
  } = useCoursesByTeacher(teacherId);

  if (error) return <div>Error fetching courses</div>;

  if (isLoadingCourses || isLoadingUser)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl">Your Courses</h1>
      </div>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {courses &&
          courses.map((course) => <Card course={course} key={course.id} />)}
      </ul>
    </div>
  );
}

export default TeacherCourses;
