function Title({ children, className }) {
  return (
    <h1 className={`mt-6 ml-12 text-6xl font-extrabold italic ${className}`}>
      {children}
    </h1>
  );
}

export default Title;
