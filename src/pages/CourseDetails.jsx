import { useParams } from 'react-router-dom';

import CourseHeader from '../components/CourseDetails/CourseHeader';
import Loading from '../components/Loading';
import CourseSidebar from '../components/CourseDetails/CourseSidebar';
import CourseDescription from '../components/CourseDetails/CourseDescription';
import CourseCurriculum from '../components/CourseDetails/CourseCurriculum';

import VideoPlayer from '../components/VideoPlayer';

import InstructorSection from './../components/CourseDetails/InstructorSection';
import CourseRating from '../components/CourseDetails/CourseRating';
import StudentReviews from '../components/CourseDetails/StudentReviews';
import Footer from '../components/CourseDetails/Footer';

import { useCourse } from '../hooks/useCourse';
import { useEnrolledCourses } from '../hooks/useEnrolledCourses';
import { useCurrentUser } from '../hooks/useCurrentUser';

function CourseDetails() {
  const { id } = useParams();

  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const userId = currentUser?.id || null;

  const { course, isLoading: isLoadingCourse, Error } = useCourse(id);

  const { enrolledCourses, isLoading: isLoadingEnrolledCourses } =
    useEnrolledCourses(userId);

  const isEnrolled =
    !isLoadingEnrolledCourses &&
    !isLoadingCourse &&
    enrolledCourses?.some((c) => c.course_id.id === course?.id);

  const isLoadingEnrolledStatus =
    isLoadingCourse || isLoadingEnrolledCourses || isLoadingUser;

  console.log('isEnrolled', isEnrolled);

  if (isLoadingCourse)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  if (Error) return <div>{Error.message}</div>;

  return (
    <>
      <CourseHeader course={course} />

      <div className="grid gap-2 lg:grid-cols-[1fr_auto]">
        <div>
          <VideoPlayer
            src={course.intro}
            poster={course.image_url}
            subtitleSrc={course.subtitles_url}
          />

          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 lg:mr-0">
            <CourseDescription
              description={course.description}
              course_benefits={course.course_benefits}
              course_requirements={course.course_requirements}
            />

            <CourseCurriculum sections={course.course_sections} />

            <InstructorSection instructor={course.Teachers} />

            <CourseRating
              rating={course.rating}
              ratings={course.Ratings?.[0]}
              ratingCount={course.rating_count}
            />

            {course?.Reviews?.length > 0 && (
              <StudentReviews studentsFeedback={course.Reviews} />
            )}
          </div>
        </div>

        <CourseSidebar
          course={course}
          isEnrolled={isEnrolled}
          isLoadingEnrolledStatus={isLoadingEnrolledStatus}
        />
      </div>

      <Footer />
    </>
  );
}

export default CourseDetails;
