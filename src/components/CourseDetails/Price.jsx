import { CiAlarmOn } from 'react-icons/ci';
import { timeLeftUntil } from '../../utils/helpers';

function Price({ regularPrice, currency, discount, discount_end_date }) {
  const finalPrice = regularPrice - regularPrice * (discount * 0.01);

  const timeLeft = timeLeftUntil(discount_end_date);

  return (
    <div className="pb-4">
      <div className="mb-4 flex items-center justify-between">
        {!timeLeft ? (
          <p className="flex items-center text-xl font-normal">
            {regularPrice} {currency}
          </p>
        ) : (
          <>
            <p className="flex items-center text-xl font-normal">
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
          </>
        )}
      </div>
      {timeLeft && (
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
