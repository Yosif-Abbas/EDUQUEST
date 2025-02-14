import { Link, Outlet } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import logo from '../assets/logo.png';
import picture from '../assets/picture.jpg';
import { BsBarChartLine } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { GoStack } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosLogOut, IoIosSearch } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';
import { useState } from 'react';

function TeacherLayout() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  function handleSearch() {
    setShowSearchInput((pre) => !pre);
  }
  function handleNotification() {
    setShowNotification((pre) => !pre);
  }
  function handleProfile() {
    setShowProfile((pre) => !pre);
  }

  return (
    <div>
      <div className="container flex min-h-screen">
        <nav className="bg-main-txt text-alt-darker min-w-fit pt-4">
          <ul className="text-3xl">
            <li className="mb-4">
              <Link to="" className="flex justify-center">
                <img
                  src={logoIcon}
                  alt="Logo Icon"
                  className="w-10 lg:hidden"
                />
                <img
                  src={logo}
                  alt="Logo"
                  className="hidden lg:block lg:w-45 lg:px-4"
                />
              </Link>
            </li>
            <li className="hover:bg-pinky-violet hover:text-alt my-2 rounded-full p-2 transition sm:m-0 sm:rounded-none sm:px-4 sm:py-4">
              <Link to="" className="flex gap-4">
                <BsBarChartLine />{' '}
                <span className="hidden sm:block sm:text-lg">Dashboard</span>
              </Link>
            </li>
            <li className="hover:bg-pinky-violet hover:text-alt my-2 rounded-full p-2 transition sm:m-0 sm:rounded-none sm:px-4 sm:py-4">
              <Link to="newCourse" className="flex gap-4">
                <CiCirclePlus />{' '}
                <span className="hidden sm:block sm:text-lg">new Course</span>
              </Link>
            </li>
            <li className="hover:bg-pinky-violet hover:text-alt my-2 rounded-full p-2 transition sm:m-0 sm:rounded-none sm:px-4 sm:py-4">
              <Link to="courses" className="flex gap-4">
                <GoStack />{' '}
                <span className="hidden sm:block sm:text-lg">My Courses</span>
              </Link>
            </li>
            <li className="hover:bg-pinky-violet hover:text-alt my-2 rounded-full p-2 transition sm:m-0 sm:rounded-none sm:px-4 sm:py-4">
              <Link to="settings" className="flex gap-4">
                <IoSettingsOutline />{' '}
                <span className="hidden sm:block sm:text-lg">Settings</span>
              </Link>
            </li>
            <li className="hover:bg-pinky-violet hover:text-alt my-2 rounded-full p-2 transition sm:m-0 sm:rounded-none sm:px-4 sm:py-4">
              <button className="flex gap-4">
                <IoIosLogOut />{' '}
                <span className="hidden sm:block sm:text-lg">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
        <main className="grow px-2 pt-4">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm sm:text-xl">(Section Name)</h3>
            <section className="relative z-20 flex items-center gap-3 text-lg">
              <button
                onClick={handleSearch}
                className="h-fit rounded-xl bg-white p-2 transition lg:hidden"
              >
                <IoIosSearch />
              </button>
              <form
                className={`absolute top-[110%] right-0 z-10 ${showSearchInput ? 'scale-y-100' : 'scale-y-0'} origin-top transition lg:relative lg:scale-y-100`}
              >
                <div className="">
                  <input
                    type="text"
                    className="rounded-xl bg-white p-2 pl-8 text-[14px] outline-0 md:w-60 xl:w-80"
                    placeholder="Search"
                  />
                  <div className="absolute top-1/2 left-4 -translate-1/2">
                    <IoIosSearch />
                  </div>
                </div>
              </form>
              <button
                onClick={handleNotification}
                className="rounded-xl bg-white p-2 lg:p-2.5"
              >
                <FaRegBell />
              </button>
              <div
                className={`absolute top-[120%] right-13 h-100 w-70 rounded-xl bg-white p-2 ${!showNotification && 'hidden'}`}
              ></div>
              <button onClick={handleProfile}>
                <figure>
                  <img
                    src={picture}
                    alt="pictuer"
                    className="h-10 w-10 rounded-full"
                  />
                </figure>
              </button>
              <div
                className={`absolute top-[120%] right-0 h-100 w-50 rounded-xl bg-white p-2 ${!showProfile && 'hidden'}`}
              ></div>
            </section>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;
