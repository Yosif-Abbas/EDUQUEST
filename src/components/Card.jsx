import { useNavigate } from 'react-router-dom';
import CourseSubject from './CourseSubject';

function Card({ course }) {
  const navigate = useNavigate();

  const handleCourseRedirect = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <li className="h-fit w-42 bg-white sm:w-65 lg:w-85">
      <div
        onClick={handleCourseRedirect}
        className="h-27 cursor-pointer overflow-hidden transition-opacity duration-200 hover:opacity-75 sm:h-42 lg:h-55"
      >
        <img src={course.image} alt={course.subject} className="w-full" />
      </div>

      <div className="p-4 text-xs font-medium sm:text-sm">
        <div className="flex items-center justify-between pb-4">
          <CourseSubject subject={course.subject} />
          <span className="font-bold text-[#FF6636] sm:text-lg">
            {course.price}LE
          </span>
        </div>

        <h3>{course.title}</h3>
      </div>
      <div className="flex items-center justify-between border-t border-[#8C94A355] p-4 text-xs font-medium sm:text-lg">
        <span>⭐ {course.rating}</span>
        <span className="text-[#4E5566]">
          {course.students_enrolled}{' '}
          <span className="text-[#4E5566aa]">Students</span>
        </span>
      </div>
    </li>
  );
}

export default Card;
