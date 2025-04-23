import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    if (searchValue) {
      searchParams.set('search', searchValue);
      searchParams.delete('page');
      searchParams.delete('category');

      setSearchParams(searchParams);
      setSearchValue('');
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`,
    );
  };

  return (
    <form
      className="relative h-[48px] w-full max-w-130 self-end"
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={`outline-L2 h-full w-full border-[#E9EAF0] bg-white pl-12 font-normal transition-all duration-300 sm:border-2 lg:w-full`}
      />
      <button
        className={`absolute top-1/2 left-0 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full`}
      >
        <CiSearch size={26} />
      </button>
    </form>
  );
}

export default Search;
