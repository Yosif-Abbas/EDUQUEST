function Title({ children, className }) {
  return (
    <h1 className={`text-6xl font-extrabold italic ${className}`}>
      {children}
    </h1>
  );
}

export default Title;
