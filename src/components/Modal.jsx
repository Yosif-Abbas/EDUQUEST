import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, title, children }) => {
  const ref = useRef();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
      <div className="flex w-140 flex-col gap-y-4 bg-white px-4 py-4 shadow-lg" ref={ref}>
        <div className="flex items-center justify-between border-b-1 border-gray-200 pb-3">
          <h2 className="text-md font-medium">{title}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-900">
            <IoCloseOutline size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
