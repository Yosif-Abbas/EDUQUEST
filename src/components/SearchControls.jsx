import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import Selector from './Selector';

const filters = { subject: 'math' };

const sorts = [
  { trending: 'Trending' },
  { subject: 'Subject' },
  { price: 'Price' },
  { asc: 'Asc' },
  { desc: 'Desc' },
  { rating: 'Rating' },
];

function SearchControls() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchedWords, setSearchedWords] = useState('Math');

  const toggleSearch = () => {
    setShowSearchInput((pre) => !pre);
  };

  return (
    <div className="">
      <div className="flex h-[48px] justify-between gap-x-4">
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
              className={`h-full ${showSearchInput ? 'w-full' : 'w-0'} max-w-112 border-[#E9EAF0] bg-white pl-12 font-normal transition-all duration-300 sm:w-full sm:border-2`}
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

      {searchedWords.length > 0 && (
        <div className="flex h-[48px] items-center justify-center border-1 border-[#E9EAF0] bg-white">
          <p>
            <span className="text-black">100</span> Results for &rdquo;
            {searchedWords}&ldquo;
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchControls;
