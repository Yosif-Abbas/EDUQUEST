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
    'font-bold transition-all cursor-pointer  whitespace-nowrap';
  const typeStyles = {
    primary: 'bg-[#876A9A] text-[#DDE6ED]',
    secondary: 'border border-[#876A9A] text-[#876A9A]',
    neutral: 'bg-[#FFEEE8] text-[#FF6636] font-medium',
  };
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs font-semibold',
    md: 'px-10 py-2 text-md',
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
