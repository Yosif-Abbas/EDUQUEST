import { FaHeart } from 'react-icons/fa';

function WishlistItem({
  image,
  subject,
  rating,
  reviews,
  title,
  instructor,
  price,
}) {
  return (
    <>
      <div className="col-span-3 flex gap-2 md:gap-4">
        <figure className="flex items-center">
          <img src={image} alt={subject} />
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
            <span className="text-[#4E5566]">{instructor}</span>
          </p>
        </div>
      </div>
      <div className="col-span-1 flex items-center gap-1">
        <span className="text-sm text-[#876A9A] lg:text-xl">${price.now}</span>{' '}
        <span className="text-[12px] text-[#8C94A3] line-through lg:text-lg">
          ${price.pre}
        </span>
      </div>
      <div className="col-span-2 flex flex-col justify-center gap-1 md:flex-row md:items-center md:gap-2">
        <button className="bg-[#F5F7FA] px-2 py-1 text-[10px] md:grow md:px-3 md:py-2 lg:text-[16px]">
          Buy Now
        </button>
        <button className="bg-[#876A9A] px-2 py-1 text-[10px] text-white md:grow md:px-3 md:py-2 lg:text-[16px]">
          Add To Cart
        </button>
        <button className="flex justify-center bg-[#F5F7FA] px-2 py-1 text-[10px] text-[#876A9A] md:px-3 md:py-2 lg:text-[16px]">
          <FaHeart />
        </button>
      </div>
    </>
  );
}

export default WishlistItem;
