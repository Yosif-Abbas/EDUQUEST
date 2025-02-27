import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci';
import logo from '../assets/logo.png';
import logoIcon from '../assets/logo-icon.png';
import avatar from '../assets/picture.jpg';
import bigIcon from '../assets/big-icon.png';
import { GoBell } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <section className="relative flex items-center justify-between bg-[#27374D] px-6 py-2 text-white">
        <nav className="flex items-center">
          <button
            onClick={() => setOpenMenu((pre) => !pre)}
            className="block text-2xl md:hidden"
          >
            <FaBars />
          </button>
          <ul
            className={`absolute top-[100%] -left-50 z-10 w-50 bg-[#27374D] transition ${openMenu && 'translate-x-full'} md:relative md:top-0 md:left-0 md:flex md:items-center md:bg-transparent`}
          >
            <li className="student-header-nav">
              <NavLink to="/student">Home</NavLink>
            </li>
            <li className="student-header-nav">
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li className="student-header-nav">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="student-header-nav">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <figure className="w-10">
          <img src={bigIcon} alt="Icon" />
        </figure>
        <div>
          <select className="p-1 text-white outline-none">
            <option className="text-black" value="english">
              English
            </option>
            <option className="text-black" value="arabic">
              Arabic
            </option>
          </select>
        </div>
      </section>
      <section className="flex items-center justify-between gap-5 px-6 py-2">
        <figure className="cursor-pointer">
          <img src={logo} alt="Logo" className="hidden w-60 sm:block" />
          <img src={logoIcon} alt="Logo" className="w-10 sm:hidden" />
        </figure>
        <div className="relative flex gap-2">
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
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <span>
            <GoBell />
          </span>
          <span>
            <CiHeart />
          </span>
          <span>
            <CiShoppingCart />
          </span>
          <figure>
            <img src={avatar} alt="Avatar" className="max-w-10 rounded-full" />
          </figure>
        </div>
      </section>
    </header>
  );
}

export default Header;
