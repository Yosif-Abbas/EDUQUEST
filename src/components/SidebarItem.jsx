import { BsBarChartLine } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { GoStack } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { to: '', icon: <BsBarChartLine />, label: 'Dashboard' },
  { to: 'newCourse', icon: <CiCirclePlus />, label: 'New Course' },
  { to: 'courses', icon: <GoStack />, label: 'My Courses' },
  { to: 'settings', icon: <IoSettingsOutline />, label: 'Settings' },
];

// Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <li>
    <NavLink to={to} className="teacher-navlink hover:bg-pinky-violet">
      {icon} <span className="hidden sm:block sm:text-lg">{label}</span>
    </NavLink>
  </li>
);

export default SidebarItem;
