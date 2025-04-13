import { FaStar } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { LuUsersRound } from 'react-icons/lu';
import { useCoursesByTeacher } from '../../hooks/useCoursesByTeacher';
import Loading from '../Loading';

function Instructor({ instructor }) {
  const {
    title,
    Users: { image_url, first_name, last_name, biography },
  } = instructor;

  const { courses, error, isLoading } = useCoursesByTeacher(instructor.id);

  // students count
  const teacherStudents = courses.reduce(
    (acc, course) => course.students_enrolled + acc,
    0,
  );

  // courses count
  const teacherCoursesCount = courses.length;

  // average rating
  const teacherRating = (
    courses.reduce((acc, course) => course.rating + acc, 0) /
    teacherCoursesCount
  ).toFixed(1);

  console.log(courses);

  console.log(teacherStudents);

  const instructorFullName = `${first_name} ${last_name}`;

  if (isLoading) return <Loading />;

  

  return (
    <div className="flex items-start gap-5 p-4">
      <img
        src={image_url}
        alt={instructorFullName}
        className="aspect-square h-24 w-24 rounded-full object-cover object-center md:h-32 md:w-32"
      />
      <div className="w-full text-xs font-normal text-gray-500">
        <h2 className="my-2 text-lg font-semibold text-black">
          {instructorFullName}
        </h2>

        <p className="">{title}</p>
        <ul className="md:text-s my-3 flex w-full max-w-120 justify-between">
          <li className="list-icon">
            <FaStar color="#FD8E1F" />
            <span>{teacherRating || 0} Course rating</span>
          </li>
          <li className="list-icon">
            <LuUsersRound color="#564FFD" />
            <span>{teacherStudents || 0}</span> students
          </li>
          <li className="list-icon">
            <IoIosPlayCircle color="#FF6636" />
            <span>{teacherCoursesCount || 0}</span> course
          </li>
        </ul>
        <p>{biography}</p>
      </div>
    </div>
  );
}

export default Instructor;
