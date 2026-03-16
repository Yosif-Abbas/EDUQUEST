import { useSearchParams } from 'react-router-dom';

function PaginationButton({ currentPage, buttonNumber }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNumber() {
    searchParams.set('page', buttonNumber);
    setSearchParams(searchParams);
  }

  return (
    <button
      className={`text-L4 h-12 w-12 rounded-full text-base hover:bg-[#9db2bf] ${currentPage === buttonNumber ? 'cursor-not-allowed bg-[#526d82] text-white hover:bg-[#526d82]' : 'cursor-pointer'}`}
      disabled={currentPage === buttonNumber}
      onClick={handleNumber}
    >
      <span>{buttonNumber}</span>
    </button>
  );
}

export default PaginationButton;
