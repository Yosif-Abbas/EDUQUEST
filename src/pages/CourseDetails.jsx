import { useParams } from 'react-router-dom';

import { useCourse } from '../hooks/courses/useCourse';
import { useEnrolledCourses } from '../hooks/courses/useEnrolledCourses';
import { useCurrentUser } from '../hooks/users/useCurrentUser';
import { useEffect, useState } from 'react';

import CourseHeader from '../components/courses/courseDetails/CourseHeader';
import Loading from '../components/Loading';
import CourseSidebar from '../components/courses/courseDetails/CourseSidebar';
import CourseDescription from '../components/courses/courseDetails/CourseDescription';
import CourseCurriculum from '../components/courses/courseDetails/CourseCurriculum';

import VideoPlayer from '../components/courses/courseWatch/VideoPlayer';

import InstructorSection from './../components/courses/courseDetails/InstructorSection';
import CourseRating from '../components/courses/courseDetails/CourseRating';
import StudentReviews from '../components/courses/courseDetails/StudentReviews';
import Footer from '../components/courses/courseDetails/Footer';

function CourseDetails() {
  const { id } = useParams();

  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const userId = currentUser?.id || null;

  const { course, isLoading: isLoadingCourse, Error } = useCourse(id);

  const { enrolledCourses, isLoading: isLoadingEnrolledCourses } = useEnrolledCourses(userId);

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (enrolledCourses && course?.id) {
      const found = enrolledCourses.some((c) => c.course_id.id === course.id);
      setIsEnrolled(found);
    }
  }, [enrolledCourses, course?.id, course]);

  const isLoadingEnrolledStatus = isLoadingCourse || isLoadingEnrolledCourses || isLoadingUser;

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
