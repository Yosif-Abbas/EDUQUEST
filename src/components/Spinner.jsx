import { motion } from 'framer-motion';

const Spinner = ({ size = 24, speed = 1.5, color = '#FF6636' }) => {
  return (
    <motion.div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
      >
        <path
          d="M12 3V6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.9"
          d="M18.364 5.63574L16.2427 7.75706"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.8"
          d="M21 12H18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.7"
          d="M18.364 18.3635L16.2427 16.2422"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.6"
          d="M12 21V18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M5.63623 18.3635L7.75755 16.2422"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M3 12H6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.3"
          d="M5.63623 5.63574L7.75755 7.75706"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
};

export default Spinner;
