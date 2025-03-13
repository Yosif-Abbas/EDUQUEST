import bigIcon from '../assets/big-icon.png';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import LanguageButton from './LanguageButton';

function TeacherStudentNavbar({ to = '/student' }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
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
            <NavLink to={to}>Home</NavLink>
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

      <LanguageButton />
    </section>
  );
}

export default TeacherStudentNavbar;
