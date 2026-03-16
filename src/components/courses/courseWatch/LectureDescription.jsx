function LectureDescription({ description }) {
  return (
    <div>
      <h1 className="h-8 text-lg lg:text-xl">Lecture Description</h1>
      <p className="text-xs font-normal text-gray-500">{description}</p>
    </div>
  );
}

export default LectureDescription;
