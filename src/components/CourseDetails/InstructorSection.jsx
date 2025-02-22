import Instructor from './Instructor';

function InstructorSection({ instructors }) {
  return (
    <div>
      <h1 className="mb-6 text-xl lg:text-2xl">Course Instructors</h1>
      <div className="mx-auto  divide-y-2 divide-gray-100 bg-white">
        {instructors.map((instructor) => {
          return <Instructor key={instructor.name} instructor={instructor} />;
        })}
      </div>
    </div>
  );
}

export default InstructorSection;
