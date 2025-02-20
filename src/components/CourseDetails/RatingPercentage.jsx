import StarRating from '../StarRating';

function RatingPercentage({ rating, TotalRatingCount, ratingCount }) {
  const ratingPercentage = (ratingCount / TotalRatingCount).toFixed(2);

  return (
    <li className="list-icon w-full">
      <StarRating rating={rating} />
      <span className="hidden text-xs whitespace-nowrap text-gray-500 sm:block">
        {rating} Star Rating
      </span>

      <div
        className="ml-2 h-2 w-full max-w-100 sm:ml-4"
        style={{
          background: `linear-gradient(to right, 
            #ff6636 0%, 
            #ff6636 ${ratingPercentage * 100}%, 
            #FFF2E5 ${ratingPercentage * 100}%, 
            #FFF2E5 100%)`,
        }}
      ></div>
      <span className="hidden text-xs whitespace-nowrap text-gray-500 md:block">
        {ratingPercentage * 100 < 1 ? '<1' : ratingPercentage * 100} %
      </span>
    </li>
  );
}

export default RatingPercentage;
