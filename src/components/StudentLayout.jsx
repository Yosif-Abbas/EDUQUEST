import avatar from '../assets/picture.jpg';
import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header';
import TeacherStudentNavbar from './TeacherStudentNavbar';

function StudentLayout() {
  return (
    <>
      <TeacherStudentNavbar />
      <Header />
      <main className="relative">
        <div className="absolute top-0 left-0 z-[-1] h-70 w-full bg-[#526D82]"></div>
        <div></div>
        <section className="relative top-20 container border-1 border-[#FFDDD1] bg-white py-10">
          <div className="flex items-center gap-6 px-5 py-10 md:px-0">
            <figure>
              <img src={avatar} alt="Avatar" className="w-28 rounded-full" />
            </figure>
            <div>
              <h2 className="mb-3 text-2xl font-medium">(Kareem Mohamad)</h2>
              <p className="text-[#6E7485]">
                He is the one who will become a doctor in the future
              </p>
            </div>
          </div>
          <ul className="flex items-center justify-center border-t-1 border-t-[#FFDDD1] md:gap-6">
            <li className="student-nav">
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
            <li className="student-nav">
              <NavLink to="courses">Courses</NavLink>
            </li>
            {/* <li className="student-nav">
              <NavLink to="teachers">Teachers</NavLink>
            </li> */}
            <li className="student-nav">
              <NavLink to="wishlist">Wishlist</NavLink>
            </li>
            <li className="student-nav">
              <NavLink to="settings">Settings</NavLink>
            </li>
          </ul>
        </section>
        <section className="relative top-30 container md:left-0">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default StudentLayout;
