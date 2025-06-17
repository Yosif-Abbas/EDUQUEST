import { FaStar } from 'react-icons/fa';
import { LuUserRound } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { timeLeftUntil } from './../utils/helpers';
import CourseSubject from './CourseSubject';

const no_image_url =
  'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

function Card({ course, className }) {
  const navigate = useNavigate();

  const handleCourseRedirect = () => {
    navigate(`/courses/${course.id}`);
  };

  const { regularPrice, discount, discount_end_date, currency } = course;

  const timeLeft = timeLeftUntil(discount_end_date);

  const finalPrice = timeLeft
    ? regularPrice - regularPrice * (discount * 0.01)
    : regularPrice;

  const isFree = finalPrice <= 0 || discount >= 100;

  return (
    <li
      className={`h-fit w-full border border-gray-300 bg-white ${className} max-w-90`}
    >
      <figure
        onClick={handleCourseRedirect}
        className="h-28 cursor-pointer overflow-hidden transition-opacity duration-200 hover:opacity-75 sm:h-32 md:h-36 lg:h-42 xl:h-48"
      >
        <img
          src={course.image_url ? course.image_url : no_image_url}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = no_image_url;
          }}
          alt={course.subject}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="p-2 text-xs font-medium sm:p-4 lg:text-sm">
        <div className="flex flex-wrap items-center justify-between pb-4">
          <CourseSubject subject={course.subject} />
          {!isFree ? (
            <div className="flex flex-col items-end">
              {discount > 0 && (
                <div className="flex items-center gap-1">
                  {timeLeft && (
                    <>
                      <span className="self-end bg-[#FFEEE8] px-1 text-xs font-bold text-[#FF6636] md:px-2 md:py-1">
                        {discount}% OFF
                      </span>

                      <span className="ml-3 text-xs font-normal text-gray-500 line-through">
                        {regularPrice}
                        {currency}
                      </span>
                    </>
                  )}
                </div>
              )}
              <p className="flex items-center text-sm text-[#FF6636] md:text-lg">
                {finalPrice}
                {currency}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              {discount > 0 && (
                <div className="flex items-center gap-1">
                  {timeLeft && (
                    <>
                      <span className="self-end bg-[#FFEEE8] px-1 text-xs font-bold text-[#FF6636] md:px-2 md:py-1">
                        {discount}% OFF
                      </span>

                      <span className="ml-3 text-xs font-normal text-gray-500 line-through">
                        {regularPrice}
                        {currency}
                      </span>
                    </>
                  )}
                </div>
              )}
              <p className="text-lg text-[#FF6636] uppercase">Free</p>
            </div>
          )}
        </div>

        <h3>{course.title}</h3>
      </div>

      <div className="flex items-center justify-between border-t border-[#8C94A355] p-4 text-xs font-medium lg:text-lg">
        <span className="list-icon">
          <FaStar color="#FD8E1F" /> {course.rating}
        </span>

        <span className="list-icon text-[#4E5566]">
          <LuUserRound color="#564FFD" />
          {course.students_enrolled}{' '}
          <span className="text-[#4E5566aa]">Students</span>
        </span>
      </div>
    </li>
  );
}

export default Card;
