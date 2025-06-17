import Card from '../components/Card';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchControls from '../components/SearchControls';

import { useCourses } from '../hooks/useCourses';
import { useQuestions } from '../hooks/useQuestions';

function Courses() {
  

  const { courses = [], isLoading, isError, count } = useCourses();

  if (isError) return <div>Error fetching courses</div>;

  return (
    <div className="mt-4 flex h-full flex-col">
      <SearchControls resultsNumber={count} isLoading={isLoading} />

      <div className="flex h-full flex-col justify-between py-6">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading size={150} />
          </div>
        ) : courses.length > 0 ? (
          <>
            <ul className="my-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
              {courses &&
                courses.map((course) => (
                  <Card course={course} key={course.id} />
                ))}
            </ul>
            {count > 1 && <Pagination count={count} />}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-L4 text-3xl">No courses found</h1>
            <img
              src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//404.png"
              alt="404"
              width={650}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
