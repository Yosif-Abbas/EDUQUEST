import { FaCheckCircle, FaTrophy } from 'react-icons/fa';
import { FaCirclePlay, FaUserGroup } from 'react-icons/fa6';

function StudentDashboard() {
  return (
    <>
      <section className="mb-10">
        <h2 className="mb-6 ml-6 text-2xl font-bold">Dashboard</h2>
        <ul className="flex flex-wrap gap-6">
          <li className="student-dashboard-list-item bg-[#FFEEE8]">
            <span className="text-L6 student-dashboard-list-item-icon">
              <FaCirclePlay />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">(12)</h3>
              <p className="text-sm text-[#4E5566]">Enrolled Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#EBEBFF]">
            <span className="student-dashboard-list-item-icon text-[#564FFD]">
              <FaCheckCircle />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">(6)</h3>
              <p className="text-sm text-[#4E5566]">Active Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#E1F7E3]">
            <span className="student-dashboard-list-item-icon text-[#23BD33]">
              <FaTrophy />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">(8)</h3>
              <p className="text-sm text-[#4E5566]">Complete Courses</p>
            </div>
          </li>
          <li className="student-dashboard-list-item bg-[#FFF2E5]">
            <span className="student-dashboard-list-item-icon text-[#FD8E1F]">
              <FaUserGroup />
            </span>
            <div>
              <h3 className="mb-2 text-2xl">(7)</h3>
              <p className="text-sm text-[#4E5566]">Course Instructors</p>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="mb-6 ml-6 text-2xl font-bold">
          Let&apos;s start learning, (Kareem)
        </h2>
        <ul className="flex flex-wrap gap-6">
          <li className="student-dashboard-list-item"></li>
        </ul>
      </section>
    </>
  );
}

export default StudentDashboard;
