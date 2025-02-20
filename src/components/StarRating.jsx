import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Stars with a Gradient Overlay */}
      <div className="relative flex">
        <div className="flex gap-x-1 text-gray-300">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-xl" size={size} />
          ))}
        </div>
        <div
          className="absolute top-0 left-0 flex overflow-hidden"
          style={{ width: `${(rating / 5) * 100}%` }}
        >
          <div className="flex gap-x-1 text-[#FD8E1F]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl" size={size} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
