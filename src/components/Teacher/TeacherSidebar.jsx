import { Link } from 'react-router-dom';
import { BsBarChartLine } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { GoStack } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';

import logoIcon from '../../assets/logo-icon.png';
import logo from '../../assets/logo.png';
import SidebarItem from '../SidebarItem';

const sidebarItems = [
  { to: '', icon: <BsBarChartLine />, label: 'Dashboard' },
  { to: 'newCourse', icon: <CiCirclePlus />, label: 'New Course' },
  { to: 'courses', icon: <GoStack />, label: 'My Courses' },
  { to: 'settings', icon: <IoSettingsOutline />, label: 'Settings' },
];

function TeacherSidebar() {
  return (
    <nav className="bg-main-txt text-alt-darker z-60 min-w-fit pt-4">
      <ul className="teacher-nav text-3xl">
        {/* Logo */}
        <li className="mb-4">
          <Link to="/courses" className="flex justify-center px-2">
            <img src={logoIcon} alt="Logo Icon" className="w-10 lg:hidden" />
            <img
              src={logo}
              alt="Logo"
              className="hidden lg:block lg:w-45 lg:px-4 xl:w-60"
            />
          </Link>
        </li>

        {/* Sidebar Items */}
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}

        {/* Logout Button */}
        <li>
          <button className="teacher-navlink w-full hover:bg-red-500">
            <IoIosLogOut />
            <span className="hidden sm:block sm:text-lg">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default TeacherSidebar;
