function Title({ children, className }) {
  return (
    <h1
      className={`text-4xl font-extrabold tracking-widest text-[#27374D] ${className}`}
    >
      {children}
    </h1>
  );
}

export default Title;
