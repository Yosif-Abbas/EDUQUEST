import { useState } from 'react';
import { useParams } from 'react-router-dom';

import VideoPlayer from '../../components/VideoPlayer';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import CourseHeader from './../../components/CourseWatch/CourseHeader';
import LectureHeader from '../../components/CourseWatch/LectureHeader';

import TeacherStudentNavbar from '../../components/TeacherStudentNavbar';
import CourseContent from '../../components/CourseWatch/CourseContent';
import LectureDescription from '../../components/CourseWatch/LectureDescription';
import LectureNotes from '../../components/CourseWatch/LectureNotes';
import LectureFile from '../../components/CourseWatch/LectureFile';
import CommentsSection from '../../components/CourseWatch/CommentsSection';

import { useCourse } from '../../hooks/useCourse';
import { useEnrolledCourse } from '../../hooks/useEnrolledCourse';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function WatchCourse() {
  const { id } = useParams();
  const [currentLecture, setCurrentLecture] = useState({
    sectionIndex: 0,
    lectureIndex: 0,
  });

  const { course, isError, isLoading } = useCourse(id);
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();

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

  if (isError) return <div>Error fetching course data.</div>;

  return (
    <div>
      <div>
        <TeacherStudentNavbar />
        <Header />
        {!isLoadingEnrolledCourse && (
          <CourseHeader
            course={course}
            currentLecture={currentLecture}
            enrolledCourse={enrolledCourse}
          />
        )}
      </div>

      <div className="grid gap-2 px-2 lg:grid-cols-[2fr_1fr]">
        {/* These divs are important for layout */}
        <div>
          <div className="mx-auto flex max-w-5xl flex-col gap-4 pb-3">
            <div>
              <VideoPlayer
                src={course.intro}
                poster={course.image_url}
                subtitleSrc="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/subtitles//subtitles.vtt"
              />
            </div>

            <LectureHeader />
          </div>
        </div>
        <CourseContent sections={course.course_sections} />

        <div className="col-start-1 mx-auto flex max-w-5xl flex-col gap-4 pb-4">
          <LectureDescription
            description={
              course.course_sections[currentLecture.sectionIndex].description
            }
          />
          <LectureNotes
            notes={
              course.course_sections[currentLecture.sectionIndex].description
            }
          />
          {/* <LectureFile /> */}
          {/* <CommentsSection comments={course.course_sections.comments} /> */}
        </div>
      </div>
    </div>
  );
}

export default WatchCourse;
