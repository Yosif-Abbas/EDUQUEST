import Search from './filters-sorts/Search';
import SortBy from './filters-sorts/SortBy';
import Filter from './filters-sorts/Filter';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';

const sorts = [
  { label: 'Most Recent', value: 'created_at-des' },
  { label: 'Old', value: 'created_at-asc' },
  { label: 'Highest Rated', value: 'rating-des' },
  { label: 'Lowest Rated', value: 'rating-asc' },
];

function SearchControls({ resultsNumber, isLoading }) {
  const [searchParams] = useSearchParams();
  const searchWords = searchParams.get('search') || '';

  return (
    <div className="">
      <div className="flex h-[48px] justify-between gap-x-4">
        {/* filter and search */}
        <div className="flex w-fit flex-1 gap-x-2 md:gap-x-8">
          {/* filter */}
          <Filter />

          {/* search */}
          <Search />
        </div>

        {/* sort */}
        <SortBy options={sorts} sortbyField="sortBy" vertical={false} />
      </div>

      <div className="text-L4 flex h-[48px] items-center justify-center border-1 border-[#E9EAF0] bg-white">
        {isLoading && <Spinner size={20} />}
        {resultsNumber > 0 && (
          <p>
            <span>{resultsNumber}</span> Results
            {searchWords !== '' && (
              <span>
                {' '}
                for &rdquo;
                {searchWords}&ldquo;
              </span>
            )}
          </p>
        )}
        {resultsNumber <= 0 && !isLoading && (
          <p>Search for your desired course</p>
        )}
      </div>
    </div>
  );
}

export default SearchControls;
