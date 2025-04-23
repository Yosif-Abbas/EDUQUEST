import { useSearchParams } from 'react-router-dom';

function PaginationButton({ currentPage, buttonNumber }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNumber() {
    searchParams.set('page', buttonNumber);
    setSearchParams(searchParams);
  }

  return (
    <button
      className={`hover:bg-L2 text-L4 h-12 w-12 rounded-full text-base ${currentPage === buttonNumber && 'hover:bg-L3 bg-L3 text-white'}`}
      disabled={currentPage === buttonNumber}
      onClick={handleNumber}
    >
      <span>{buttonNumber}</span>
    </button>
  );
}

export default PaginationButton;
