function CourseSubject({ subject }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <span className="max-w-20 overflow-hidden bg-[#FFEEE8] px-2 whitespace-nowrap text-[#993D20] uppercase sm:max-w-25">
      {truncateText(subject, 10)}
    </span>
  );
}

export default CourseSubject;
