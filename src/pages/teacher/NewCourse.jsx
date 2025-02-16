import { useState } from 'react';
import { FaClipboardList, FaInfoCircle, FaPlayCircle } from 'react-icons/fa';
import { PiMonitorPlayFill } from 'react-icons/pi';
import BasicInfo from './BasicInfo';
import AdvancedInfo from './AdvancedInfo';
import Curriculum from './Curriculum';
import PublishCourse from './PublishCourse';

const newCourseInfoTabs = [
  {
    id: 0,
    icon: <FaInfoCircle />,
    title: 'Basic Information',
    element: <BasicInfo />,
  },
  {
    id: 1,
    icon: <FaClipboardList />,
    title: 'Advanced Information',
    element: <AdvancedInfo />,
  },
  {
    id: 2,
    icon: <PiMonitorPlayFill />,
    title: 'Curriculum',
    element: <Curriculum />,
  },
  {
    id: 3,
    icon: <FaPlayCircle />,
    title: 'Publish Course',
    element: <PublishCourse />,
  },
];

function NewCourse() {
  const [currentTab, setCurrentTab] = useState(1);

  function handleNext() {
    // Savieg Logic

    if (currentTab !== newCourseInfoTabs.length - 1)
      setCurrentTab((pre) => pre + 1);
  }
  function handlePrevious() {
    if (currentTab !== 0) setCurrentTab((pre) => pre - 1);
  }

  return (
    <main>
      <ul className={`flex border-b border-white`}>
        {newCourseInfoTabs.map(({ id, icon, title }) => (
          <li
            key={id}
            // onClick={() => setCurrentTab(id)}
            className={`relative flex items-center gap-2 p-3 after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#FF6636] after:transition after:duration-300 after:content-[''] ${id === currentTab && 'after:scale-x-100'} ${id !== currentTab && 'hidden'} lg:flex lg:basis-1/4 lg:gap-2 lg:p-5`}
          >
            {icon}
            <span className="lg:text-sm xl:text-lg">{title}</span>
          </li>
        ))}
      </ul>
      <section className="p-8">
        <h2 className="mb-6 text-2xl font-bold">
          {newCourseInfoTabs[currentTab].title}
        </h2>

        {newCourseInfoTabs[currentTab].element}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            className="border-pinky-violet border-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-[16px]"
          >
            {newCourseInfoTabs[currentTab].id === 0 ? 'Cancel' : 'Previous'}
          </button>
          <button
            onClick={handleNext}
            className="bg-pinky-violet px-2 py-1 text-sm text-white md:px-4 md:py-2 md:text-[16px]"
          >
            {newCourseInfoTabs[currentTab].id === newCourseInfoTabs.length - 1
              ? 'Publish'
              : 'Save & Next'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default NewCourse;
