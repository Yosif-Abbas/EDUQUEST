import CourseHeader from '../components/CourseDetails/CourseHeader';
import { useParams } from 'react-router-dom';
import { useCourse } from '../hooks/useCourse';
import Loading from '../components/Loading';
import CourseSidebar from '../components/CourseDetails/CourseSidebar';
import CourseDescription from '../components/CourseDetails/CourseDescription';
import CourseCurriculum from '../components/CourseDetails/CourseCurriculum';
import InstructorSection from '../components/CourseDetails/InstructorSection';
import StudentReviews from '../components/CourseDetails/StudentReviews';
import CourseRating from '../components/CourseDetails/CourseRating';
import Footer from '../components/CourseDetails/Footer';

function CourseDetails() {
  const { id } = useParams();
  const { course, isError, isLoading } = useCourse(id);

  console.log(course);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  if (isError) return <div>Error fetching course data.</div>;

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-[2fr_1fr]">
        <CourseHeader course={course} />
        <CourseSidebar course={course} />

        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 lg:mr-0">
          <CourseDescription
            description={course.description}
            whatYouWillLearn={course.whatYouWillLearn}
            requirements={course.courseRequirements}
          />
          <CourseCurriculum sections={course.sections} />
          <InstructorSection instructors={course.instructors} />
          <CourseRating
            rating={course.rating}
            ratings={course.ratings}
            ratingCount={course.ratingCount}
          />
          <StudentReviews studentsFeedback={course.studentsFeedback} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetails;
