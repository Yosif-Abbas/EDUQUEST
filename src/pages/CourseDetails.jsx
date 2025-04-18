import { useParams } from 'react-router-dom';

import CourseHeader from '../components/CourseDetails/CourseHeader';
import Loading from '../components/Loading';
import CourseSidebar from '../components/CourseDetails/CourseSidebar';
import CourseDescription from '../components/CourseDetails/CourseDescription';
import CourseCurriculum from '../components/CourseDetails/CourseCurriculum';

import VideoPlayer from '../components/VideoPlayer';

import Subtitles from '../assets/subtitles.vtt';

import InstructorSection from './../components/CourseDetails/InstructorSection';
import CourseRating from '../components/CourseDetails/CourseRating';
import StudentReviews from '../components/CourseDetails/StudentReviews';
import Footer from '../components/CourseDetails/Footer';

import { useCourse } from '../hooks/useCourse';

function CourseDetails() {
  const { id } = useParams();

  const { course, isLoading, Error } = useCourse(id);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  console.log(course);
  if (Error) return <div>{Error.message}</div>;

  const categories = course.subject.toLowerCase().split(' ');

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-[2fr_1fr]">
        <CourseHeader course={course} />
        <VideoPlayer
          src={course.intro}
          poster={course.image_url}
          subtitleSrc={Subtitles}
          className="col-start-1 mr-0"
        />

        <CourseSidebar course={course} />

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
            ratings={course.Ratings[0]}
            ratingCount={course.rating_count}
          />

          {course.Reviews.length > 0 && (
            <StudentReviews studentsFeedback={course.Reviews} />
          )}
        </div>
      </div>
      <Footer categories={categories} currentCourseId={course.id} />
    </div>
  );
}

export default CourseDetails;
