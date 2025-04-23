import { useSearchParams } from 'react-router-dom';

function SortBy({ sortbyField, options = [], vertical = true }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortbyField) || options[0].value;

  function handleSort(e) {
    searchParams.set(sortbyField, e.target.value);

    setSearchParams(searchParams);
  }

  return (
    <div className={vertical ? '' : '"relative w-fit"'}>
      <h3
        className={
          vertical
            ? 'mb-2 text-[12px] text-[#6E7485]'
            : 'mr-2 hidden sm:inline-block md:mr-4'
        }
      >
        Sort by:
      </h3>
      <select
        value={currentSort}
        onChange={(e) => handleSort(e)}
        className="w-25 truncate bg-white px-1 py-3 outline-0 md:w-40 md:p-3"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
