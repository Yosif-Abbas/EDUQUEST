import { useState } from 'react';
import Card from '../components/Card';
import Loading from '../components/Loading';

import { useCourses } from '../hooks/useCourses';
import { GiSettingsKnobs } from 'react-icons/gi';
import Selector from '../components/Selector';
import { CiSearch } from 'react-icons/ci';

const sorts = [
  { trending: 'Trending' },
  { subject: 'Subject' },
  { price: 'Price' },
  { asc: 'Asc' },
  { desc: 'Desc' },
  { rating: 'Rating' },
];

function Courses() {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearch = () => {
    setShowSearchInput((pre) => !pre);
  };

  const { courses, isLoading, isError } = useCourses();

  const filters = { subject: 'math' };

  if (isError) return <div>Error fetching courses</div>;

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center pb-25">
        <Loading size={150} />
      </div>
    );

  return (
    <div className="mx-auto max-w-[1320px] px-2">
      <div className="flex justify-between gap-x-4">
        {/* filter and search */}
        <div className="flex w-fit flex-1 gap-x-4">
          {/* filter */}
          <button className="border- relative flex h-[48px] w-35 appearance-none items-center justify-around border-1 border-[#FFEEE8] bg-white px-3 py-1.5 text-base font-semibold">
            <GiSettingsKnobs />
            <span className="mr-4">Filter</span>
            {/* options */}
            <span className="bg-[#FFEEE8] px-1.5 text-[#FF6636]">
              {Object.keys(filters).length}
            </span>
          </button>

          {/* search */}
          <div className="relative h-[48px] w-full">
            <input
              type="text"
              placeholder="Search"
              className={`h-full ${showSearchInput ? 'w-full' : 'w-0'} max-w-112 rounded-full border-[#E9EAF0] bg-white pl-12 font-normal transition-all duration-300 sm:w-full sm:border-2`}
            />
            <button
              className={`absolute top-1/2 left-0 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full ${showSearchInput ? 'rounded-r-none' : 'sm:rounded-r-none'}`}
              onClick={toggleSearch}
            >
              <CiSearch className="" size={26} />
            </button>
          </div>
        </div>

        {/* sort */}
        <Selector options={sorts} id="sort" label="Sort By:" />
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
        {courses &&
          courses.map((course) => <Card course={course} key={course.id} />)}
      </ul>
    </div>
  );
}

export default Courses;
