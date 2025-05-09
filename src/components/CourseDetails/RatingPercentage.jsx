import StarRating from '../StarRating';

function RatingPercentage({
  rating,
  ratingPercentage,
  fillColor = '#FD8E1F',
  emptyColor = '#FFF2E5',
}) {
  return (
    <li className="list-icon w-full">
      <StarRating rating={rating} fillColor={fillColor} />
      <span className="hidden text-xs whitespace-nowrap text-gray-500 duration-700 sm:block">
        {rating} Star
      </span>

      <div
        className="mr-4 ml-2 h-2 w-full max-w-100 sm:ml-4"
        style={{
          background: `linear-gradient(to right, 
            ${fillColor} 0%, 
            ${fillColor} ${ratingPercentage}%, 
            ${emptyColor} ${ratingPercentage}%, 
            ${emptyColor} 100%)`,
        }}
      ></div>
      <span className="hidden min-w-10 text-xs whitespace-nowrap text-gray-500 md:block">
        {ratingPercentage < 1 ? '<1.0' : ratingPercentage.toFixed(1)} %
      </span>
    </li>
  );
}

export default RatingPercentage;
