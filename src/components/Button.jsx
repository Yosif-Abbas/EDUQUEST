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
    'font-bold transition-all cursor-pointer text-[18px] whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-[#876A9A] text-[#DDE6ED]',
    secondary: 'border border-[#876A9A] text-[#876A9A]',
    danger: 'bg-orange-500 text-[#DDE6ED]',
    neutral: 'bg-[#FFEEE8] text-[#FF6636] font-medium',
  };
  const sizeStyles = {
    sm: 'px-6 py-1 text-sm',
    md: 'px-10 py-2',
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
