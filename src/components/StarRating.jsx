import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({
  rating = 0,
  size = 16,
  isHoverEffect = false,
  currentRating,
  setCurrentRating,
  fillColor = '#FD8E1F',
}) => {
  const [hovered, setHovered] = useState(currentRating);

  return (
    <div
      className="flex items-center space-x-4"
      onMouseLeave={() => setHovered(currentRating)} // Reset hover when leaving the entire rating component
    >
      <div className="relative flex">
        {/* Background (Unfilled) Stars */}
        <div className="flex gap-x-1 text-gray-300">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-xl" size={size} />
          ))}
        </div>

        {/* Foreground (Filled) Stars */}
        <div
          className="pointer-events-none absolute top-0 left-0 flex"
          style={{
            width: `${((isHoverEffect ? hovered : rating) / 5) * 100}%`,
            overflow: 'hidden',
          }}
        >
          <div className={`flex gap-x-1 text-[${fillColor}]`}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl" size={size} />
            ))}
          </div>
        </div>

        {/* Invisible Overlay to Capture Hover */}
        {isHoverEffect && (
          <div className="absolute top-0 left-0 flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: `${size + 3}px`,
                  height: `${size}px`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHovered(i + 1)}
                onClick={() => setCurrentRating?.(i + 1)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
