import { useEffect, useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useEnrolledCourses } from '../hooks/useEnrolledCourses';
import { useEnrollInCourse } from '../hooks/useEnrollIncourse';
import { useRemoveFromWishlist } from '../hooks/useRemoveFromWishlist';
import { timeLeftUntil } from '../utils/helpers';
import Spinner from './Spinner';

function WishlistItem({ item, wishlist, isLoadingWishlist }) {
  const navigate = useNavigate();

  const {
    couseId = item.course_id.id,
    image = item.course_id.image_url,
    subject = item.course_id.subject,
    rating = item.course_id.rating,
    reviews = item.course_id.rating_count,
    title = item.course_id.title,
    instructor = item.course_id.teacher_id.user_id,
    regularPrice = item.course_id.regularPrice,
    discount = item.course_id.discount,
    currency = item.course_id.currency,
    discount_end_date = item.course_id.discount_end_date,
  } = item;

  const { removeFromWishlist, isLoading: isRemovingFromWishlist } =
    useRemoveFromWishlist();

  const { currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const { enrolledCourses, isLoading: isLoadingEnrolledCourses } =
    useEnrolledCourses(currentUser?.id);

  const { enrollInCourse, isLoading: isEnrollingInCourse } =
    useEnrollInCourse();

  const isEnrolled =
    !isLoadingEnrolledCourses &&
    enrolledCourses?.some((c) => c.course_id.id === couseId);

  const isLoadingEnrolledStatus = isLoading || isLoadingEnrolledCourses;

  const timeLeft = timeLeftUntil(discount_end_date);

  const finalPrice = timeLeft
    ? regularPrice - regularPrice * (discount * 0.01)
    : regularPrice;

  const isFree = finalPrice <= 0 || discount >= 100;

  const handleEnroll = () => {
    if (isAuthenticated && currentUser?.role === 'student') {
      enrollInCourse({ studentId: currentUser.id, courseId: couseId });
    } else {
      navigate('/login');
    }
  };

  const [isInWishlist, setIsInWishlist] = useState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isLoadingWishlist) return;
    if (wishlist?.length > 0) {
      const isCourseInWishlist = wishlist.some(
        (item) => item.course_id.id === couseId,
      );
      setIsInWishlist(isCourseInWishlist);
    } else {
      setIsInWishlist(false);
    }
  }, [isLoadingWishlist, wishlist, couseId]);

  const handleRemoveFromWishlist = () => {
    if (isAuthenticated && currentUser?.role === 'student') {
      console.log(currentUser.id, couseId);
      removeFromWishlist({ userId: currentUser.id, courseId: couseId });
    } else {
      navigate('/login');
    }
  };

  const handleWatchCourse = () => {
    if (isAuthenticated && currentUser?.role === 'student') {
      navigate(`/courses/${couseId}/watch`);
    } else {
      navigate('/unauthorized');
    }
  };

  return (
    <li
      className={`student-wishlist-item px-2 ${isEnrolled ? 'bg-green-100' : ''}`}
    >
      <div className="col-span-5 flex flex-col gap-2 md:col-span-7 md:flex-row md:gap-4">
        <Link to={`/courses/${couseId}`}>
          <figure className="flex max-w-65 items-center overflow-hidden">
            <img
              src={
                image
                  ? image
                  : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
              }
              alt={subject}
              loading="lazy"
              className="object-cover transition hover:scale-110"
            />
          </figure>
        </Link>

        <div className="flex flex-col justify-between gap-2">
          <div className="space-y-1">
            <p className="flex gap-1 text-[12px] lg:text-sm">
              <span>⭐</span> <span>{rating}</span>{' '}
              <span className="text-[#8C94A3]">({reviews})</span>
            </p>
            <h3 className="text-sm lg:text-[16px]">{title}</h3>
          </div>

          <p className="text-[12px] lg:text-sm">
            <span className="text-[#A1A5B3]">Course by:</span>{' '}
            <span className="text-[#4E5566]">
              {instructor.first_name + ' ' + instructor.last_name}
            </span>
          </p>
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-1 md:col-span-2">
        {isEnrolled || isLoadingEnrolledStatus ? (
          ''
        ) : isFree ? (
          <p className="text-2xl tracking-wider uppercase">Free</p>
        ) : (
          <div className="flex flex-col items-center gap-x-2 lg:flex-row">
            <span className="text-sm text-[#876A9A] lg:text-xl">
              {finalPrice}
              {currency}
            </span>{' '}
            {timeLeft ? (
              <>
                <span className="text-[12px] text-[#8C94A3] line-through lg:text-lg">
                  {regularPrice}
                  {currency}
                </span>
                <span className="bg-[#FFEEE8] px-2 py-1 text-xs font-bold text-nowrap text-[#FF6636]">
                  {discount}% OFF
                </span>
              </>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      <div className="col-span-4 flex flex-col justify-center gap-1 md:col-span-2 lg:col-span-3 xl:flex-row xl:items-center xl:justify-end xl:gap-2">
        {isEnrolled ? (
          <button
            className="bg-[#57966c] px-2 py-1 text-[10px] tracking-wider text-white sm:text-[13px] lg:text-[16px] xl:grow xl:px-3 xl:py-2"
            onClick={handleWatchCourse}
          >
            Watch Course
          </button>
        ) : isFree ? (
          <button
            className="bg-L3 px-2 py-1 text-[10px] tracking-wider text-white sm:text-[13px] lg:text-[16px] xl:grow xl:px-3 xl:py-2"
            onClick={handleEnroll}
          >
            {isEnrollingInCourse ? (
              <Spinner size={30} color="white" />
            ) : (
              'Enroll Now'
            )}
          </button>
        ) : (
          <>
            <button className="bg-[#F5F7FA] px-2 py-1 text-[10px] sm:text-[16px] xl:grow xl:px-3 xl:py-2">
              Buy Now
            </button>
            <button className="bg-[#876A9A] px-2 py-1 text-[10px] text-white sm:text-[13px] lg:text-[16px] xl:grow xl:px-3 xl:py-2">
              Add To Cart
            </button>
          </>
        )}
        <button
          className="flex justify-center bg-[#F5F7FA] px-2 py-1 text-[16px] text-[#876A9A] xl:px-3 xl:py-2"
          onClick={handleRemoveFromWishlist}
          disabled={isRemovingFromWishlist}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <FaHeartBroken /> : <FaHeart />}
        </button>
      </div>
    </li>
  );
}

export default WishlistItem;
