import { useSearchParams } from 'react-router-dom';

import { FaChevronDown } from 'react-icons/fa';

function SortBy({ sortbyField, options = [], vertical = true, className = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortbyField) || options[0].value;

  function handleSort(e) {
    searchParams.set(sortbyField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className={`flex items-center ${className}`}>
      <h3
        className={
          vertical ? 'mb-2 text-[12px] text-[#6E7485]' : 'mr-2 hidden sm:inline-block md:mr-4'
        }
      >
        Sort by:
      </h3>
      <div className="relative">
        <select value={currentSort} onChange={handleSort} className="select" id="select">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2"
        >
          <FaChevronDown size={12} />
        </span>
      </div>
    </div>
  );
}

export default SortBy;
