import ProgressBar from '../ProgressBar';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CiClock2 } from 'react-icons/ci';
import { MdOutlinePlayCircle } from 'react-icons/md';

const sectionDuration = (section) => {
  const minutes = section?.lectures?.reduce((acc, lecture) => {
    return acc + Number(lecture.content_info.split(' ')[0]);
  }, 0);
  const hours = (minutes / 60).toFixed(2);

  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  else return `${hours} Hour${hours > 1 ? 's' : ''}`;
};

function CourseContent({ sections }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], // Toggle state
    }));
  };

  return (
    <div className="flex flex-col gap-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-140 lg:min-w-110">
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl">Course Content</h1>
        <p className="text-[#876A9A]">
          <span>15%</span> Completed
        </p>
      </div>

      <ProgressBar progress={15} />

      <div className="flex flex-col bg-white font-normal">
        {sections.map((section) => (
          <div key={section.id}>
            <div
              className="list-icon flex h-10 cursor-pointer justify-between px-2 hover:bg-gray-100"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="list-icon text-xs font-semibold">
                <IoIosArrowDown
                  size={16}
                  className={`transform transition-transform duration-300 ${
                    openSections[section.id] ? 'rotate-180' : ''
                  }`}
                />
                {section.title}
              </h3>
              <div className="flex gap-x-1 text-xs text-nowrap text-[#4E5566]">
                <p className="list-icon">
                  <MdOutlinePlayCircle size={16} color="#876A9A" />
                  {section?.lectures?.length} Lectures
                </p>
                <p className="list-icon">
                  <CiClock2 color="#876A9A" size={16} />
                  {sectionDuration(section)}
                </p>
              </div>
            </div>
            {openSections[section.id] && (
              <ul className="flex flex-col gap-x-2">
                {section.Lectures.map((lecture) => (
                  <li
                    key={lecture.id}
                    className={`list-icon cursor-pointer px-2 py-2 text-xs transition-all duration-100 hover:bg-gray-100`}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex gap-x-3">
                        <input
                          type="checkbox"
                          className="scale-150 accent-black outline-none checked:accent-sky-700"
                        />
                        <span className="">{lecture.title}</span>
                      </div>

                      <p className="list-icon text-gray-500">
                        {lecture.type === 'video' ? (
                          open === lecture.name ? (
                            <FaPause size={8} />
                          ) : (
                            <FaPlay size={8} />
                          )
                        ) : (
                          ''
                        )}
                        <span className="min-w-10 text-end">
                          {lecture.content_info}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseContent;
