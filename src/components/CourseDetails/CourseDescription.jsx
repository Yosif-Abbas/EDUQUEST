import { IoIosCheckmarkCircle } from 'react-icons/io';

function CourseDescription({ description, whatYouWillLearn, requirements }) {
  return (
    <div className="flex flex-col gap-y-4">
      {/* Description */}
      <div>
        <h1 className="text-xl lg:text-2xl">Description</h1>
        <p className="text-sm font-normal text-gray-500">{description}</p>
      </div>

      {/* What you will learn */}
      <div className="bg-[#E1F7E366] px-6 py-6">
        <h1 className="mb-4 text-xl">What you will learn in this course</h1>
        <ul className="grid list-inside list-disc flex-wrap gap-x-4 gap-y-1 text-sm font-normal text-gray-500 md:grid-cols-2 md:gap-y-2">
          {/* List of course topics */}
          {whatYouWillLearn.map((topic, index) => (
            <li key={index} className="relative flex list-none">
              <IoIosCheckmarkCircle
                color="#23BD33"
                className="absolute top-1 left-0 md:-translate-y-1/16 md:text-xl"
              />{' '}
              <span className="ml-5 md:ml-6">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirement */}
      <div>
        <h1 className="mb-4 text-xl">Course Requirement</h1>

        <ul className="list-disc px-6 text-sm font-normal text-gray-500">
          {/* List of course requirements */}
          {requirements ? (
            requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))
          ) : (
            <li>No Requirements.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CourseDescription;
