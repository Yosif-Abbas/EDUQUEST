import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';

function AdvancedInfo() {
  const [thumbnail, setThumbnail] = useState('');

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row xl:items-center">
        <div className="basis-1/2">
          <h2 className="mb-2 text-lg">Course Thumbnail</h2>
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
            <figure className="sself-start aspect-[12/8] min-h-[160px] min-w-[230px] bg-white"></figure>
            <div className="flex flex-col justify-between">
              <p className="mb-3 font-[400] text-gray-400">
                Upload your course Thumbnail here.{' '}
                <span className="text-black">Important guidelines:</span>{' '}
                1200x800 pixels or 12:8 Ratio. Supported format:{' '}
                <span className="text-black">.jpg, .jpeg, or .png</span>
              </p>
              <button className="bg-alt-darker text-pinky-violet flex w-fit items-center gap-3 px-4.5 py-2 font-[600]">
                <span>Upload Image</span>
                <BsUpload />
              </button>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <h2 className="mb-2 text-lg">Course Trailer</h2>
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
            <figure className="sself-start aspect-[12/8] min-h-[160px] min-w-[230px] bg-white"></figure>
            <div className="flex flex-col justify-between">
              <p className="mb-3 font-[400] text-gray-400">
                Students who watch a well-made promo video are 5X more likely to
                enroll in your course. We&lsquo;ve seen that statistic go up to
                10X for exceptionally awesome videos.
              </p>
              <button className="bg-alt-darker text-pinky-violet flex w-fit items-center gap-3 px-4.5 py-2 font-[600]">
                <span>Upload Video</span>
                <BsUpload />
              </button>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-1.5">
        <label htmlFor="course-Description" className="mb-2 text-lg">
          Course Description
        </label>
        <textarea
          id="course-Description"
          placeholder="Enter your course description"
          className="h-62 w-full border-1 border-white p-2 pl-4"
        ></textarea>
        {/* <div>Text editor tool for the description</div> */}
      </div>
      <div>
        <h2 className="mb-2 text-lg">What you will teach in this course ()</h2>
        <button className="text-pinky-violet mb-4 flex items-center gap-1">
          <GoPlus />
          <span>Add new</span>
        </button>
        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="course-title" className="">
            01
          </label>
          <input
            type="text"
            id="course-title"
            placeholder="What will you teach in this course?"
            className="border-1 border-white p-2 pl-4"
          />
        </div>
      </div>
    </>
  );
}

export default AdvancedInfo;
