const Button = ({
  children,
  type = 'primary',
  size = 'md',
  rounded = false,
  className,
  ...props
}) => {
  const baseStyles =
    'px-10 lg:px-14 py-2 font-bold transition-all cursor-pointer text-2xl whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-[#876A9A] text-[#DDE6ED]',
    secondary: 'border border-[#876A9A] text-[#876A9A]',
    danger: 'bg-orange-500 text-[#DDE6ED]',
    neutral: 'bg-gray-200 text-gray-700',
  };
  const sizeStyles = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2',
    lg: 'px-22 py-3 text-3xl',
  };
  const roundedStyles = rounded ? 'rounded-md' : 'rounded-none';

  return (
    <button
      className={`${baseStyles} ${typeStyles[type]} ${sizeStyles[size]} ${roundedStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
