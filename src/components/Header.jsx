import { TbLogout } from 'react-icons/tb';

import { useLogout } from '../hooks/auth/useLogout';
import { useCurrentUser } from '../hooks/users/useCurrentUser';

import Spinner from './Spinner';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PageLoading from './PageLoading';

function Header() {
  const navigate = useNavigate();

  const { logout, isLoading: isLoggingOut } = useLogout();
  const {
    currentUser: { first_name, last_name, image_url, role },
    isLoading,
  } = useCurrentUser();
  // const [showSearchInput, setShowSearchInput] = useState(false);

  if (isLoading) return <PageLoading />;

  const fullName = first_name + (last_name ? ' ' + last_name : '');

  return (
    <header>
      <section className="flex items-center justify-between gap-5 bg-[#b8c6d0] px-6">
        <div
          className="flex cursor-pointer items-center gap-4 py-2"
          onClick={() => navigate(`/${role ? role : 'onboarding'}`)}
        >
          <figure>
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                src={!image_url ? '/default-user.png' : image_url}
                alt="User Avatar"
                className="h-12 w-12 rounded-full object-cover object-top"
              />
            )}
          </figure>

          <span>{fullName}</span>
        </div>

        <div className="flex items-center gap-6 text-2xl">
          {role === 'student' && (
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate('/student/wishlist');
              }}
            >
              <FaRegHeart />
            </button>
          )}

          <button onClick={logout} disabled={isLoggingOut} className="cursor-pointer">
            <TbLogout />
          </button>
        </div>
      </section>
    </header>
  );
}

export default Header;
