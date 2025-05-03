import { IoCloseOutline } from 'react-icons/io5';
import StarRating from './StarRating';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PiPaperPlaneRightFill } from 'react-icons/pi';

const ReviewModal = ({ isOpen, onClose, rating, review_comment }) => {
  const ref = useRef();

  const [currentRating, setCurrentRating] = useState(rating ?? 0);
  const [currentComment, setCurrentComment] = useState(review_comment ?? '');
  console.log(currentRating);

  const handleClose = useCallback(() => {
    onClose();
    setCurrentRating(rating ?? 0);
    setCurrentComment('');
  }, [onClose, setCurrentRating, setCurrentComment, rating]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-gray-500/50 backdrop-blur-xs">
      <div
        className="mx-2 flex w-140 flex-col gap-y-4 bg-white pb-4 shadow-lg"
        ref={ref}
      >
        <div className="flex items-center justify-between border-b-1 border-gray-200 px-4 py-3">
          <h2 className="text-md font-medium">Write A Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="tracking-wide">
            {currentRating} Star{currentRating !== 1 ? 's' : ''}
            {/* <span className="text-sm font-normal text-gray-500">
              (Good/Amazing)
            </span> */}
          </p>
          <StarRating
            isHoverEffect
            size={32}
            currentRating={currentRating}
            setCurrentRating={setCurrentRating}
          />
        </div>

        <div className="mx-2 mt-2">
          <label className="mb-2 block text-sm font-normal">Feedback</label>
          <textarea
            className="w-full resize-none overflow-hidden border-1 border-gray-200 p-2 font-normal placeholder:font-normal"
            rows="4"
            placeholder="Write down your feedback here..."
          ></textarea>
        </div>

        <div className="mx-4 flex justify-between space-x-2">
          <button
            onClick={handleClose}
            className="bg-gray-100 px-4 py-2 transition-all duration-200 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            className="bg-L6 list-icon hover:bg-L6/90 px-4 py-2 font-normal text-white"
            onClick={handleClose}
          >
            Submit Review <PiPaperPlaneRightFill />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReviewModal;
