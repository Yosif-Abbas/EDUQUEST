import { Link, Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="">Dashboard</Link>
          </li>
          <li>
            <Link to="courses">Courses</Link>
          </li>
          <li>
            <Link to="wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="settings">Settings</Link>
          </li>
          <li>
            <button>logout</button>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
