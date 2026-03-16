import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  rounded = false,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all whitespace-nowrap focus:outline-none';

  const variants = {
    primary: 'bg-l5 text-[#DDE6ED] hover:bg-l5/95',
    secondary: 'border border-[#876A9A] text-[#876A9A] hover:bg-[#876A9A]/10',
    neutral: 'bg-[#FFEEE8] text-[#FF6636]',
    brand: 'bg-l6 text-white hover:bg-l6/90',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-current bg-transparent hover:bg-black/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = 'bg-gray-600 text-[#c0c0c0] opacity-50 cursor-not-allowed hover:none';

  const roundedStyles = rounded ? 'rounded-md' : 'rounded-none';
  const widthStyles = fullWidth ? 'w-full' : '';

  const computedClasses = `
    ${baseStyles}
    ${sizes[size]}
    ${roundedStyles}
    ${widthStyles}
    ${disabled || isLoading ? disabledStyles : variants[variant]}
    ${className}
    shadow-md shadow-[#20202020]
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={computedClasses}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
