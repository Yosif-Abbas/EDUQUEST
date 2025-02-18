import { useParams } from 'react-router-dom';
import { useCourse } from '../hooks/useCourse';
import Loading from '../components/Loading';
import CourseSidebar from '../components/CourseSidebar';
import VideoPlayer from '../components/VideoPlayer';

import Intro from '../assets/Intro.mp4';
import Subtitles from '../assets/subtitles.vtt';

import Arabic from '../assets/Arabic.png';

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
    <>
      {/* <video width="320" height="240" controls>
        <source
          src="https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
      <div>
        <VideoPlayer src={Intro} poster={Arabic} subtitleSrc={Subtitles} />
      </div>
      <CourseSidebar course={course} />
    </>
  );
}

export default CourseDetails;
