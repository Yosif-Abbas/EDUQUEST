import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

function Navbar() {
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
    <nav className="flex bg-transparent">
      <div className="w-1/2 py-2 pl-4">
        <Logo />
      </div>
      <div className="w-1/2">
        <ul className="flex min-h-full w-full items-center justify-end gap-6 font-sans text-3xl font-bold italic">
          <li className={isHome ? 'text-[#526D82]' : ''}>
            <Link to="/home">Home</Link>
          </li>
          <li className={!isHome ? 'text-[#526D82]' : ''}>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Button type="secondary" rounded onClick={handleLoginRedirect}>
              Login
            </Button>
          </li>
          <li className="mr-6">
            <Button rounded onClick={handleSignupRedirect}>
              Sign up
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
