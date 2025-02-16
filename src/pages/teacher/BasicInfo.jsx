function BasicInfo() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-1.5">
        <label htmlFor="course-title" className="">
          Title
        </label>
        <input
          type="text"
          id="course-title"
          placeholder="Your course title"
          className="border-1 border-white p-2 pl-4"
        />
      </div>

      <div className="mb-6 flex flex-col gap-1.5">
        <label htmlFor="course-title" className="">
          Subtitle
        </label>
        <input
          type="text"
          id="course-Subtitle"
          placeholder="Your course Subtitle"
          className="border-1 border-white p-2 pl-4"
        />
      </div>

      <div className="mb-6 flex gap-3">
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="course-category" className="">
            Course Category
          </label>
          <select
            id="course-category"
            className="w-full border-1 border-white p-2 pl-4 text-gray-400"
          >
            {/* {options.map((option, index) => (
            <option key={option.value}>{option.value}</option>
          ))} */}
            <option value={''}>Select...</option>
          </select>
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="course-sub-category" className="">
            Course Sub-category
          </label>
          <select
            id="course-sub-category"
            className="w-full border-1 border-white p-2 pl-4 text-gray-400"
          >
            {/* {options.map((option, index) => (
            <option key={option.value}>{option.value}</option>
          ))} */}
            <option value={''}>Select...</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-1.5">
        <label htmlFor="course-topic" className="">
          Topic
        </label>
        <input
          type="text"
          id="course-topic"
          placeholder="What is primarily taught in your course?"
          className="border-1 border-white p-2 pl-4"
        />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex min-w-fit flex-col gap-1.5 sm:basis-[250px]">
          <label htmlFor="course-level">Course Level</label>
          <select
            id="course-level"
            className="border-1 border-white p-2 pl-4 text-gray-400"
          >
            {/* {options.map((option, index) => (
            <option key={option.value}>{option.value}</option>
          ))} */}
            <option value={''}>Select...</option>
          </select>
        </div>
        <div className="relative flex min-w-fit flex-col gap-1.5 sm:basis-[250px]">
          <label htmlFor="course-duration">Course Duration</label>
          <input
            type="text"
            id="course-duration"
            placeholder="Course Duration"
            className="border-1 border-white p-2 pl-4"
          />
          <select className="absolute right-0 bottom-0 w-17 p-2 text-gray-400">
            <option value={'day'}>Day</option>
            <option value={'week'}>week</option>
            <option value={'month'}>month</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default BasicInfo;
