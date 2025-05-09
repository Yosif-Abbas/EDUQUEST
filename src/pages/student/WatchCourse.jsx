import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

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
import NotFound from '../NotFound';

function WatchCourse() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSec = +searchParams.get('sec') || 1;
  const currentLec = +searchParams.get('lec') || 1;

  const { course, error, isLoading } = useCourse(id);
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { course_sections } = course;

  const { enrolledCourse, isLoading: isLoadingEnrolledCourse, error: errorEnrolledCourse } =
    useEnrolledCourse({
      courseId: id,
      studentId: currentUser?.id,
    });

  if (isLoading || isLoadingEnrolledCourse)
    return (
      <div className="flex h-dvh w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );
    
  if (error) return (<div className="flex h-dvh w-full items-center justify-center pb-25">
      <div>Error fetching course data.</div>
    </div>);

  if(errorEnrolledCourse ) return <div className='flex flex-col h-dvh w-full items-center justify-center text-2xl gap-y-2'>
    <p>You don&apos;t own this course.</p>
    <p>Go enroll in the course 😄</p>
    <button className='bg-[#526d82] text-white px-2 py-2 rounded-xs' onClick={()=>navigate(`/courses/${id}`)}>Back to the course</button>
  </div>;

  const lecture = course_sections[currentSec - 1].lectures[currentLec - 1];


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
          <div>
            <div className="mx-auto flex max-w-5xl flex-col gap-4 pb-3">
              <div className="">
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
              </div>

              <LectureHeader lecture={lecture} />
            </div>
          </div>
        ) : (
          <NotFound />
        )}
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
