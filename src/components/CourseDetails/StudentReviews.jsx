import { MdKeyboardArrowDown } from 'react-icons/md';
import FeedbackComment from './FeedbackComment';

function StudentReviews({ studentsFeedback }) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-xl lg:text-2xl">Students Feedback</h1>
        <div className="relative">
          <select className="w-32 appearance-none border-1 border-[#E9EAF0] bg-white px-2 py-2.5 text-xs">
            <option value="5">5 Star Rating</option>
            <option value="4">4 Star Rating</option>
            <option value="3">3 Star Rating</option>
            <option value="2">2 Star Rating</option>
            <option value="1">1 Star Rating</option>
          </select>
          <MdKeyboardArrowDown
            className="absolute top-1/2 right-0 -translate-1/2"
            size={18}
          />
        </div>
      </div>

      {/* Comment Section */}
      {studentsFeedback.map((feedback) => (
        <FeedbackComment feedback={feedback} key={feedback.id} />
      ))}
    </div>
  );
}

export default StudentReviews;
