import { useParams, useSearchParams } from 'react-router-dom';

import VideoPlayer from '../../components/VideoPlayer';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import CourseHeader from './../../components/CourseWatch/CourseHeader';
import LectureHeader from '../../components/CourseWatch/LectureHeader';

import TeacherStudentNavbar from '../../components/TeacherStudentNavbar';
import CourseContent from '../../components/CourseWatch/CourseContent';

import { useCourse } from '../../hooks/useCourse';
import { useEnrolledCourse } from '../../hooks/useEnrolledCourse';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function WatchCourse() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSec = +searchParams.get('sec') || 1;
  const currentLec = +searchParams.get('lec') || 1;

  const { course, isError, isLoading } = useCourse(id);
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { course_sections } = course;

  const { enrolledCourse, isLoading: isLoadingEnrolledCourse } =
    useEnrolledCourse({
      courseId: id,
      studentId: currentUser?.id,
    });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  const lecture = course_sections[currentSec - 1].lectures[currentLec - 1];

  console.log(lecture.type && lecture.file_url);

  if (isError) return <div>Error fetching course data.</div>;

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
        <div>
          <div className="mx-auto flex max-w-5xl flex-col gap-4 pb-3">
            <div>
              {lecture.type === 'video' && (
                <VideoPlayer
                  key={lecture.videos[0].id}
                  src={lecture.videos[0].video_url}
                  poster={course.image_url}
                  subtitleSrc={lecture.videos[0].video_url}
                />
              )}
              {lecture.type === 'file' && (
                <div className="mx-auto aspect-video h-130 w-110 max-w-5xl overflow-hidden rounded-lg shadow-md">
                  <iframe
                    src={lecture.file_url}
                    className="h-full w-full"
                    title="Lecture PDF"
                  />
                </div>
              )}
            </div>

            <LectureHeader lecture={lecture} />
          </div>
        </div>
        <CourseContent sections={course.course_sections} />
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
