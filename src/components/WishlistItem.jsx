import { FaHeart } from 'react-icons/fa';

function WishlistItem({ item }) {
  const {
    image = item.image_url,
    subject = item.courseId.subject,
    rating = item.courseId.rating,
    reviews = item.courseId.rating_count,
    title = item.courseId.title,
    instructor = item.courseId.teacher_id.user_id,
    price = item.courseId.regularPrice,
    discount = item.courseId.discount,
    currency = item.courseId.currency,
  } = item;

  return (
    <>
      <div className="col-span-5 flex flex-col gap-2 md:col-span-7 md:flex-row md:gap-4">
        <figure className="flex max-w-65 items-center">
          <img
            src={
              image
                ? image
                : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
            }
            alt={subject}
            className="object-cover"
          />
        </figure>
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
      <div className="col-span-3 flex items-center gap-1 md:col-span-2">
        <span className="text-sm text-[#876A9A] lg:text-xl">
          {currency + ' '}
          {price - (price * discount) / 100}
        </span>{' '}
        <span className="text-[12px] text-[#8C94A3] line-through lg:text-lg">
          {currency + ' '}
          {price}
        </span>
      </div>
      <div className="col-span-4 flex flex-col justify-center gap-1 md:col-span-2 lg:col-span-3 xl:flex-row xl:items-center xl:gap-2">
        <button className="bg-[#F5F7FA] px-2 py-1 text-[10px] sm:text-[16px] xl:grow xl:px-3 xl:py-2">
          Buy Now
        </button>
        <button className="bg-[#876A9A] px-2 py-1 text-[10px] text-white sm:text-[13px] lg:text-[16px] xl:grow xl:px-3 xl:py-2">
          Add To Cart
        </button>
        <button className="flex justify-center bg-[#F5F7FA] px-2 py-1 text-[16px] text-[#876A9A] xl:px-3 xl:py-2">
          <FaHeart />
        </button>
      </div>
    </>
  );
}

export default WishlistItem;
