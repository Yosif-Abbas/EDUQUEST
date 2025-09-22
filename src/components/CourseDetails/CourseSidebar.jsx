import { CiClock2 } from 'react-icons/ci';
import { FiBarChart } from 'react-icons/fi';
import { LuNotepadText, LuUsersRound } from 'react-icons/lu';

import SocialButton from '../SocialButton';
import Spinner from '../Spinner';
import CopyLinkButton from './CopyLinkButton';
import Price from './Price';

import { getFormattedTotalDuration, timeLeftUntil } from '../../utils/helpers';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddToWishlist } from '../../hooks/useAddToWishlist';
import { useEnrollInCourse } from '../../hooks/useEnrollIncourse';
import { useRemoveFromWishlist } from '../../hooks/useRemoveFromWishlist';
import { useWishlist } from '../../hooks/useWishlist';
import { useCurrentUser } from './../../hooks/useCurrentUser';

function CourseSidebar({ course, isEnrolled, setIsEnrolled, isLoadingEnrolledStatus }) {
  const navigate = useNavigate();

  const {
    id,
    regularPrice,
    currency,
    discount,
    discount_end_date,
    number_of_lessons: nol,
    course_sections,
    students_enrolled,
    course_level,
    course_includes,
  } = course;

  const [studentsEnrolled, setStudentsEnrolled] = useState(students_enrolled);

  const { currentUser, isLoading: isLoadingUser, isAuthenticated } = useCurrentUser();

  const { enrollInCourse, isLoading: isEnrollingInCourse } = useEnrollInCourse();

  const { wishlist, isLoading: isLoadingWishlist } = useWishlist(currentUser?.id);

  const [isInWishlist, setIsInWishlist] = useState();

  useEffect(() => {
    if (isLoadingWishlist) return;
    if (wishlist?.length > 0) {
      const isCourseInWishlist = wishlist.some((item) => item.course_id.id === id);
      setIsInWishlist(isCourseInWishlist);
    } else {
      setIsInWishlist(false);
    }
  }, [isLoadingWishlist, wishlist, id]);

  const { addToWishlist, isLoading: isAddingToWishlist } = useAddToWishlist();
  const { removeFromWishlist, isLoading: isRemovingFromWishlist } = useRemoveFromWishlist();

  const isLoadingWishlistProcess = isAddingToWishlist || isRemovingFromWishlist;

  const courseDuration = getFormattedTotalDuration(course_sections);

  const number_of_lessons = course_sections?.reduce(
    (count, section) => count + (section.lectures?.length || 0),
    0,
  );

  const timeLeft = timeLeftUntil(discount_end_date);

  const finalPrice = timeLeft ? regularPrice - regularPrice * (discount * 0.01) : regularPrice;

  const isFree = finalPrice <= 0 || discount >= 100;

  const handleEnroll = () => {
    if (isAuthenticated && currentUser?.role === 'student') {
      enrollInCourse(
        { studentId: currentUser.id, courseId: id },
        {
          onSuccess: () => {
            setIsEnrolled(true);
            setStudentsEnrolled((n) => n + 1);
          },
        },
      );
    } else {
      navigate('/login');
    }
  };

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      addToWishlist(
        { userId: currentUser.id, courseId: id },
        {
          onSuccess: () => {
            setIsInWishlist(true);
          },
        },
      );
    } else {
      navigate('/login');
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isAuthenticated) {
      removeFromWishlist(
        { userId: currentUser.id, courseId: id },
        {
          onSuccess: () => {
            setIsInWishlist(false);
          },
        },
      );
    } else {
      navigate('/login');
    }
  };

  const handleWatchCourse = () => {
    if (isAuthenticated && currentUser?.role === 'student') {
      navigate(`/courses/${id}/watch`);
    } else {
      navigate('/unauthorized');
    }
  };

  return (
    <div className="flex flex-col divide-y-1 divide-[#DDE6ED] bg-white p-6 lg:row-span-2 lg:max-h-fit lg:max-w-100">
      {!isEnrolled && (
        <Price
          regularPrice={regularPrice}
          finalPrice={finalPrice}
          currency={currency}
          discount={discount}
          discount_end_date={discount_end_date}
          isFree={isFree}
          timeLeft={timeLeft}
        />
      )}

      <ul className="flex flex-col gap-y-1 py-4 font-normal">
        <li className="list-icon">
          <span>
            <CiClock2 />
          </span>
          Course Duration
          <span className="ml-auto text-sm text-gray-500">{courseDuration}</span>
        </li>
        <li className="list-icon">
          <span>
            <LuNotepadText />
          </span>
          Number of Lessons
          <span className="ml-auto text-sm text-gray-500">{number_of_lessons}</span>
        </li>
        <li className="list-icon">
          <span>
            <LuUsersRound />
          </span>
          Student Enrolled
          <span className="ml-auto text-sm text-gray-500">{studentsEnrolled}</span>
        </li>
        <li className="list-icon">
          <span>
            <FiBarChart />
          </span>
          course Level
          <span className="ml-auto text-sm text-gray-500">{course_level}</span>
        </li>
      </ul>

      {currentUser?.role !== 'teacher' && (
        <div className="mx-auto flex w-full max-w-80 flex-col gap-y-2 py-4">
          {isLoadingUser || isEnrollingInCourse || isLoadingEnrolledStatus ? (
            <div className="flex w-full items-center justify-center">
              <Spinner size={54} color="#526D82" />
            </div>
          ) : (
            <>
              {isEnrolled ? (
                <button
                  className="bg-[#57966c] px-4 py-2 tracking-wider text-white uppercase"
                  onClick={handleWatchCourse}
                >
                  Watch Course
                </button>
              ) : (
                <>
                  {isFree ? (
                    <button
                      className="bg-[#526D82] px-4 py-2 tracking-wider text-white"
                      onClick={handleEnroll}
                    >
                      Enroll
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-[#526D82] px-4 py-2 tracking-wider text-white"
                        onClick={handleEnroll}
                      >
                        Enroll
                      </button>
                      <button className="bg-[#526D82] px-4 py-2 text-white">
                        Add to Cart
                      </button>
                      <button className="bg-[#DDE6ED] px-4 py-2 text-[#526D82]">
                        Buy Now
                      </button>
                    </>
                  )}
                  {isLoadingWishlistProcess ? (
                    <div className="flex w-full items-center justify-center">
                      <Spinner size={54} color="#526D82" />
                    </div>
                  ) : isInWishlist ? (
                    <button
                      className="border-1 border-red-300 bg-white px-4 py-2 text-red-400"
                      onClick={handleRemoveFromWishlist}
                    >
                      Remove from Wishlist
                    </button>
                  ) : (
                    <button
                      className="border-1 border-gray-300 bg-white px-4 py-2 text-[#526D82]"
                      onClick={handleAddToWishlist}
                    >
                      Add to Wishlist
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}

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
          <CopyLinkButton />
          <SocialButton platform="facebook" variant="secondary"></SocialButton>
          <SocialButton platform="twitter" variant="secondary"></SocialButton>
          <SocialButton platform="email" variant="secondary"></SocialButton>
          <SocialButton platform="whatsapp" variant="secondary"></SocialButton>
        </div>
      </div>
    </div>
  );
}

export default CourseSidebar;
