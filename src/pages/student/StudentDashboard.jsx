import { FaRegHeart, FaTrophy } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import { useEnrolledCourses } from '../../hooks/useEnrolledCourses';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Spinner from '../../components/Spinner';
import { useWishlist } from '../../hooks/useWishlist';

function StudentDashboard() {
  const { currentUser, isLoading } = useCurrentUser();
  const studentId = currentUser?.id;

  // ENROLLED COURSES
  const {
    enrolledCourses,
    isLoading: isLoadingEnrolledCourses,
    count: enrollCoursesCount,
  } = useEnrolledCourses(studentId);

  // ACTIVE COURSES
  const activeCoursesNum = enrolledCourses?.reduce(
    (acc, course) => acc + Number(course.is_active),
    0,
  );

  // COMPLETED COURSES
  const completedCoursesNum = enrolledCourses?.reduce(
    (acc, course) => acc + Number(course.is_completed),
    0,
  );

  // WISHLIST COURSES
  const {
    wishlist,
    isLoading: isLoadingWishlist,
    count: wishlistCount,
  } = useWishlist(studentId);

  return (
    <>
      <section className="mb-10">
        <h2 className="mb-6 ml-6 text-2xl font-bold">Dashboard</h2>
        <ul className="flex flex-wrap gap-6">
          <li className="student-dashboard-list-item bg-[#FFEEE8]">
            <span className="student-dashboard-list-item-icon">
              <MdOutlineFileDownloadDone color="#ff6636" />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">
                {isLoadingEnrolledCourses && (
                  <Spinner size={25} color="black" />
                )}
                {!isLoadingEnrolledCourses && enrollCoursesCount}
              </h3>
              <p className="text-sm text-[#4E5566]">Enrolled Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#EBEBFF]">
            <span className="student-dashboard-list-item-icon text-[#564FFD]">
              <FaCirclePlay />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">
                {isLoadingEnrolledCourses && (
                  <Spinner size={25} color="black" />
                )}
                {!isLoadingEnrolledCourses && activeCoursesNum}
              </h3>
              <p className="text-sm text-[#4E5566]">Active Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#E1F7E3]">
            <span className="student-dashboard-list-item-icon text-[#23BD33]">
              <FaTrophy />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">
                {isLoadingEnrolledCourses && (
                  <Spinner size={25} color="black" />
                )}
                {!isLoadingEnrolledCourses && completedCoursesNum}
              </h3>
              <p className="text-sm text-[#4E5566]">Completed Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#FFF2E5]">
            <span className="student-dashboard-list-item-icon text-[#FD8E1F]">
              <FaRegHeart />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">
                {isLoadingWishlist && <Spinner size={25} color="black" />}
                {!isLoadingWishlist && wishlistCount}
              </h3>
              <p className="text-sm text-[#4E5566]">Wishlist courses</p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}

export default StudentDashboard;
