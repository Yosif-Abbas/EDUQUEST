function LectureHeader() {
  return (
    <div className="col-start-1">
      <h1 className="pb-3 text-xl lg:text-2xl">1. Intoduction in math</h1>

      <div className="flex justify-between">
        {/* left */}
        <div className="flex min-w-68">
          <ul className="flex w-fit justify-between">
            {Array.from({ length: 5 }, () => {
              'https://picsum.photos/102';
            }).map((_, index) => (
              <img
                src="https://picsum.photos/102"
                key={index}
                width={30}
                className={`transform rounded-full border-2 border-[#fff]`}
                style={{
                  transform: `translateX(-${index * 12}px)`,
                  zIndex: index,
                }}
              />
            ))}
          </ul>
          <div className="-translate-x-10 text-xs">
            <p className="">512</p>
            <p className="text-[#4E5566]">Student Watching</p>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-row-reverse flex-wrap gap-x-2 self-end text-xs font-normal text-gray-500">
          <p>
            Comment:
            <span className="text-black"> 145</span>
          </p>
          <p>
            Last Updated:
            <span className="text-black"> Oct 26,2020</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LectureHeader;
