import {
  FaCommentDots,
  FaCreditCard,
  FaRegStar,
  FaStar,
  FaTrophy,
} from 'react-icons/fa';
import { FaCirclePlay, FaUserGroup } from 'react-icons/fa6';
import { HiClipboardList } from 'react-icons/hi';
import { IoLayers, IoPersonCircleSharp } from 'react-icons/io5';
import { VscVmActive } from 'react-icons/vsc';

function TeacherDashboard() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <section className="teacher-dashboard-stats col-span-full rounded-lg">
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <FaCirclePlay />
          </div>
          <div>
            <h2 className="text-xl">(957)</h2>
            <p className="text-[12px] text-[#4E5566]">Enrolled Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <VscVmActive />
          </div>
          <div>
            <h2 className="text-xl">(19)</h2>
            <p className="text-[12px] text-[#4E5566]">Active Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <FaUserGroup />
          </div>
          <div>
            <h2 className="text-xl">(241)</h2>
            <p className="text-[12px] text-[#4E5566]">Course Instructors</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <FaTrophy />
          </div>
          <div>
            <h2 className="text-xl">(951)</h2>
            <p className="text-[12px] text-[#4E5566]">Complete Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <IoPersonCircleSharp />
          </div>
          <div>
            <h2 className="text-xl">(1,674,767)</h2>
            <p className="text-[12px] text-[#4E5566]">Students</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <HiClipboardList />
          </div>
          <div>
            <h2 className="text-xl">(3)</h2>
            <p className="text-[12px] text-[#4E5566]">Online Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <FaCreditCard />
          </div>
          <div>
            <h2 className="text-xl">($7,461)</h2>
            <p className="text-[12px] text-[#4E5566]">Total Earning</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="bg-[#FFEEE8] p-4 text-lg text-[#FF6636]">
            <IoLayers />
          </div>
          <div>
            <h2 className="text-xl">(56,489)</h2>
            <p className="text-[12px] text-[#4E5566]">Courses Sold</p>
          </div>
        </div>
      </section>
      <section className="col-span-full rounded-lg lg:col-span-4 xl:col-span-3">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Recent Activity</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <ul className="p-2">
          <li className="flex gap-3 pb-8">
            <div className="self-start rounded-full bg-[#FF6636] p-2 text-sm text-white">
              <FaCommentDots />
            </div>
            <div className="text-[14px]">
              <p className="mb-1 text-[#4E5566]">
                <span className="text-black">(Kevin)</span> commented on your
                (lecture) in (chapter one)
              </p>
              <p className="mb-1 text-[#4E5566]">(Mathematics)</p>
              <p className="text-[#4E5566]">(Just Now)</p>
            </div>
          </li>
          <li className="flex gap-3 pb-8">
            <div className="self-start rounded-full bg-[#FF6636] p-2 text-sm text-white">
              <FaCommentDots />
            </div>
            <div className="text-[14px]">
              <p className="mb-1 text-[#4E5566]">
                <span className="text-black">(Kevin)</span> commented on your
                (lecture) in (chapter one)
              </p>
              <p className="mb-1 text-[#4E5566]">(Mathematics)</p>
              <p className="text-[#4E5566]">(5 min)</p>
            </div>
          </li>
        </ul>
      </section>
      <section className="col-span-full rounded-lg lg:col-span-8 xl:col-span-3">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Profile View</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Chart)</div>
      </section>
      <section className="col-span-full rounded-lg xl:col-span-6">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Revenue</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Chart)</div>
      </section>
      <section className="col-span-full rounded-lg xl:col-span-4">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Overall Course Rating</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Overall Raiting)</div>
        <ul className="mt-6 p-2">
          <li className="mb-2 flex gap-4">
            {/* <FaRegStar /> */}
            <div className="text-pinky-violet flex items-center gap-1 text-[14px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="ml-1 font-medium text-[#6E7485]">5 Star</span>
            </div>
            <div className="flex grow items-center">
              <span className="after:bg-pinky-violet relative mr-3 block h-2 w-full bg-white after:absolute after:left-0 after:h-full after:w-[56%] after:content-['']"></span>
              <span className="block w-10 text-sm">56%</span>
            </div>
          </li>
          <li className="mb-2 flex gap-4">
            {/* <FaRegStar /> */}
            <div className="text-pinky-violet flex items-center gap-1 text-[14px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
              <span className="ml-1 font-medium text-[#6E7485]">4 Star</span>
            </div>
            <div className="flex grow items-center">
              <span className="after:bg-pinky-violet relative mr-3 block h-2 w-full bg-white after:absolute after:left-0 after:h-full after:w-[37%] after:content-['']"></span>
              <span className="block w-10 text-sm">37%</span>
            </div>
          </li>
          <li className="mb-2 flex gap-4">
            {/* <FaRegStar /> */}
            <div className="text-pinky-violet flex items-center gap-1 text-[14px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
              <FaRegStar />
              <span className="ml-1 font-medium text-[#6E7485]">3 Star</span>
            </div>
            <div className="flex grow items-center">
              <span className="after:bg-pinky-violet relative mr-3 block h-2 w-full bg-white after:absolute after:left-0 after:h-full after:w-[8%] after:content-['']"></span>
              <span className="block w-10 text-sm">8%</span>
            </div>
          </li>
          <li className="mb-2 flex gap-4">
            {/*  */}
            <div className="text-pinky-violet flex items-center gap-1 text-[14px]">
              <FaStar />
              <FaStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <span className="ml-1 font-medium text-[#6E7485]">2 Star</span>
            </div>
            <div className="flex grow items-center">
              <span className="after:bg-pinky-violet relative mr-3 block h-2 w-full bg-white after:absolute after:left-0 after:h-full after:w-[1%] after:content-['']"></span>
              <span className="block w-10 text-sm">1%</span>
            </div>
          </li>
          <li className="flex gap-4">
            {/* <FaRegStar /> */}
            <div className="text-pinky-violet flex items-center gap-1 text-[14px]">
              <FaStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <span className="ml-1 font-medium text-[#6E7485]">5 Star</span>
            </div>
            <div className="flex grow items-center">
              <span className="after:bg-pinky-violet relative mr-3 block h-2 w-full bg-white after:absolute after:left-0 after:h-full after:w-[56%] after:content-['']"></span>
              <span className="block basis-10 text-sm">{'<'}1%</span>
            </div>
          </li>
        </ul>
      </section>
      <section className="col-span-full rounded-lg xl:col-span-8">
        <div className="flex items-center justify-between border-b-1 border-white p-2">
          <h2>Course Overview</h2>
          <select
            name="recent-activity"
            className="text-sm text-[#6E7485] focus:outline-1 focus:outline-[#6E7485]"
          >
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <div className="p-2">(Chart)</div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
