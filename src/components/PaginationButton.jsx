import { useSearchParams } from 'react-router-dom';

function PaginationButton({ currentPage, buttonNumber }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNumber() {
    searchParams.set('page', buttonNumber);
    setSearchParams(searchParams);
  }

  return (
    <button
      className={`hover:bg-[#9db2bf] text-L4 h-12 w-12 rounded-full text-base ${currentPage === buttonNumber && 'hover:bg-[#526d82] bg-[#526d82] cursor-not-allowed text-white'}`}
      disabled={currentPage === buttonNumber}
      onClick={handleNumber}
    >
      <span>{buttonNumber}</span>
    </button>
  );
}

export default PaginationButton;
