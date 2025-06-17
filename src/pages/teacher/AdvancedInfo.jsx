import { useEffect, useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import DynamicInputGroup from '../../components/Teacher/DynamcInputGroup';
import VideoPlayer from './../../components/VideoPlayer';

function AdvancedInfo({ course, setCourse, errors, showErrors }) {
  const {
    image_url,
    intro,

    course_benefits: benefits = [''],
    course_requirements: requirements = [''],
    course_includes: includes = [''],
  } = course ?? {};

  const thumbnailInputRef = useRef(null);
  const trailerInputRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(image_url);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [trailer, setTrailer] = useState(intro);
  const [trailerPreview, setTrailerPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));

      setCourse((prev) => ({
        ...prev,
        image_url: file,
      }));
    }
  };

  const handleTrailerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTrailer(file);
      setTrailerPreview(URL.createObjectURL(file));

      setCourse((prev) => ({
        ...prev,
        intro: file,
      }));
    }
  };

  const handleChangeField = (value, field) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [field]: value,
    }));
  };

  const updateListField = (value, index, field) => {
    setCourse((prevCourse) => {
      const updatedList = [...(prevCourse[field] || [])];
      updatedList[index] = value;

      return {
        ...prevCourse,
        [field]: updatedList,
      };
    });
  };

  const addListFieldItem = (field, value = '') => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [field]: [...(prevCourse[field] || []), value],
    }));
  };

  const removeListFieldItem = (index, field) => {
    setCourse((prevCourse) => {
      const updatedList = [...(prevCourse[field] || [])].filter(
        (_, i) => i !== index,
      );

      return {
        ...prevCourse,
        [field]: updatedList,
      };
    });
  };

  useEffect(() => {
    if (course?.image_url && typeof course.image_url !== 'string') {
      setThumbnailPreview(URL.createObjectURL(course.image_url));
    } else if (typeof course.image_url === 'string') {
      setThumbnailPreview(course.image_url);
    }

    if (course?.intro && typeof course.intro !== 'string') {
      setTrailerPreview(URL.createObjectURL(course.intro));
    } else if (typeof course.intro === 'string') {
      setTrailerPreview(course.intro);
    }
  }, [course]);

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row xl:items-center">
        <div className="basis-1/2">
          <label className="required mb-2 text-lg">
            Course Thumbnail{' '}
            {showErrors && errors.image_url && (
              <span className="text-sm text-red-500">({errors.image_url})</span>
            )}
          </label>
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
            <figure
              className={`aspect-[12/8] min-h-[160px] min-w-[230px] ${showErrors && errors.image_url ? 'border-2 border-red-500' : 'bg-white'}`}
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="h-full w-full object-cover object-top"
                />
              ) : null}
            </figure>
            <div className="flex flex-col justify-between">
              <p className="mb-3 font-[400] text-gray-400">
                Upload your course Thumbnail here.{' '}
                <span className="text-black">Important guidelines:</span>{' '}
                1200x800 pixels or 12:8 Ratio. Supported format:{' '}
                <span className="text-black">.jpg, .jpeg, or .png</span>
              </p>
              <button
                className="bg-alt-darker text-pinky-violet flex w-fit items-center gap-3 px-4.5 py-2 font-[600]"
                onClick={() => thumbnailInputRef.current.click()}
              >
                <span>Upload Image</span>
                <BsUpload />
              </button>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <label className="required mb-2 text-lg">
            Course Trailer{' '}
            {showErrors && errors.intro && (
              <span className="text-sm text-red-500">({errors.intro})</span>
            )}
          </label>
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
            <figure
              className={`aspect-[12/8] min-h-[160px] min-w-[230px] ${showErrors && errors.intro ? 'border-2 border-red-500' : 'bg-white'}`}
            >
              {trailerPreview ? (
                <VideoPlayer src={trailerPreview} isSmall />
              ) : null}
            </figure>
            <div className="flex flex-col justify-between">
              <p className="mb-3 font-[400] text-gray-400">
                Students who watch a well-made promo video are 5X more likely to
                enroll in your course. We&lsquo;ve seen that statistic go up to
                10X for exceptionally awesome videos.
              </p>
              <button
                className="bg-alt-darker text-pinky-violet flex w-fit items-center gap-3 px-4.5 py-2 font-[600]"
                onClick={() => trailerInputRef.current.click()}
              >
                <span>Upload Video</span>
                <BsUpload />
              </button>
              <input
                ref={trailerInputRef}
                type="file"
                accept="video/mp4, video/webm"
                onChange={handleTrailerChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 divide-y-2 divide-gray-300">
        <DynamicInputGroup
          items={benefits}
          name="course_benefits"
          title="What you will teach in this course"
          onAdd={addListFieldItem}
          onRemove={removeListFieldItem}
          onChange={updateListField}
          placeholder="You will teach"
          maxItems={6}
          error={showErrors && errors.course_benefits}
        />

        <DynamicInputGroup
          title="Course Requirements"
          name="course_requirements"
          items={requirements}
          onAdd={addListFieldItem}
          onRemove={removeListFieldItem}
          onChange={updateListField}
          placeholder="Add a course requirement"
          maxItems={6}
          error={showErrors && errors.course_requirements}
        />

        <DynamicInputGroup
          items={includes}
          title="Course Includes"
          name="course_includes"
          onAdd={addListFieldItem}
          onRemove={removeListFieldItem}
          onChange={updateListField}
          datalistId="includes-options"
          datalistOptions={['24h', 'idk', 'idc', 'lmao']}
          placeholder="Course will include"
          maxItems={6}
          error={showErrors && errors.course_includes}
        />
      </div>
      {/* You can handle form submission here */}
    </>
  );
}

export default AdvancedInfo;
