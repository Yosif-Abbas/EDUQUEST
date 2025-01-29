import { Link, Outlet } from "react-router-dom";

function TeacherLayout() {
  return (
    <div>
      <nav>
        <ul>
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
  );
}

export default TeacherLayout;
