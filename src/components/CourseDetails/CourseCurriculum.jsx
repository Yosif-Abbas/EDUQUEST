import { CiClock2, CiFileOn } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { PiFolderOpen } from 'react-icons/pi';

function CourseCurriculum({ sections }) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="mb-4 text-xl">Curriculum</h1>
        <div>
          <ul className="flex gap-x-2 text-sm font-normal">
            <li className="list-icon">
              <PiFolderOpen color="#FF6636" />
              <span>5 sections</span>
            </li>
            <li className="list-icon">
              <IoPlayCircleOutline color="#564FFD" />
              <span>3 lectures</span>
            </li>
            <li className="list-icon">
              <CiClock2 color="#FD8E1F" />
              <span>12h 37m</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto flex w-full max-w-200 flex-col bg-white pr-3">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border-b-1 border-gray-100 text-xs font-normal transition-all"
          >
            <div className="flex cursor-pointer justify-between py-3 duration-150 hover:bg-gray-100">
              <h2 className="ml-4 flex items-center">
                <IoIosArrowDown size={16} />
                <span className="ml-2">{section.title}</span>
              </h2>
              <div className="flex items-center gap-x-2 text-gray-500">
                <PiFolderOpen color="#FF6636" />
                <span>{section.files.length} files</span>
                <CiClock2 color="#FD8E1F" />
                <span>{section.duration}</span>
              </div>
            </div>
            <ul className="flex flex-col gap-x-2">
              {section.files.map((file, i) => (
                <li key={i} className="list-icon ml-2 py-1">
                  {file.type === 'material' && <CiFileOn />}
                  {file.type === 'video' && <FaPlay size={8} />}
                  <div className="flex w-full justify-between">
                    <span className="">{file.name}</span>
                    <span className="text-gray-600">{file.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseCurriculum;
