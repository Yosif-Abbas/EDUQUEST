import { FaCommentDots, FaRegStar, FaStar, FaTrophy } from 'react-icons/fa';
import { FaCirclePlay, FaUserGroup } from 'react-icons/fa6';
import { VscVmActive } from 'react-icons/vsc';

import SummaryCard from '../../components/Teacher/SummaryCard';

import { useCoursesByTeacher } from '../../hooks/useCoursesByTeacher';
import { useCurrentUser } from './../../hooks/useCurrentUser';
import Loading from '../../components/Loading';
import RatingPercentage from '../../components/CourseDetails/RatingPercentage';
import { useTeacherRatings } from '../../hooks/useTeacherRatings';
import { ratingHelper, ratingPercentageHelper } from '../../utils/helpers';
import StarRating from '../../components/StarRating';
import Spinner from '../../components/Spinner';
import CourseEnrollmentChart from '../../components/Teacher/CourseEnrollementPieChart';

function TeacherDashboard() {
  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const teacherId = currentUser?.userTeacher?.id;

  const {
    courses,
    error,
    isLoading: isLoadingCourses,
  } = useCoursesByTeacher(teacherId);

  if (isLoadingUser) {
    <div className="flex h-full w-full items-center justify-center">
      <Loading />;
    </div>;
  }

  // uploaded and active courses
  const uploadedCourses = courses?.length;

  // students enrolled
  const students = courses?.reduce((acc, course) => {
    return acc + course.students_enrolled;
  }, 0);

  // ratings
  const {
    ratings = {
      '1_stars': 0,
      '2_stars': 0,
      '3_stars': 0,
      '4_stars': 0,
      '5_stars': 0,
    },
    isLoading: isLoadingRatings,
  } = useTeacherRatings(teacherId);

  const { ratingCount, rating } = ratingHelper(ratings);

  const ratingPercentage = ratingPercentageHelper(ratings, ratingCount);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
      <section className="col-span-full grid rounded-lg lg:grid-cols-[1fr_1fr_1fr]">
        <SummaryCard
          icon={<FaCirclePlay color="#FF6636" />}
          value={uploadedCourses}
          color="#FFF2E5"
          label="Uploaded Courses"
          isLoading={isLoadingCourses}
        />
        <SummaryCard
          icon={<VscVmActive color="#564FFD" />}
          value={uploadedCourses}
          label="Active Courses"
          color="#EBEBFF"
          explain="Courses available for students to enroll in"
          isLoading={isLoadingCourses}
        />
        <SummaryCard
          icon={<FaUserGroup color="#E34444" />}
          value={students.toLocaleString()}
          label="Students"
          color="#FFF0F0"
          explain="Students enrolled in your courses"
          isLoading={isLoadingCourses}
        />
        {/* <SummaryCard
          icon={<FaTrophy color="#23BD33" />}
          value={0}
          label="Completed Courses"
          color="#E1F7E3"
          explain="Courses completed by your students"
          isLoading={isLoadingCourses}
        /> */}
      </section>

      {/* <section className="col-span-full rounded-lg lg:col-span-4 xl:col-span-3">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Recent Activity</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <ul className="p-2">
          <li className="flex gap-3 pb-8">
            <div className="self-start rounded-full bg-[#FF6636] p-2 text-sm text-white">
              <FaCommentDots />
            </div>
            <div className="text-[14px]">
              <p className="mb-1 text-[#4E5566]">
                <span className="text-black">(Kevin)</span> commented on your
                (lecture) in (chapter one)
              </p>
              <p className="mb-1 text-[#4E5566]">(Mathematics)</p>
              <p className="text-[#4E5566]">(Just Now)</p>
            </div>
          </li>
          <li className="flex gap-3 pb-8">
            <div className="self-start rounded-full bg-[#FF6636] p-2 text-sm text-white">
              <FaCommentDots />
            </div>
            <div className="text-[14px]">
              <p className="mb-1 text-[#4E5566]">
                <span className="text-black">(Kevin)</span> commented on your
                (lecture) in (chapter one)
              </p>
              <p className="mb-1 text-[#4E5566]">(Mathematics)</p>
              <p className="text-[#4E5566]">(5 min)</p>
            </div>
          </li>
        </ul>
      </section> */}

      {/* <section className="col-span-full rounded-lg lg:col-span-8 xl:col-span-3">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Profile View</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Chart)</div>
      </section>

      <section className="col-span-full rounded-lg xl:col-span-6">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Revenue</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Chart)</div>
      </section> */}

      <section className="col-span-full space-y-1 xl:col-span-8">
        <div className="mb-4 flex items-center justify-between border-b-1 border-white p-2">
          <h2>Overall Courses Rating</h2>
        </div>

        <div className="flex gap-x-4">
          <div className="flex w-50 flex-col items-center justify-center gap-y-4 bg-[#FFF2E5] py-4">
            {isLoadingRatings || isLoadingCourses ? (
              <Spinner size={45} color="#876A9A" />
            ) : (
              <h1 className="mb-2 text-4xl">{rating}</h1>
            )}
            <StarRating rating={rating} size={18} fillColor="#876A9A" />
            <p className="text-xs">Teacher Rating</p>
          </div>

          <ul className="flex w-full flex-col justify-between gap-y-2">
            {Array.from({ length: 5 }, (_, i) => 5 - i).map((i) => (
              <RatingPercentage
                key={i}
                rating={i}
                ratingPercentage={ratingPercentage[`${i}_stars`]}
                fillColor="#876A9A"
                emptyColor="#E9EAF0"
                animationDuration={1000}
                animationDelay={250}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="col-span-full xl:col-span-4">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Courses Chart</h2>
        </div>
        <div className="p-2">
          {courses && <CourseEnrollmentChart data={courses} />}
        </div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
{
  /* <SummaryCard
    icon={<IoPersonCircleSharp />}
    value="(1,674,767)"
    label="Students"
  /> 
  <SummaryCard
    icon={<HiClipboardList />}
    value="(3)"
    label="Online Courses"
  />
  <SummaryCard
    icon={<FaCreditCard />}
    value="($7,461)"
    label="Total Earning"
  />
  <SummaryCard
    icon={<IoLayers />}
    value="(56,489)"
    label="Courses Sold"
  /> */
}
