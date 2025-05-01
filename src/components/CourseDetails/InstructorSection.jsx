import Instructor from './Instructor';

function InstructorSection({ instructor }) {
  if (!instructor) return null;


  return (
    <div>
      <h1 className="mb-6 text-xl lg:text-2xl">Course Instructor</h1>
      <div className="mx-auto divide-y-2 divide-gray-100 bg-white">
        <Instructor key={instructor.id} instructor={instructor} />
      </div>
    </div>
  );
}

export default InstructorSection;
