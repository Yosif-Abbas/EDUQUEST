function SocialButton({ icon, children }) {
  return (
    <button className="flex cursor-pointer items-center rounded-2xl border-1 border-black px-6 py-2 text-[16px] text-black">
      <span className="mr-2 text-4xl text-black">{icon}</span>
      {children}
    </button>
  );
}

export default SocialButton;
