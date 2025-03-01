import FeedbackComment from './FeedbackComment';
import Selector from '../Selector';

function StudentReviews({ studentsFeedback }) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-xl lg:text-2xl">Students Feedback</h1>
        <Selector
          options={[
            { all: 'All Ratings' },
            ...Array.from({ length: 5 }, (_, i) => ({
              [i + 1]: `${i + 1} Star Rating`,
            })),
          ]}
        />
      </div>

      {/* Comment Section */}
      {studentsFeedback.map((feedback) => (
        <FeedbackComment feedback={feedback} key={feedback.id} />
      ))}
    </div>
  );
}

export default StudentReviews;
