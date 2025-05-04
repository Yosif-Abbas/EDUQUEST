import { useState } from 'react';
import { CiClock2, CiFileOn } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { PiFolderOpen } from 'react-icons/pi';

import { calculateSectionDuration } from '../../utils/helpers';
import { getFormattedTotalDuration } from '../../utils/helpers';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function CourseCurriculum({ sections }) {
  const {
    currentUser,
    isLoading: isLoadingUser,
    isAuthenticated,
  } = useCurrentUser();

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], // Toggle state
    }));
  };

  // Calculate the total number of lectures
  const lecturesCount = sections.reduce(
    (count, section) => count + (section.lectures?.length || 0),
    0,
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="mb-4 text-xl lg:text-2xl">Curriculum</h1>
        <div>
          <ul className="flex gap-x-2 text-sm font-normal lg:text-base">
            <li className="list-icon">
              <PiFolderOpen color="#FF6636" />
              <span>{sections.length} sections</span>
            </li>
            <li className="list-icon">
              <IoPlayCircleOutline color="#564FFD" />
              <span>{lecturesCount} lectures</span>
            </li>
            <li className="list-icon">
              <CiClock2 color="#FD8E1F" />
              <span>{getFormattedTotalDuration(sections)} </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto flex w-full flex-col bg-white">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b- border-gray-100 text-xs font-normal transition-all lg:text-sm"
          >
            {/* Section Header */}
            <div
              className="flex cursor-pointer justify-between py-3 pr-3 duration-150 hover:bg-gray-100"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="ml-4 flex items-center font-semibold">
                <IoIosArrowDown
                  size={16}
                  className={`transform transition-transform duration-300 ${
                    openSections[section.id] ? 'rotate-180' : ''
                  }`}
                />
                <span className="ml-2">{section.title}</span>
              </h2>
              <div className="flex items-center gap-x-2">
                <IoPlayCircleOutline color="#564FFD" />
                <span className="text-nowrap">
                  {section.lectures.length} lectures
                </span>
                <CiClock2 color="#FD8E1F" />
                <span className="text-nowrap">
                  {calculateSectionDuration(section)}
                </span>
              </div>
            </div>

            {/* Lectures List (Visible only if section is open) */}
            {openSections[section.id] && (
              <ul className="flex flex-col gap-x-2">
                {section.lectures?.map((lecture) => (
                  <li
                    key={lecture.id}
                    className={`list-icon ${isAuthenticated ? 'cursor-pointer' : ''} px-2 py-2 hover:bg-gray-100`}
                  >
                    {lecture.type === 'file' && <CiFileOn />}
                    {lecture.type === 'video' && <FaPlay size={8} />}
                    <div className="flex w-full justify-between">
                      <span className="text-gray-500">{lecture.title}</span>
                      <span className="text-gray-500">
                        {lecture.content_info}
                      </span>
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

export default CourseCurriculum;
