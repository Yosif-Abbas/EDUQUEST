import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { useCurrentUser } from '../../hooks/useCurrentUser';
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
        <h1 className="text-2xl">My Courses</h1>
      </div>
      {courses.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h2 className="text-2xl">
            You don&apos;t currently have any courses added
          </h2>

          <Link
            to="/teacher/newCourse"
            className="bg-pinky-violet hover:bg-pinky-violet/80 rounded-lg px-4 py-2 font-bold text-white transition"
          >
            Add a course
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {courses &&
            courses.map((course) => <Card course={course} key={course.id} />)}
        </ul>
      )}
    </div>
  );
}

export default TeacherCourses;
