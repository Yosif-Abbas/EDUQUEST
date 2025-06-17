import { useState } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlinePlayCircle } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { calculateSectionDuration } from '../../utils/helpers';
import ProgressBar from '../ProgressBar';

const sectionDuration = (section) => {
  const minutes = section?.lectures?.reduce((acc, lecture) => {
    return acc + Number(lecture.content_info.split(' ')[0]);
  }, 0);

  const hours = Math.floor(minutes / 60);

  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  else
    return `${hours} Hour${hours > 1 ? 's' : ''} ${minutes ? (minutes % 60) + ' min' : ''}`;
};

function CourseContent({ sections }) {
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], // Toggle state
    }));
  };
  // const sectionMinutes = getFormattedTotalDuration(sections, true);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSec = +searchParams.get('sec') || 1;
  const currentLec = +searchParams.get('lec') || 1;

  const handleSelectLecture = ({ sec, lec }) => {
    setSearchParams({ sec, lec });
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
        {sections.map((section, i) => (
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
                  {calculateSectionDuration(section)}
                </p>
              </div>
            </div>

            {openSections[section.id] && (
              <ul className="flex flex-col gap-x-2">
                {section.lectures.map((lecture, j) => (
                  <li key={lecture.id} className={`list-icon text-xs`}>
                    <div className="flex w-full justify-between">
                      <div className="ml-2 flex gap-x-3">
                        <input
                          type="checkbox"
                          className="scale-150 accent-black outline-none checked:accent-sky-700"
                        />
                      </div>

                      <div
                        className={`ml-2 flex w-full cursor-pointer justify-between px-2 py-2 transition-all duration-100 hover:bg-gray-100 ${currentSec === i + 1 && currentLec === j + 1 ? 'pointer-events-none cursor-default bg-gray-300 hover:bg-gray-300' : ''}`}
                        onClick={() =>
                          handleSelectLecture({ sec: i + 1, lec: j + 1 })
                        }
                      >
                        <span className="">{lecture.title}</span>
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
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* <div>
          <div
            className="list-icon flex h-10 cursor-pointer justify-between px-2 hover:bg-gray-100"
            onClick={() => toggleSection(sections[0].id)}
          >
            <h3 className="list-icon text-xs font-semibold">
              <IoIosArrowDown
                size={16}
                className={`transform transition-transform duration-300 ${
                  openSections[sections[0].id] ? 'rotate-180' : ''
                }`}
              />
              {sections[0].title}
            </h3>
            <div className="flex gap-x-1 text-xs text-nowrap text-[#4E5566]">
              <p className="list-icon">
                <MdOutlinePlayCircle size={16} color="#876A9A" />
                {sections[0]?.lectures?.length} Lectures
              </p>
              <p className="list-icon">
                <CiClock2 color="#876A9A" size={16} />
                {calculateSectionDuration(sections[0])}
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-x-2">
            <li className={`list-icon text-xs`}>
              <div className="flex w-full justify-between">
                <div className="ml-2 flex gap-x-3">
                  <input
                    type="checkbox"
                    className="scale-150 accent-black outline-none checked:accent-sky-700"
                  />
                </div>

                <div
                  className={`ml-2 flex w-full cursor-pointer justify-between px-2 py-2 transition-all duration-100 hover:bg-gray-100 ${currentSec === sections[0].length && currentLec === sections[0].lectures.length ? 'pointer-events-none cursor-default bg-gray-300 hover:bg-gray-300' : ''}`}
                  onClick={() =>
                    handleSelectLecture({
                      sec: sections[0].length,
                      lec: sections[0].lectures.length,
                    })
                  }
                >
                  <span className="">{sections[0].lectures[0].title}</span>
                  <p className="list-icon text-gray-500">
                    {open === sections[0].lectures[0].name ? (
                      <FaPause size={8} />
                    ) : (
                      <FaPlay size={8} />
                    )}
                    <span className="min-w-10 text-end">
                      {sections[0].lectures[0].content_info}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default CourseContent;
