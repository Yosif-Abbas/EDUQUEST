import { useNavigate } from 'react-router-dom';
import CourseSubject from './CourseSubject';
import { LuUserRound } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';

const no_image_url =
  'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

function Card({ course, className }) {
  const navigate = useNavigate();

  const handleCourseRedirect = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <li className={`h-fit w-full border border-gray-300 bg-white ${className}`}>
      <figure
        onClick={handleCourseRedirect}
        className="h-28 cursor-pointer overflow-hidden transition-opacity duration-200 hover:opacity-75 sm:h-32 md:h-36 lg:h-42 xl:h-48"
      >
        <img
          src={course.image_url ? course.image_url : no_image_url}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = no_image_url;
          }}
          alt={course.subject}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="p-2 text-xs font-medium sm:p-4 lg:text-sm">
        <div className="flex items-center justify-between pb-4">
          <CourseSubject subject={course.subject} />
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
