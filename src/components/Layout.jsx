import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
