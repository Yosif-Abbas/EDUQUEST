import { NavLink, Outlet } from 'react-router-dom';

import Header from './Header';
import TeacherStudentNavbar from './TeacherStudentNavbar';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Spinner from './Spinner';

function StudentLayout() {
  const {
    currentUser: { first_name, last_name, image_url, biography },
    isLoading,
  } = useCurrentUser();

  return (
    <>
      <TeacherStudentNavbar />
      <Header />
      <main className="relative mt-20">
        <div className="absolute -top-20 left-0 z-[-1] h-70 w-full bg-[#526D82]"></div>
        <div></div>
        <section className="relative top-0 container border-1 border-[#FFDDD1] bg-white py-10">
          <div className="flex items-center gap-6 px-5 py-10 md:px-0">
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                src={
                  image_url === null
                    ? 'https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//default-user.jpg'
                    : image_url
                }
                alt="Avatar"
                className="aspect-square w-28 rounded-full object-cover object-top"
              />
            )}
            <div>
              {isLoading ? (
                <Spinner />
              ) : (
                <h2 className="mb-3 text-2xl font-medium">
                  {first_name + ' ' + last_name}
                </h2>
              )}
              <p className="text-[#6E7485]">
                {biography === null
                  ? "He didn't put any bio"
                  : `Bio: ${biography}`}
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
        <section className="relative top-10 container md:left-0">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default StudentLayout;
