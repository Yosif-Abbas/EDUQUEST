import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const listItemStyles = 'w-full text-center h-full py-3 text-[18px] lg:text-2xl';

function NavLinks({ isMobile, isMenuOpen, className }) {
  const location = useLocation();
  const isHome = location.pathname === '/home' || location.pathname === '/';

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };
  return (
    <ul
      className={`z-100 font-sans text-2xl font-bold italic transition md:flex md:items-center ${
        isMobile && isMenuOpen
          ? 'absolute top-16 left-0 flex w-full flex-col items-center divide-y-1 divide-white bg-[#f8faed] shadow-md'
          : 'hidden gap-6 md:flex'
      } ${className}`}
    >
      <li
        className={`${isHome ? 'text-[#526D82]' : 'hover:text-[#1D2026cc]'} ${listItemStyles}`}
      >
        <Link to="/home">Home</Link>
      </li>
      <li
        className={`${!isHome ? 'text-[#526D82]' : 'hover:text-[#1D2026cc]'} ${listItemStyles}`}
      >
        <Link to="/courses">Courses</Link>
      </li>
      <li className={listItemStyles}>
        <Button variant="secondary" rounded onClick={handleLoginRedirect}>
          Login
        </Button>
      </li>
      <li className={listItemStyles}>
        <Button rounded onClick={handleSignupRedirect}>
          Sign up
        </Button>
      </li>
    </ul>
  );
}

export default NavLinks;
