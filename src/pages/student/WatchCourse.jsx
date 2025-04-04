import { useParams } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer';

import Intro from '../../assets/intro.mp4';
import Subtitles from '../../assets/subtitles.vtt';
import Arabic from '../../assets/Arabic.png';

import Loading from '../../components/Loading';
import { useCourse } from '../../hooks/useCourse';
import Header from '../../components/Header';
import CourseHeader from './../../components/CourseWatch/CourseHeader';
import LectureHeader from '../../components/CourseWatch/LectureHeader';

import CourseContent from '../../components/CourseWatch/CourseContent';
import LectureDescription from '../../components/CourseWatch/LectureDescription';
import LectureNotes from '../../components/CourseWatch/LectureNotes';
import LectureFile from '../../components/CourseWatch/LectureFile';
import CommentsSection from '../../components/CourseWatch/CommentsSection';
import { useState } from 'react';

function WatchCourse() {
  const { id } = useParams();
  const [currentLecture, setCurrentLecture] = useState({
    sectionIndex: 0,
    lectureIndex: 0,
  });

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
      <div>
        <Header />
        <CourseHeader course={course} currentLecture={currentLecture} />
      </div>

      <div className="grid gap-2 lg:grid-cols-[2fr_1fr]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 pb-3">
          <VideoPlayer
            src={course.intro}
            poster={course.image_url}
            subtitleSrc={Subtitles}
          />
          <LectureHeader />
        </div>
        <CourseContent sections={course.course_sections} />

        <div className="col-start-1 mx-auto flex max-w-5xl flex-col gap-4 px-2 pb-4">
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
          <LectureFile />
          <CommentsSection comments={course.sections[0].comments} />
        </div>
      </div>
    </div>
  );
}

export default WatchCourse;
