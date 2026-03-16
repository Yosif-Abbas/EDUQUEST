import { useSearchParams } from 'react-router-dom';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import PaginationButton from './PaginationButton';

const pageSize = import.meta.env.VITE_PAGE_SIZE;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="mx-auto mb-4 flex w-full max-w-100 items-center justify-center gap-x-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <GoArrowLeft size={32} color={`${currentPage === 1 ? '#526D8280' : '#1D2026'}`} />
      </button>

      {Array.from({ length: pageCount }, (_, index) => (
        <PaginationButton key={index} currentPage={currentPage} buttonNumber={index + 1} />
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className={currentPage === pageCount ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <GoArrowRight
          size={32}
          color={`${currentPage === pageCount ? '#526D8280' : '#1D2026'}`}
        />
      </button>
    </div>
  );
}

export default Pagination;
