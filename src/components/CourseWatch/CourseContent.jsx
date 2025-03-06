import ProgressBar from '../ProgressBar';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { CiClock2 } from 'react-icons/ci';
import { MdOutlinePlayCircle } from 'react-icons/md';
import { PiChecksBold } from 'react-icons/pi';

function CourseContent({ sections }) {
  const [open, setOpen] = useState('Introduction Video');

  return (
    <div className="flex flex-col gap-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-120 lg:min-w-110">
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl">Course Content</h1>
        <p className="text-[#876A9A]">
          <span>15%</span> Completed
        </p>
      </div>

      <ProgressBar progress={15} />

      <div className="flex flex-col bg-white font-normal">
        {sections.map((section, index) => (
          <div key={index}>
            <div className="list-icon flex h-10 cursor-pointer justify-between px-2 hover:bg-gray-100">
              <h3 className="text-md list-icon">
                <IoIosArrowUp />
                {section.title}
              </h3>
              <div className="flex gap-x-2 text-xs text-[#4E5566]">
                <p className="list-icon">
                  <MdOutlinePlayCircle size={16} color="#876A9A" />4 Lectures
                </p>
                <p className="list-icon">
                  <CiClock2 color="#876A9A" size={16} />
                  51m
                </p>
                <p className="list-icon">
                  <PiChecksBold color="#876A9A" size={16} />
                  25% Finished <span>(1/4)</span>
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-x-2">
              {section.lectures.map((lecture, i) => (
                <li
                  key={i}
                  className={`list-icon cursor-pointer px-2 py-2 text-xs transition-all duration-100 ${open === lecture.name ? 'bg-[#FFEEE8]' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex w-full justify-between">
                    <div className="flex gap-x-3">
                      <input
                        type="checkbox"
                        className="scale-150 accent-black outline-none checked:accent-sky-700"
                        checked={open === lecture.name}
                      />
                      <span className="">{lecture.name}</span>
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
                        {lecture.description}
                      </span>
                    </p>
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

export default CourseContent;
