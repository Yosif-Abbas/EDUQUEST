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
import { useCourses } from './../hooks/useCourses';
import Card from '../components/Card';
import Button from './../components/Button';
import { FaArrowRight } from 'react-icons/fa';

function CourseDetails() {
  const { id } = useParams();
  const { course, isError, isLoading } = useCourse(id);

  const { courses: relatedCourses } = useCourses('', 'math');

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
      <footer className="bg-white">
        <div className="mx-auto w-fit px-4">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-2xl lg:text-3xl">Related Courses</h2>
            <Button
              type="neutral"
              className="flex items-center gap-4 py-3"
              size="sm"
            >
              View All <FaArrowRight />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <ul className="flex w-max gap-x-6">
              {relatedCourses.slice(0, 4).map((course, index) => (
                <li
                  key={course.id}
                  className={` ${index >= 2 ? 'hidden 2xl:block' : ''}`}
                >
                  <Card course={course} />
                </li>
              ))}
            </ul>
          </div>
          <p className="py-2">©️ 2025 EduQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default CourseDetails;
