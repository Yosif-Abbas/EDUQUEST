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
import { useEffect, useState } from 'react';

function CourseDetails() {
  const { id } = useParams();

  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const userId = currentUser?.id || null;

  const { course, isLoading: isLoadingCourse, Error } = useCourse(id);

  const { enrolledCourses, isLoading: isLoadingEnrolledCourses } =
    useEnrolledCourses(userId);

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (enrolledCourses && course?.id) {
      const found = enrolledCourses.some((c) => c.course_id.id === course.id);
      setIsEnrolled(found);
    }
  }, [enrolledCourses, course?.id, course]);

  const isLoadingEnrolledStatus =
    isLoadingCourse || isLoadingEnrolledCourses || isLoadingUser;

  if (isLoadingCourse)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  if (Error) return <div>{Error.message}</div>;

  return (
    <>
      <div className="mt-5">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_auto]">
          {/* This div is important for layout */}
          <CourseHeader course={course} />
          <div className="lg:col-start-2"></div>
          <div className="w-full">
            <VideoPlayer
              src={course.intro}
              poster={course.image_url}
              subtitleSrc={course.subtitles_url}
              className=""
            />
          </div>

          <CourseSidebar
            course={course}
            isEnrolled={isEnrolled}
            setIsEnrolled={setIsEnrolled}
            isLoadingEnrolledStatus={isLoadingEnrolledStatus}
          />
          <div className="mx-auto ml-0 flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
            <CourseDescription
              description={course.description}
              course_benefits={course.course_benefits}
              course_requirements={course.course_requirements}
            />

            <CourseCurriculum sections={course.course_sections} />

            <InstructorSection instructor={course.teachers} />

            <CourseRating ratings={course.ratings?.[0]} />

            {course?.reviews?.length > 0 && (
              <StudentReviews studentsFeedback={course.reviews} />
            )}
          </div>
        </div>
      </div>

      <Footer category={course.category} />
    </>
  );
}

export default CourseDetails;
