import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import logo from '../assets/logo.png';
import logoIcon from '../assets/logo-icon.png';
import avatar from '../assets/picture.jpg';
import { GoBell } from 'react-icons/go';
import { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useLogout } from '../hooks/useLogout';

function Header() {
  const { logout, isLoading } = useLogout();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <section className="flex items-center justify-between gap-5 px-6 py-2">
        {/* <figure className="cursor-pointer">
          <img src={logo} alt="Logo" className="hidden w-60 sm:block" />
          <img src={logoIcon} alt="Logo" className="w-10 sm:hidden" />
        </figure> */}
        <div className="flex items-center gap-4">
          <figure>
            <img src={avatar} alt="Avatar" className="w-12 rounded-full" />
          </figure>
          <span>(Name)</span>
        </div>

        {/* <div className="relative flex gap-2">
          <select className="border-1 border-white p-1 outline-0">
            <option>Browse</option>
          </select>
          <div className="relative">
            <button
              onClick={() => setShowSearchInput((pre) => !pre)}
              className="h-fit border-1 border-white p-2 transition md:hidden"
            >
              <CiSearch />
            </button>
            <form
              className={`absolute top-[110%] right-0 z-10 ${showSearchInput ? 'scale-y-100' : 'scale-y-0'} origin-top transition md:relative md:top-0 md:scale-y-100`}
            >
              <div className="">
                <input
                  type="text"
                  className="w-40 border-1 border-white bg-[#DDE6ED] p-2 pl-8 text-[14px] outline-0 sm:w-60 xl:w-80"
                  placeholder="Search"
                />
                <div className="absolute top-1/2 left-4 -translate-1/2">
                  <CiSearch />
                </div>
              </div>
            </form>
          </div>
        </div> */}
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
            disabled={isLoading}
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
