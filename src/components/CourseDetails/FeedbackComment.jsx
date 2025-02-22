import StarRating from '../StarRating';

function FeedbackComment({ feedback }) {
  return (
    <div className="flex items-start gap-4 p-4">
      <img
        src={feedback.avatar}
        alt={feedback.name}
        className="w-10 rounded-full"
      />
      <div className="flex flex-col gap-y-2">
        {/* Name and Time */}
        <div className="flex items-center">
          <p>{feedback.name} &bull;</p>

          <span className="ml-1 text-xs font-semibold text-gray-500">
            {feedback.time_spent} ago
          </span>
        </div>

        {/* Rating Stars */}

        <StarRating rating={feedback.rating} />

        {/* Comment */}
        <p className="mt-2 text-sm font-normal text-gray-600">
          {feedback.comment}
        </p>
      </div>
    </div>
  );
}

export default FeedbackComment;
