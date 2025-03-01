import VideoPlayer from '../../components/VideoPlayer';

import Intro from '../../assets/Intro.mp4';
import Subtitles from '../../assets/subtitles.vtt';
import Arabic from '../../assets/Arabic.png';

import StarRating from '../StarRating';

function CourseHeader({ course }) {
  const { title, instructors, rating, ratingCount } = course;

  console.log(course);
  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-y-4 lg:mr-0">
        <h1 className="text-3xl">{title}</h1>

        <div className="flex justify-between px-2 md:px-0">
          <div className="flex">
            {instructors.map((instructor, index) => (
              <img
                src="https://picsum.photos/102"
                key={instructor.name}
                width={38}
                className={`transform rounded-full border-2 border-[#DDE6ED]`}
                style={{
                  transform: `translateX(-${index * 17}px)`,
                  zIndex: index,
                }}
              />
            ))}
            <div className="flex flex-col">
              <p className="text-[11px] text-gray-500">Created by:</p>
              <p className="text-[11px]">
                {instructors.map((instructor) => instructor.name).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <StarRating rating={rating} />

            <span className="text-sm font-normal text-gray-900">
              {rating.toFixed(1)}
            </span>

            <span className="ml-1 text-xs font-normal text-gray-500">
              ({ratingCount} Ratings)
            </span>
          </div>
        </div>

        <VideoPlayer src={Intro} poster={Arabic} subtitleSrc={Subtitles} />
      </div>
    </>
  );
}

export default CourseHeader;
