import { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { LuUsersRound } from 'react-icons/lu';

function Instructor({ instructor }) {
  const {
    title,
    Users: { image_url, first_name, last_name, biography },
  } = instructor;

  const instructorRandom = useMemo(() => {
    const numberOfCourses = Math.floor(Math.random() * 26); // 0 to 25
    const numberOfStudents =
      numberOfCourses === 0
        ? 0
        : Math.floor(Math.random() * (numberOfCourses * 90)) +
          numberOfCourses * 10;
    const courseRating = (Math.random() * 5).toFixed(1); // 0 to 5 (1 decimal)

    return {
      numberOfCourses,
      numberOfStudents,
      courseRating,
    };
  }, []);

  const instructorFullName = `${first_name} ${last_name}`;

  return (
    <div className="flex items-start gap-3 p-4">
      <img
        src={image_url}
        alt={instructorFullName}
        className="h-22 w-22 rounded-full object-contain object-center md:h-32 md:w-32"
      />
      <div className="w-full text-xs font-normal text-gray-500">
        <h2 className="my-2 text-lg font-semibold text-black">
          {instructorFullName}
        </h2>

        <p className="">{title}</p>
        <ul className="md:text-s my-3 flex w-full max-w-120 justify-between">
          <li className="list-icon">
            <FaStar color="#FD8E1F" />
            <span>{instructorRandom.courseRating || 0} Course rating</span>
          </li>
          <li className="list-icon">
            <LuUsersRound color="#564FFD" />
            <span>{instructorRandom.numberOfStudents || 0}</span> students
          </li>
          <li className="list-icon">
            <IoIosPlayCircle color="#FF6636" />
            <span>{instructorRandom.numberOfCourses || 0}</span> course
          </li>
        </ul>
        <p>{biography}</p>
      </div>
    </div>
  );
}

export default Instructor;
