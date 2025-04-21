import { useState } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import Selector from './Selector';
import Search from './filters-sorts/Search';
import SortBy from './filters-sorts/SortBy';

const filters = { subject: 'math' };

// const sorts = [
//   { trending: 'Trending' },
//   { subject: 'Subject' },
//   { price: 'Price' },
//   { asc: 'Asc' },
//   { desc: 'Desc' },
//   { rating: 'Rating' },
// ];

const sorts = [
  { label: 'Most Recent', value: 'created_at-asc' },
  { label: 'Old', value: 'created_at-des' },
  { label: 'Highest Rated', value: 'rating-des' },
  { label: 'Lowest Rated', value: 'rating-asc' },
];

function SearchControls() {
  const [searchedWords, setSearchedWords] = useState('Math');

  return (
    <div className="">
      <div className="flex h-[48px] justify-between gap-x-4">
        {/* filter and search */}
        <div className="flex w-fit flex-1 gap-x-4">
          {/* filter */}
          <button className="relative flex h-[48px] w-35 appearance-none items-center justify-around border-1 border-[#FFEEE8] bg-white px-3 py-1.5 text-base font-semibold">
            <GiSettingsKnobs />
            <span className="mr-4">Filter</span>
            {/* options */}
            <span className="bg-[#FFEEE8] px-1.5 text-[#FF6636]">
              {Object.keys(filters).length}
            </span>
          </button>

          {/* search */}
          <Search />
        </div>

        {/* sort */}
        <SortBy options={sorts} sortbyField="sortBy" vertical={false} />
        {/* <Selector options={sorts} id="sort" label="Sort By:" /> */}
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
