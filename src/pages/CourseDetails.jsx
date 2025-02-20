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
    <div className="">
      <CourseHeader course={course} />
      <CourseSidebar course={course} />

      <div className="mx-auto flex max-w-280 flex-col gap-4 px-4 py-6">
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
        <StudentReviews />
      </div>
    </div>
  );
}

export default CourseDetails;
