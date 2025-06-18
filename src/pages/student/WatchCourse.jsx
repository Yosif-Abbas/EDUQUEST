import { useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import LectureHeader from '../../components/CourseWatch/LectureHeader';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import VideoPlayer from '../../components/VideoPlayer';
import CourseHeader from './../../components/CourseWatch/CourseHeader';

import CourseContent from '../../components/CourseWatch/CourseContent';
import TeacherStudentNavbar from '../../components/TeacherStudentNavbar';

import Quiz from '../../components/Quiz';
import { useCourse } from '../../hooks/useCourse';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useEnrolledCourse } from '../../hooks/useEnrolledCourse';
import NotFound from '../NotFound';

function WatchCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { course, error, isLoading } = useCourse(id);
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { course_sections = [] } = course;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSec = +searchParams.get('sec') || 1;
  const currentLec = +searchParams.get('lec') || 1;

  const {
    enrolledCourse,
    isLoading: isLoadingEnrolledCourse,
    error: errorEnrolledCourse,
  } = useEnrolledCourse({
    courseId: id,
    studentId: currentUser?.id,
  });

  const lecture = course_sections[currentSec - 1]?.lectures[currentLec - 1];

  const handleQuizComplete = useCallback((score) => {
    // Here you can implement the logic to save the quiz results
    // For example, update the user's progress in the database
    console.log('Quiz completed with score:', score);
  }, []);

  if (isLoading || isLoadingEnrolledCourse)
    return (
      <div className="flex h-dvh w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  if (error)
    return (
      <div className="flex h-dvh w-full items-center justify-center pb-25">
        <div>Error fetching course data.</div>
      </div>
    );

  if (errorEnrolledCourse)
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-y-2 text-2xl">
        <p>You don&apos;t own this course.</p>
        <p>Go enroll in the course 😄</p>
        <button
          className="rounded-xs bg-[#526d82] px-2 py-2 text-white"
          onClick={() => navigate(`/courses/${id}`)}
        >
          Back to the course
        </button>
      </div>
    );

  return (
    <div>
      <div>
        <TeacherStudentNavbar />
        <Header />
        {!isLoadingEnrolledCourse && (
          <CourseHeader
            course={course}
            currentLec={currentLec}
            currentSec={currentSec}
            enrolledCourse={enrolledCourse}
          />
        )}
      </div>

      <div className="grid gap-2 px-2 pb-4 lg:grid-cols-[2fr_1fr]">
        {/* These divs are important for layout */}
        {lecture ? (
          <div className="flex max-w-5xl flex-col gap-4 pb-3">
            <div className="flex-1 shadow-xl">
              {lecture?.type === 'video' && lecture.videos[0]?.video_url && (
                <VideoPlayer
                  key={lecture.videos[0].id}
                  src={lecture.videos[0].video_url}
                  poster={course.image_url}
                  subtitleSrc={lecture.videos[0].video_url}
                  className="shadow-xl"
                />
              )}
              {lecture?.type === 'file' && (
                <div className="mx-auto h-120 w-full max-w-4xl shadow-xl">
                  <iframe
                    src={lecture.file_url}
                    className="h-full w-full"
                    title="Lecture PDF"
                  />
                </div>
              )}
              {lecture?.type === 'quiz' && (
                <div className="mx-auto h-120 min-h-fit w-full max-w-4xl bg-white shadow-xl">
                  <Quiz
                    questions={lecture?.questions}
                    onComplete={handleQuizComplete}
                  />
                </div>
              )}
            </div>

            <LectureHeader lecture={lecture} />
          </div>
        ) : (
          <NotFound />
        )}
        <CourseContent sections={course_sections} />
      </div>
    </div>
  );
}

export default WatchCourse;

{
  /* <div className="col-start-1 mx-auto flex w-full max-w-5xl flex-col gap-4 pb-4">
          <LectureDescription
            description={course.course_sections[currentLec - 1].description}
          />
          <LectureNotes
            notes={course.course_sections[currentLec - 1].description}
          />
          <LectureFile />
          <CommentsSection comments={course.course_sections.comments} />
        </div> */
}
