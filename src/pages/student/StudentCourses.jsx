import { FaChevronDown } from 'react-icons/fa';

import { useEnrolledCourses } from '../../hooks/courses/useEnrolledCourses';

import { useCurrentUser } from '../../hooks/users/useCurrentUser';

import SortBy from '../../components/filters-sorts/SortBy';
import Search from '../../components/filters-sorts/Search';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';
import Card from '../../components/courses/Card';

function StudentCourses() {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const studentId = currentUser?.id;

  const {
    enrolledCourses,
    isLoading: isLoadingEnrolledCourses,
    count,
    isError,
  } = useEnrolledCourses(studentId);

  return (
    <>
      <section className="mx-6">
        <h2 className="mb-6 text-2xl font-normal">
          <span className="font-medium">Courses</span> (
          {isLoadingEnrolledCourses || isLoadingCurrentUser ? <Spinner size={25} /> : count})
        </h2>
        <ul className="flex flex-wrap gap-6">
          <li className="h-[48px] w-full max-w-130 self-end">
            <Search />
          </li>

          <li className="">
            <SortBy
              sortbyField="sortBy"
              options={[
                { label: 'Most Recent', value: 'created_at-asc' },
                { label: 'Oldest', value: 'created_at-des' },
                { label: 'Highest Rated', value: 'rating-des' },
                { label: 'Lowest Rated', value: 'rating-asc' },
              ]}
              className="flex-col items-start"
            />
          </li>

          <li className="h-[48px]">
            <h3 className="student-courses-filter-name">Status:</h3>
            <div className="relative">
              <select className="select">
                <option>All Courses</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2"
              >
                <FaChevronDown size={12} />
              </span>
            </div>
          </li>

          <li>
            <h3 className="student-courses-filter-name">Teacher:</h3>
            <div className="relative h-[48px]">
              <select className="select">
                <option>All Teachers</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2"
              >
                <FaChevronDown size={12} />
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section className="mr-6 space-y-10 pb-6">
        {isLoadingEnrolledCourses && (
          <div className="flex h-100 items-center justify-center">
            <Loading size={120} />
          </div>
        )}
        {isError && <p>Error fetching courses</p>}
        {!isLoadingEnrolledCourses && !isError && (
          <ul className="xs:grid-cols-2 mt-6 ml-6 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {enrolledCourses &&
              enrolledCourses.map((course) => (
                <Card course={course.course_id} key={course.id} />
              ))}
          </ul>
        )}

        {/* <Pagination count={count} /> */}
      </section>
    </>
  );
}

export default StudentCourses;
