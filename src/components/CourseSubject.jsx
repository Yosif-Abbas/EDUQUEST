function CourseSubject({ subject }) {
  return (
    <span
      className="block max-w-[80px] truncate overflow-hidden bg-[#FFEEE8] px-2 whitespace-nowrap text-[#993D20] uppercase sm:max-w-[100px]"
      title={subject}
    >
      {subject}
    </span>
  );
}

export default CourseSubject;
