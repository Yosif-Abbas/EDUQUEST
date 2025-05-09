import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Spinner from '../../components/Spinner';
import SortBy from '../../components/filters-sorts/SortBy';
import Search from '../../components/filters-sorts/Search';
import Pagination from '../../components/Pagination';
import { useEnrolledCourses } from '../../hooks/useEnrolledCourses';

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
          {isLoadingEnrolledCourses || isLoadingCurrentUser ? (
            <Spinner size={25} />
          ) : (
            count
          )}
          )
        </h2>
        <ul className="flex flex-wrap gap-6">
          <Search />

          <SortBy
            sortbyField="sortBy"
            options={[
              { label: 'Most Recent', value: 'created_at-asc' },
              { label: 'Old', value: 'created_at-des' },
              { label: 'Highest Rated', value: 'rating-des' },
              { label: 'Lowest Rated', value: 'rating-asc' },
            ]}
          />
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
