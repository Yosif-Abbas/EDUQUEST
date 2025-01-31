import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleHomepRedirect = () => {
    navigate('/home');
  };

  return (
    <nav className="flex">
      <div className="w-1/2">
        <Logo handleHomepRedirect={handleHomepRedirect} />
      </div>
      <div className="w-1/2">
        <ul className="flex min-h-full w-full items-center justify-end gap-6 font-sans text-3xl font-bold italic">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
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
