import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { GoBell } from 'react-icons/go';
import { IoIosLogOut } from 'react-icons/io';

import { useLogout } from '../hooks/useLogout';
import { useCurrentUser } from '../hooks/useCurrentUser';

import Spinner from './Spinner';

function Header() {
  const { logout, isLoading: isLoggingOut } = useLogout();
  const {
    currentUser: { first_name, last_name, image_url },
    isLoading,
  } = useCurrentUser();
  // const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <section className="mb-20 flex items-center justify-between gap-5 bg-[#b8c6d0] px-6 py-2">
        <div className="flex items-center gap-4">
          <figure>
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                src={
                  image_url === null
                    ? 'https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//default-user.jpg'
                    : image_url
                }
                alt="Avatar"
                className="h-12 w-12 rounded-full object-cover object-top"
              />
            )}
          </figure>
          {isLoading ? (
            <Spinner />
          ) : (
            <span>{first_name + ' ' + last_name}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-2xl">
          <button className="cursor-pointer">
            <GoBell />
          </button>
          <button className="cursor-pointer">
            <CiHeart />
          </button>
          <button className="cursor-pointer">
            <CiShoppingCart />
          </button>
          <button
            onClick={logout}
            disabled={isLoggingOut}
            className="cursor-pointer"
          >
            <IoIosLogOut />
          </button>
        </div>
      </section>
    </header>
  );
}

export default Header;
