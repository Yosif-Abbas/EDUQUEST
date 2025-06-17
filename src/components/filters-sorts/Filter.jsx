import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../../hooks/useGetCategories';

// const categories = [
//   'Science',
//   'Mathematics',
//   'Thinking & Speaking',
//   'Economics & Business',
//   'Writing',
//   'History & Social Studies',
//   'Language',
//   'Other',
// ];

function Filter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { categories, isLoading } = useCategories();

  const [filter, setFilter] = useState(searchParams.get('category') || 'all');

  function handleFilter() {
    if (filter) {
      searchParams.set('category', filter);
      searchParams.delete('page');
    }
    setSearchParams(searchParams);
    setIsModalOpen(false);
  }

  function handleClearFilter() {
    setFilter('');
    searchParams.delete('category');
    searchParams.delete('page');
    setSearchParams(searchParams);
    setIsModalOpen(false);
  }

  useEffect(
    function () {
      const filterValue = searchParams.get('category');
      setFilter(filterValue);
    },
    [searchParams],
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="relative flex h-[48px] w-35 appearance-none items-center justify-around border-1 border-[#FFEEE8] bg-white px-3 py-1.5 text-base font-semibold"
      >
        <GiSettingsKnobs />
        <span className="mr-4">Filter</span>
        <span className="bg-[#FFEEE8] px-1.5 text-[#FF6636]">
          {filter ? 1 : 0}
        </span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={toggleModal}
        >
          <div
            className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-L4 text-xl font-bold">Filter Options</h2>
              <button onClick={toggleModal} className="text-L4">
                <X />
              </button>
            </div>
            {/* Place your filter form/components here */}
            <div className="hide-scroll-arrows mx-auto mt-4 flex h-80 w-68 flex-col justify-center gap-2 overflow-y-scroll">
              {categories &&
                categories
                  .sort((a, b) => (a === 'Other' ? 1 : b === 'Other' ? -1 : 0))
                  .map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <label
                        key={category}
                        htmlFor={category}
                        className="text-md text-L4 cursor-pointer font-medium"
                      >
                        {category}
                      </label>
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={filter === category.toLowerCase()}
                        onChange={(e) => setFilter(e.target.value)}
                        value={category.toLowerCase()}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
            </div>

            <div className="flex justify-end gap-x-4">
              <button
                onClick={handleClearFilter}
                className="text-L4 rounded-md bg-[#dde6ed] px-4 py-2 text-sm font-semibold"
              >
                Clear
              </button>

              <button
                onClick={handleFilter}
                className={`rounded-md bg-[#27374d] px-4 py-2 text-sm font-semibold text-white ${!filter ? 'cursor-not-allowed opacity-40' : ''}`}
                disabled={!filter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
