import { CiClock2 } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { PiFolderOpen } from 'react-icons/pi';
import Button from '../Button';

function CourseHeader() {
  return (
    <div className="my-6 flex h-18 items-center justify-between bg-[#9DB2BF] px-2 md:h-24">
      {/* Left */}
      <div className="flex min-w-76 items-center gap-x-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white md:h-10 md:w-10">
          <GoArrowLeft size={18} />
        </button>

        <div className="flex flex-col gap-y-2">
          <h3>Chapter #1 in (Math) Lecture #1</h3>
          <ul className="flex gap-x-2 text-xs font-normal lg:text-sm">
            <li className="list-icon">
              <PiFolderOpen color="#876A9A" size={16} />
              <span>5 sections</span>
            </li>
            <li className="list-icon">
              <IoPlayCircleOutline color="#526D82" size={16} />
              <span>3 lectures</span>
            </li>
            <li className="list-icon">
              <CiClock2 color="#526D82" size={16} />
              <span>12h 37m</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right */}
      <div className="flex w-fit flex-row-reverse flex-wrap justify-center gap-x-2">
        <Button size="sm">Next Lecture</Button>
        <Button size="sm" type="secondary" className="border-none bg-white">
          Write A Review
        </Button>
      </div>
    </div>
  );
}

export default CourseHeader;
