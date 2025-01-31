import { useNavigate } from 'react-router-dom';

function Card({ course }) {
  const navigate = useNavigate();

  const handleCourseRedirect = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="cursor-pointer bg-white" onClick={handleCourseRedirect}>
      <img src={course.image} alt={course.subject} />

      <div className="p-4">
        <div className="flex items-center justify-between pb-4">
          <span className="bg-[#FFEEE8] px-2 font-medium text-[#993D20] uppercase">
            {course.subject}
          </span>
          <span className="text-xl font-bold text-[#FF6636]">
            {course.price}LE
          </span>
        </div>

        <h3 className="text-lg font-medium">{course.title}</h3>
      </div>
      <div className="flex items-center justify-between border-t border-[#8C94A355] p-4 text-lg font-medium">
        <span>⭐ {course.rating}</span>
        <span className="text-[#4E5566]">
          {course.students_enrolled}{' '}
          <span className="text-[#8C94A3]">Students</span>
        </span>
      </div>
    </div>
  );
}

export default Card;
