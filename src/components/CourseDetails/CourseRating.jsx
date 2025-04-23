import { ratingHelper, ratingPercentageHelper } from '../../utils/helpers';
import StarRating from '../StarRating';
import RatingPercentage from './RatingPercentage';

function CourseRating({ ratings }) {
  const { ratingCount, rating } = ratingHelper(ratings);

  const ratingPercentage = ratingPercentageHelper(ratings, ratingCount);

  return (
    <div>
      <h1 className="mb-6 text-xl lg:text-2xl">Course Rating</h1>
      <div className="flex w-full max-w-200 gap-x-6">
        <div className="mx-auto flex w-50 flex-col items-center justify-center gap-y-4 bg-white py-4">
          <h1 className="mb-2 text-4xl">{rating}</h1>
          <StarRating rating={rating} size={18} />
          <p className="text-xs">Course Rating</p>
        </div>

        <div className="w-full">
          <ul className="flex h-full w-full flex-col justify-between">
            {Array.from({ length: 5 }, (_, i) => 5 - i).map((i) => (
              <RatingPercentage
                key={i}
                rating={i}
                TotalRatingCount={ratingCount}
                ratingCount={ratings[`${i}_stars`]}
                ratingPercentage={ratingPercentage[`${i}_stars`]}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseRating;
