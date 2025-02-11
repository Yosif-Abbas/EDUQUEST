import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo-icon.png';

function TeacherLayout() {
  return (
    <div className="">
      <div className="container flex">
        <nav>
          <ul>
            <li>
              <Link to="">
                <img src={logo} alt="Logo Icon" />
              </Link>
            </li>
            <li>
              <Link to="">Dashboard</Link>
            </li>
            <li>
              <Link to="newCourse">new Course</Link>
            </li>
            <li>
              <Link to="courses">My Courses</Link>
            </li>

            <li>
              <Link to="settings">Settings</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;
