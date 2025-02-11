const Button = ({
  children,
  type = 'primary',
  size = 'md',
  rounded = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    'lg:px-10 font-bold transition-all cursor-pointer text-[18px] whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-[#876A9A] text-[#DDE6ED]',
    secondary: 'border border-[#876A9A] text-[#876A9A]',
    danger: 'bg-orange-500 text-[#DDE6ED]',
    neutral: 'bg-gray-200 text-gray-700',
  };
  const sizeStyles = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-5 py-1',
    lg: 'px-22 py-3 text-3xl',
  };
  const roundedStyles = rounded ? 'rounded-md' : 'rounded-none';

  function handleClick() {
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${typeStyles[type]} ${sizeStyles[size]} ${roundedStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
