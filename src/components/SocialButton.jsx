function SocialButton({ icon, children }) {
  return (
    <button className="flex cursor-pointer items-center rounded-2xl border-1 border-black px-2 py-1 text-[10px] text-black md:px-3 md:py-2 md:text-[14px]">
      <span className="mr-1 text-2xl text-black">{icon}</span>
      {children}
    </button>
  );
}

export default SocialButton;
