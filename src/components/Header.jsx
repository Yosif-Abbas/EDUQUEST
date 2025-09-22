import { TbLogout } from 'react-icons/tb';

import { useLogout } from '../hooks/useLogout';
import { useCurrentUser } from '../hooks/useCurrentUser';

import Spinner from './Spinner';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Picture from './Home/Picture';

function Header() {
  const navigate = useNavigate();

  const { logout, isLoading: isLoggingOut } = useLogout();
  const {
    currentUser: { first_name, last_name, image_url },
    isLoading,
  } = useCurrentUser();
  // const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <section className="flex items-center justify-between gap-5 bg-[#b8c6d0] px-6">
        <div
          className="flex cursor-pointer items-center gap-4 py-2"
          onClick={() => navigate('/student/dashboard')}
        >
          <figure>
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                src={image_url === null ? '/default-user.png' : image_url}
                alt="User Avatar"
                className="h-12 w-12 rounded-full object-cover object-top"
              />
            )}
          </figure>

          <span>{first_name + ' ' + last_name}</span>
        </div>

        <div className="flex items-center gap-6 text-2xl">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate('/student/wishlist');
            }}
          >
            <FaRegHeart />
          </button>

          <button
            onClick={logout}
            disabled={isLoggingOut}
            className="cursor-pointer"
          >
            <TbLogout />
          </button>
        </div>
      </section>
    </header>
  );
}

export default Header;
