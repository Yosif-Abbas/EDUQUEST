import Card from '../components/Card';
import Loading from '../components/Loading';
import SearchControls from '../components/SearchControls';

import { useCourses } from '../hooks/useCourses';

function Courses() {
  const { courses = [], isLoading, isError } = useCourses();

  // const [searchParams] = useSearchParams();

  // const [sortValue, sortOrder] = (
  //   searchParams.get('sortBy') || 'created_at-asc'
  // ).split('-');

  // const courses = allCourses.sort((a, b) =>
  //   sortOrder === 'asc'
  //     ? a[sortValue] - b[sortValue]
  //     : b[sortValue] - a[sortValue],
  // );

  const categories = courses.map((course) => course.category);
  const uniqueCategories = [...new Set(categories)];

  if (isError) return <div>Error fetching courses</div>;

  return (
    <div className="flex flex-col">
      <SearchControls categories={uniqueCategories} />

      <div className="py-6">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading size={150} />
          </div>
        ) : courses.length > 0 ? (
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
            {courses &&
              courses.map((course) => <Card course={course} key={course.id} />)}
          </ul>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-L4 text-3xl">No courses found</h1>
            <img
              src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//404.png"
              alt="404"
              width={650}
              className=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
