import Exams from '../../assets/exams.png';
import CourseApp from '../../assets/course-app.png';
import BigIcon from '../../assets/big-icon.png';
import Ebook from '../../assets/ebook.png';
import Video from '../../assets/video.png';

function ImageGroup() {
  return (
    <div className="mt-12 grid grid-cols-2 grid-rows-4 gap-y-16  md:grid-cols-4 md:grid-rows-4 md:gap-10 lg:h-fit lg:grid-cols-8 lg:grid-rows-7 lg:gap-0 overflow-hidden">
      {/* Course App - Always Visible */}
      <img
        src={CourseApp}
        alt="Course App"
        className="col-span-2 row-span-2 h-full w-full max-w-[580px] object-contain md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-4"
      />

      {/* Other images - Hidden on mobile (block on md+) */}
      <img
        src={BigIcon}
        alt="Eduquest"
        className="col-span-1 row-span-1 hidden h-full w-full max-w-[514px] object-contain md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2 lg:block"
      />

      <img
        src={Ebook}
        alt="Ebook"
        className="col-span-2 row-span-2 hidden h-full w-full max-w-[563px] object-contain md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-3 lg:block"
      />

      {/* Exams - Always Visible */}
      <img
        src={Exams}
        alt="Exams"
        className="col-span-2 row-span-2 h-full w-full max-w-[447px] object-contain md:col-span-2 md:row-span-2 lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-5"
      />

      <img
        src={Video}
        alt="Video"
        className="col-span-2 row-span-2 hidden max-w-[1077px] object-contain md:col-span-4 md:row-span-2 md:block lg:col-span-5 lg:row-span-4 lg:h-full"
      />
    </div>
  );
}

export default ImageGroup;
