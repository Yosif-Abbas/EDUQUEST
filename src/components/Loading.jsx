import { motion } from 'framer-motion';

const Loading = ({ size = 48, color = '#876A9A' }) => {
  const dotVariants = {
    animate: {
      y: [0, -5, 0], // Moves up and down
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
        repeat: Infinity, // Loop animation
        repeatType: 'mirror',
      },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[14, 24, 34].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="24"
          r="3"
          fill={color}
          animate={{
            y: [0, -5, 0, 0], // Moves up and down
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Infinity, // Continuous loop
            repeatType: 'mirror',
            delay: index * 0.2, // Each dot starts at a different time
          }}
        />
      ))}
    </motion.svg>
  );
};

export default Loading;
