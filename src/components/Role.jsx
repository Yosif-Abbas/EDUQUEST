import Picture from './Home/Picture';

function Role({ values, handleChange, handleBlur }) {
  return (
    <div className="my-2 flex gap-x-4">
      <label className="flex cursor-pointer flex-col items-center">
        <input
          type="radio"
          name="role"
          value="student"
          checked={values.role === 'student'}
          onChange={handleChange}
          onBlur={handleBlur}
          className="hidden cursor-pointer accent-blue-500"
        />
        <Picture
          name="student"
          className={`w-40 md:w-60 ${values.role === 'student' ? 'ring-l4 ring-2' : ''}`}
        />
        <span>Student</span>
      </label>

      <label className="flex cursor-pointer flex-col items-center">
        <input
          type="radio"
          name="role"
          value="teacher"
          checked={values.role === 'teacher'}
          onChange={handleChange}
          onBlur={handleBlur}
          className="hidden cursor-pointer accent-blue-500"
        />
        <Picture
          name="teacher"
          className={`w-40 md:w-60 ${values.role === 'teacher' ? 'ring-l4 ring-2' : ''}`}
        />
        <span>Teacher</span>
      </label>
    </div>
  );
}

export default Role;
