import { CiAlarmOn } from 'react-icons/ci';
import { timeLeftUntil } from '../../utils/helpers';

function Price({
  regularPrice,
  currency,
  discount,
  discount_end_date,
  isFree,
  timeLeft,
  finalPrice,
}) {
  return (
    <div className="pb-2">
      <div className="flex items-center">
        {isFree ? (
          <p className="text-2xl tracking-wider uppercase">Free</p>
        ) : (
          <>
            <p className="flex items-center text-xl font-normal text-nowrap">
              {finalPrice} {currency}
            </p>
          </>
        )}
        {timeLeft && discount > 0 && (
          <div className="flex w-full items-center justify-between">
            <span className="ml-3 text-xs font-normal text-gray-500 line-through">
              {regularPrice} {currency}
            </span>
            <span className="self-end bg-[#FFEEE8] px-2 py-1 text-xs font-bold text-[#FF6636]">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between"></div>
      {timeLeft && discount > 0 && (
        <p className="flex items-center text-xs text-[#E34444]">
          <span className="mr-2 text-lg">
            <CiAlarmOn />
          </span>{' '}
          {timeLeftUntil(discount_end_date)} left for this price
        </p>
      )}
    </div>
  );
}

export default Price;
