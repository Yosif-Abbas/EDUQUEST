import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useCurrentUser } from '../hooks/useCurrentUser';
import TeacherStudentNavbar from './TeacherStudentNavbar';
import Header from './Header';

const Layout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr]">
      {isAuthenticated && !isLoading ? (
        <div>
          <TeacherStudentNavbar />
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
