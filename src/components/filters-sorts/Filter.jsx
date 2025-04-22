import { X } from 'lucide-react';
import { useState } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useSearchParams } from 'react-router-dom';

const categories = [
  'Science',
  'Mathematics',
  'Thinking & Speaking',
  'Economics & Business',
  'Writing',
  'History & Social Studies',
  'Language',
  'Other',
];

function Filter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  let currentFilter = searchParams.get('category') || 'all';

  console.log(currentFilter);

  function handleFilter() {
    if (filter) {
      searchParams.set('category', filter);
    }
    setSearchParams(searchParams);
    setIsModalOpen(false);
  }

  function handleClearFilter() {
    setFilter('');
    currentFilter = 'all';
    searchParams.delete('category');
    setSearchParams(searchParams);
    setIsModalOpen(false);
  }

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
                        value={category.toLowerCase()}
                        onChange={(e) => setFilter(e.target.value)}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearFilter}
                className="bg-L1 text-L4 rounded-md px-4 py-2 text-sm font-semibold"
              >
                Clear
              </button>

              <button
                onClick={handleFilter}
                className="bg-L4 rounded-md px-4 py-2 text-sm font-semibold text-white"
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
