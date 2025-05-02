import FeedbackComment from './FeedbackComment';
import Selector from '../Selector';
import { useEffect, useState } from 'react';

function StudentReviews({ studentsFeedback }) {
  const [displayedFeedback, setDisplayedFeedback] = useState(studentsFeedback);
  const [selected, setSelected] = useState(0);

  useEffect(
    function () {
      if (selected > 0)
        setDisplayedFeedback(
          studentsFeedback.filter((feedback) => feedback.rating === selected),
        );
      else setDisplayedFeedback(studentsFeedback);
    },
    [studentsFeedback, selected],
  );

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-xl lg:text-2xl">Students Feedback</h1>
        <Selector
          onChange={setSelected}
          options={[
            { 0: 'All Ratings' },
            ...Array.from({ length: 5 }, (_, i) => ({
              [i + 1]: `${i + 1} Star Rating`,
            })),
          ]}
        />
      </div>

      {/* Comment Section */}
      {displayedFeedback.length ? (
        displayedFeedback.map((feedback) => (
          <FeedbackComment feedback={feedback} key={feedback.id} />
        ))
      ) : (
        <p className="text-md text-gray-700">
          No feedbacks with {selected} Star{selected !== 1 && 's'}.
        </p>
      )}
    </div>
  );
}

export default StudentReviews;
