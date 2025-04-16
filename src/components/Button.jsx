const Button = ({
  children,
  type = 'primary',
  size = 'md',
  rounded = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles = 'font-bold transition-all whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-[#876A9A] text-[#DDE6ED] cursor-pointer',
    secondary: 'border border-[#876A9A] text-[#876A9A] cursor-pointer',
    neutral: 'bg-[#FFEEE8] text-[#FF6636] font-medium cursor-pointer',
    disabled: 'bg-gray-600 text-[#B0B0B0] cursor-not-allowed',
  };
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs font-semibold',
    md: 'px-10 py-2 text-md',
    lg: 'px-22 py-3 text-3xl',
  };
  const roundedStyles = rounded ? 'rounded-md' : 'rounded-none';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${typeStyles[props.disabled ? 'disabled' : type]} ${sizeStyles[size]} ${roundedStyles} ${className} cursorr-zoom-in`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
