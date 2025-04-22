import { useState } from 'react';

import Search from './filters-sorts/Search';
import SortBy from './filters-sorts/SortBy';
import Filter from './filters-sorts/Filter';

const sorts = [
  { label: 'Most Recent', value: 'created_at-des' },
  { label: 'Old', value: 'created_at-asc' },
  { label: 'Highest Rated', value: 'rating-des' },
  { label: 'Lowest Rated', value: 'rating-asc' },
];

function SearchControls({ categories }) {
  const [searchedWords, setSearchedWords] = useState('Math');

  return (
    <div className="">
      <div className="flex h-[48px] justify-between gap-x-4">
        {/* filter and search */}
        <div className="flex w-fit flex-1 gap-x-4">
          {/* filter */}
          <Filter categories={categories} />

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
