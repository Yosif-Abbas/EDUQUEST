import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { useCurrentUser } from '../hooks/useCurrentUser';

function TeacherStudentNavbar({ to = '/student' }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useCurrentUser();

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
          className={`absolute top-[100%] -left-50 z-90 w-50 bg-[#27374D] transition ${openMenu && 'translate-x-full'} md:relative md:top-0 md:left-0 md:flex md:w-fit md:items-center md:bg-transparent`}
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
          {isAuthenticated && (
            <li className="student-header-nav">
              <NavLink to="/question-bank">Question Bank</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <figure className="absolute top-1/2 left-1/2 w-10 -translate-1/2">
        <img
          src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//big-icon.png"
          loading="lazy"
          alt="Icon"
        />
      </figure>

      {/* <LanguageButton /> */}
    </section>
  );
}

export default TeacherStudentNavbar;
