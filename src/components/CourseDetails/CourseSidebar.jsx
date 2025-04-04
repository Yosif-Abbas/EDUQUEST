import { CiAlarmOn, CiClock2, CiMail } from 'react-icons/ci';
import { FiBarChart } from 'react-icons/fi';
import { LuNotepadText, LuUsersRound } from 'react-icons/lu';
import { BiCopy, BiLogoFacebook } from 'react-icons/bi';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa';

import SocialButton from '../SocialButton';
import { timeLeftUntil } from '../../utils/helpers';

function CourseSidebar({ course }) {
  const {
    regularPrice,
    currency,
    discount,
    discount_end_date,
    course_duration,
    number_of_lessons,
    students_enrolled,
    course_level,
    course_includes,
  } = course;

  const finalPrice = regularPrice - regularPrice * (discount * 0.01);

  return (
    <div className="flex flex-col divide-y-1 divide-[#DDE6ED] bg-white p-6 lg:row-span-2 lg:max-h-fit lg:max-w-100">
      <div className="pb-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center text-xl font-medium">
            {finalPrice} {currency}
            {regularPrice && (
              <span className="ml-3 text-xs font-normal text-gray-500 line-through">
                {regularPrice} {currency}
              </span>
            )}
          </p>
          <span className="self-end bg-[#FFEEE8] px-2 py-1 text-xs font-bold text-[#FF6636]">
            {discount}% OFF
          </span>
        </div>
        <p className="flex items-center text-xs text-[#E34444]">
          <span className="mr-2 text-lg">
            <CiAlarmOn />
          </span>{' '}
          {timeLeftUntil(discount_end_date)} left for this price
        </p>
      </div>

      <ul className="flex flex-col gap-y-1 py-4 font-normal">
        <li className="list-icon">
          <span>
            <CiClock2 />
          </span>
          Course Duration
          <span className="ml-auto text-sm text-gray-500">
            {course_duration}
          </span>
        </li>
        <li className="list-icon">
          <span>
            <LuNotepadText />
          </span>
          Number of Lessons
          <span className="ml-auto text-sm text-gray-500">
            {number_of_lessons}
          </span>
        </li>
        <li className="list-icon">
          <span>
            <LuUsersRound />
          </span>
          Student Enrolled
          <span className="ml-auto text-sm text-gray-500">
            {students_enrolled}
          </span>
        </li>
        <li className="list-icon">
          <span>
            <FiBarChart />
          </span>
          course Level
          <span className="ml-auto text-sm text-gray-500">{course_level}</span>
        </li>
      </ul>

      <div className="mx-auto flex w-full max-w-80 flex-col gap-y-2 py-4">
        <button className="bg-[#526D82] px-4 py-2 text-white">
          Add to Cart
        </button>
        <button className="bg-[#DDE6ED] px-4 py-2 text-[#526D82]">
          Buy Now
        </button>
        <button className="border-1 border-gray-300 bg-white px-4 py-2 text-[#526D82]">
          Add to Wishlist
        </button>
      </div>

      <div className="py-4">
        <h3>This course includes:</h3>
        <ul className="flex list-disc flex-col gap-y-1 pl-6 text-sm font-normal text-gray-500">
          {course_includes.map((item) => (
            <li key={item.id} className="">
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4">
        <h3>Share this course:</h3>
        <div className="flex justify-center gap-x-2">
          <SocialButton type="secondary" icon={<BiCopy color="#4E5566" />}>
            Copy Link
          </SocialButton>
          <SocialButton
            type="secondary"
            icon={<BiLogoFacebook color="#4E5566" />}
          ></SocialButton>
          <SocialButton
            type="secondary"
            icon={<FaTwitter color="#4E5566" />}
          ></SocialButton>
          <SocialButton
            type="secondary"
            icon={<CiMail color="#4E5566" />}
          ></SocialButton>
          <SocialButton
            type="secondary"
            icon={<FaWhatsapp color="#4E5566" />}
          ></SocialButton>
        </div>
      </div>
    </div>
  );
}

export default CourseSidebar;
