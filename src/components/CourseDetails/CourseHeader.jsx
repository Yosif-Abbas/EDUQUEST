import { ratingHelper } from '../../utils/helpers';
import StarRating from '../StarRating';

function CourseHeader({ course }) {
  const { title, ratings, teachers } = course;

  if (!teachers) return null;

  const {
    users: { first_name, last_name, image_url },
  } = teachers;

  const instructorFullname = first_name + ' ' + last_name;

  const { ratingCount, rating } = ratingHelper(ratings[0]);

  return (
    <div className="mx-auto mb-4 flex w-full flex-col gap-y-4 lg:col-span-1 lg:mr-0">
      <h1 className="text-3xl">{title}</h1>

      <div className="flex justify-between px-2 md:px-0">
        <div className="flex">
          <img
            src={image_url}
            alt={instructorFullname}
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
            ({ratingCount || 0} Ratings)
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;
