import Exams from '../../assets/exams.png';
import CourseApp from '../../assets/course-app.png';
import BigIcon from '../../assets/big-icon.png';
import Ebook from '../../assets/ebook.png';
import Video from '../../assets/video.png';

function ImageGroup() {
  return (
    <div className="mt-12 grid h-dvh grid-cols-8 grid-rows-7 gap-20">
      <img
        src={CourseApp}
        alt="Course App"
        className="col-span-3 col-start-1 row-span-4 row-start-1 h-full w-full object-contain"
      />
      <img
        src={BigIcon}
        alt="Eduquest"
        className="col-span-2 col-start-4 row-span-3 row-start-1 h-full w-full object-contain"
      />
      <img
        src={Ebook}
        alt="Ebook"
        className="col-span-3 col-start-6 row-span-3 row-start-1 h-full w-full object-contain"
      />
      <img
        src={Exams}
        alt="Exams"
        className="col-span-3 col-start-1 row-span-3 row-start-5 h-full w-full object-contain"
      />
      <img
        src={Video}
        alt="Video"
        className="col-span-5 col-start-4 row-span-4 row-start-4 h-full w-full object-contain"
      />
    </div>
  );
}

export default ImageGroup;
