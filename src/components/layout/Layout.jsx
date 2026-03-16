import { Outlet } from 'react-router-dom';

import { useCurrentUser } from '../../hooks/users/useCurrentUser';

import TeacherStudentNavbar from '../TeacherStudentNavbar';
import Navbar from './Navbar';
import Header from '../Header';

const Layout = () => {
  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();
  const role = currentUser?.role ?? null;

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr]">
      {isAuthenticated && !isLoading ? (
        <div>
          <TeacherStudentNavbar to={role} />
          <Header />
        </div>
      ) : (
        <Navbar />
      )}

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
