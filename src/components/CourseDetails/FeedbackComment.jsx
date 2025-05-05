import { timeSince } from '../../utils/helpers';
import StarRating from '../StarRating';

function FeedbackComment({ feedback }) {
  const {
    rating,
    text,
    timestamp,
    users: { first_name, last_name, image_url },
  } = feedback;

  const timeSinceReview = timeSince(timestamp);

  const fullname = `${first_name} ${last_name}`;

  return (
    <div className="flex items-start gap-4 p-4">
      <img
        src={image_url}
        alt={fullname}
        width={38}
        className="h-10 w-10 rounded-full object-cover object-top"
      />
      <div className="flex flex-col gap-y-2">
        {/* Name and Time */}
        <div className="flex items-center">
          <p>{fullname} &bull;</p>

          <span className="ml-1 text-xs font-semibold text-gray-500">
            {timeSinceReview}
          </span>
        </div>

        {/* Rating Stars */}

        <StarRating rating={rating} />

        {/* Comment */}
        <p className="mt-2 text-sm font-normal text-gray-600">{text}</p>
      </div>
    </div>
  );
}

export default FeedbackComment;
