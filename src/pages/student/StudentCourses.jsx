import { IoIosSearch } from 'react-icons/io';
import { useCourses } from '../../hooks/useCourses';
import Card from '../../components/Card';
import Loading from '../../components/Loading';

function StudentCourses() {
  const { courses, isLoading, isError } = useCourses();

  return (
    <>
      <section className="mx-6">
        <h2 className="mb-6 text-2xl font-normal">
          <span className="font-medium">Courses</span> (957)
        </h2>
        <ul className="flex flex-wrap gap-6">
          <li>
            <h3 className="student-courses-filter-name">Search:</h3>
            <div className="relative">
              <input
                type="text"
                className="w-20 bg-white p-3 pl-8 outline-0 max-[640px]:focus:w-50 md:w-60 xl:w-80"
                placeholder="Search in your courses"
              />
              <span className="absolute top-1/2 left-4 block -translate-1/2 text-xl">
                <IoIosSearch />
              </span>
            </div>
          </li>
          <li>
            <h3 className="student-courses-filter-name">Sort by:</h3>
            <select className="bg-white p-3 outline-0 md:w-40">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </li>
          <li>
            <h3 className="student-courses-filter-name">Status:</h3>
            <select className="bg-white p-3 outline-0 md:w-40">
              <option>All Courses</option>
            </select>
          </li>
          <li>
            <h3 className="student-courses-filter-name">Teacher:</h3>
            <select className="bg-white p-3 outline-0 md:w-40">
              <option>All Teachers</option>
            </select>
          </li>
        </ul>
      </section>
      <section className="mr-6 space-y-10">
        {isLoading && (
          <div className="flex h-100 items-center justify-center">
            <Loading size={120} />
          </div>
        )}
        {isError && <p>Error fetching courses</p>}
        {!isLoading && !isError && (
          <ul className="xs:grid-cols-2 mt-6 ml-6 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {courses &&
              courses.map((course) => <Card course={course} key={course.id} />)}
          </ul>
        )}

        <ul className="mx-6">
          <li>as</li>
        </ul>
      </section>
    </>
  );
}

export default StudentCourses;
