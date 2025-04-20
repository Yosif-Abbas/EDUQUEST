import StarRating from '../StarRating';

function CourseHeader({ course }) {
  const { title, rating, rating_count, Teachers } = course;

  if (!Teachers) return null;

  const {
    Users: { first_name, last_name, image_url },
  } = Teachers;

  const instructorFullname = first_name + ' ' + last_name;

  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-4 lg:mr-0">
        <h1 className="text-3xl">{title}</h1>

        <div className="flex justify-between px-2 md:px-0">
          <div className="flex">
            <img
              src={image_url}
              key={instructorFullname}
              width={38}
              className="h-10 w-10 transform rounded-full border-2 border-[#DDE6ED] object-cover object-top"
            />
            <div className="ml-3 flex flex-col justify-around">
              <p className="text-[11px] text-gray-500">Created by:</p>
              <p className="text-[11px]">{instructorFullname}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <StarRating rating={rating} />

            <span className="text-sm font-normal text-gray-900">
              {Number(rating).toFixed(1)}
            </span>

            <span className="ml-1 text-xs font-normal text-gray-500">
              ({rating_count} Ratings)
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseHeader;
