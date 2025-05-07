function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function LectureHeader({ lecture }) {
  return (
    <div className="col-start-1 flex items-center justify-between pb-3">
      <h1 className="text-xl lg:text-2xl">{lecture?.title}</h1>

      <p className="text-xs font-normal text-gray-500">
        Last Updated:
        <span className="text-black"> {formatDate(lecture?.created_at)}</span>
      </p>
    </div>
  );
}

export default LectureHeader;

{
  /* <div className="flex min-w-68">
          <ul className="flex w-fit justify-between">
            {Array.from({ length: 5 }, () => {
              'https://picsum.photos/102';
            }).map((item, index) => (
              <img
                src=""
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
        </div> */
}
