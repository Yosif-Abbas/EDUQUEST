import StarRating from '../StarRating';

function RatingPercentage({
  rating,
  ratingPercentage,
  fillColor = '#FD8E1F',
  emptyColor = '#FFF2E5',
  animationDuration = 500,
  animationDelay = 100,
}) {
  return (
    <li className="list-icon w-full">
      <StarRating rating={rating} fillColor={fillColor} />
      <span className="hidden text-xs whitespace-nowrap text-gray-500 duration-700 sm:block">
        {rating} Star
      </span>

      <div
        className={`relative mr-4 ml-2 h-2 w-full max-w-100 sm:ml-4`}
        style={{
          background: emptyColor,
        }}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all"
          style={{
            width: `${ratingPercentage}%`,
            backgroundColor: fillColor,
            transition: `width ${animationDuration}ms ${animationDelay}ms`,
          }}
        />
      </div>
      <span className="hidden min-w-10 text-xs whitespace-nowrap text-gray-500 md:block">
        {ratingPercentage < 1
          ? ratingPercentage === 0
            ? '0'
            : '<1.0'
          : ratingPercentage.toFixed(1)}{' '}
        %
      </span>
    </li>
  );
}

export default RatingPercentage;
