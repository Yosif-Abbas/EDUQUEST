import { useNavigate } from 'react-router-dom';
import CourseSubject from './CourseSubject';
import { LuUserRound } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';

function Card({ course, className }) {
  const navigate = useNavigate();

  const handleCourseRedirect = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <li
      className={`h-fit w-full max-w-[312px] border-1 border-gray-300 bg-white ${className}`}
    >
      <figure
        onClick={handleCourseRedirect}
        className="h-27 cursor-pointer overflow-hidden transition-opacity duration-200 hover:opacity-75 lg:h-36 xl:h-42 2xl:h-47"
      >
        <img src={course.image_url} alt={course.subject} className="w-full" />
      </figure>

      <div className="p-2 text-xs font-medium sm:p-4 lg:text-sm">
        <div className="flex items-center justify-between pb-4">
          <CourseSubject subject={course.subject} />
          <span className="font-bold text-[#FF6636] lg:text-lg">
            {course.price}LE
          </span>
        </div>

        <h3>{course.title}</h3>
      </div>

      <div className="flex items-center justify-between border-t border-[#8C94A355] p-4 text-xs font-medium lg:text-lg">
        <span className="list-icon">
          <FaStar color="#FD8E1F" /> {course.rating}
        </span>

        <span className="list-icon text-[#4E5566]">
          <LuUserRound color="#564FFD" />
          {course.students_enrolled}{' '}
          <span className="text-[#4E5566aa]">Students</span>
        </span>
      </div>
    </li>
  );
}

export default Card;
