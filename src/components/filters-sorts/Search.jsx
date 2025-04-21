import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

function Search() {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearch = () => {
    setShowSearchInput((pre) => !pre);
  };

  return (
    <div className="relative h-[48px] self-end">
      <input
        type="text"
        placeholder="Search"
        className={`h-full ${showSearchInput ? 'w-full' : 'w-0'} max-w-112 border-[#E9EAF0] bg-white pl-12 font-normal transition-all duration-300 sm:border-2 lg:w-full`}
      />
      <button
        className={`absolute top-1/2 left-0 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full ${showSearchInput ? 'rounded-r-none' : 'sm:rounded-r-none'}`}
        onClick={toggleSearch}
      >
        <CiSearch size={26} />
      </button>
    </div>
  );
}

export default Search;
