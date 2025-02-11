function Title({ children, className }) {
  return (
    <h1
      className={`text-main-txt mb-3 text-2xl font-extrabold xl:text-3xl ${className}`}
    >
      {children}
    </h1>
  );
}

export default Title;
