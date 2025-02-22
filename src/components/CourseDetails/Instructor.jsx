import { FaStar } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { LuUsersRound } from 'react-icons/lu';

function Instructor({ instructor }) {
  return (
    <div key={instructor.id} className="flex items-start gap-3 p-4">
      <img
        src={instructor.profilePicture}
        alt={instructor.name}
        className="h-22 w-22 rounded-full object-contain object-center md:h-32 md:w-32"
      />
      <div className="w-full text-xs font-normal text-gray-500">
        <h2 className="my-2 text-lg font-semibold text-black">
          {instructor.name}
        </h2>

        <p className="">{instructor.subjects?.join(', ')}</p>
        <ul className="md:text-s my-3 flex w-full max-w-120 justify-between">
          <li className="list-icon">
            <FaStar color="#FD8E1F" />
            <span>{instructor.courseRating || 0} Course rating</span>
          </li>
          <li className="list-icon">
            <LuUsersRound color="#564FFD" />
            <span>{instructor.numberOfStudents || 0}</span> students
          </li>
          <li className="list-icon">
            <IoIosPlayCircle color="#FF6636" />
            <span>{instructor.numberOfCourses || 0}</span> course
          </li>
        </ul>
        <p>{instructor.bio}</p>
      </div>
    </div>
  );
}

export default Instructor;
