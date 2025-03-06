function SocialButton({ icon, children, className, type = 'primary' }) {
  const typeStyles = {
    primary:
      'rounded-2xl border-1 border-black px-2 py-1 md:px-3 md:py-2 md:text-[14px] text-[10px] text-black',
    secondary:
      'bg-[#F5F7FA] text-[#4E5566] text-xs font-normal py-1.5 px-2 hover:bg-[#dbdfe6] transition-color duration-200',
  };

  return (
    <button
      className={`flex cursor-pointer items-center gap-2 whitespace-nowrap ${typeStyles[type]} ${className}`}
    >
      <span
        className={` ${type === 'secondary' ? 'text-xl' : 'text-4xl'} mr-1`}
      >
        {icon}
      </span>
      {children}
    </button>
  );
}

export default SocialButton;
