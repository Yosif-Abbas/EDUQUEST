import { useParams } from 'react-router-dom';
import { useCourse } from '../hooks/useCourse';
import Loading from '../components/Loading';
import CourseSidebar from '../components/CourseSidebar';

function CourseDetails() {
  const { id } = useParams();

  const { course, isError, isLoading } = useCourse(id);

  console.log(course);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  if (isError) return <div>Error fetching course data.</div>;

  return (
    <>
      <CourseSidebar course={course} />
    </>
  );
}

export default CourseDetails;
