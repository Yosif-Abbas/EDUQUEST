const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  size = 'md',
  rounded = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles = 'font-bold transition-all whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-l5 text-[#DDE6ED] cursor-pointer hover:bg-l5/95',
    secondary: 'border border-[#876A9A] text-[#876A9A] cursor-pointer',
    neutral: 'bg-[#FFEEE8] text-[#FF6636] font-medium cursor-pointer',
    disabled: 'bg-gray-600 opacity-50 text-[#B0B0B0] cursor-not-allowed',
  };
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs font-semibold',
    md: 'px-6 py-2 text-[18px]',
    lg: 'px-22 py-3 text-3xl',
  };
  const roundedStyles = rounded ? 'rounded-md' : 'rounded-none';

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${typeStyles[props.disabled ? 'disabled' : variant]} ${sizeStyles[size]} ${roundedStyles} ${className} $`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
