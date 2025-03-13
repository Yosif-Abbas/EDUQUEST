import { NavLink } from 'react-router-dom';

// Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <li>
    <NavLink to={to} className="teacher-navlink hover:bg-pinky-violet">
      {icon} <span className="hidden sm:block sm:text-lg">{label}</span>
    </NavLink>
  </li>
);

export default SidebarItem;
