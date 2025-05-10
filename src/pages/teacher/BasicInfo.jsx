import Loading from '../../components/Loading';
import { useCategories } from '../../hooks/useGetCategories';

function BasicInfo() {
  const { categories, error, isLoading } = useCategories();

  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
      <Loading />
    </div>;
  }

  console.log(categories);

  return (
    <>
      <div className="mb-4 flex flex-col gap-1.5">
        <label htmlFor="title" className="required">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Your course title"
          className="required border-1 border-white p-2 pl-4"
        />
      </div>

      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="subject" className="required">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Your course Subject"
            className="border-1 border-white p-2 pl-4"
          />
        </div>

        <div className="mb-4 flex w-full flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="category" className="required">
            Category
          </label>
          <select
            id="category"
            className="w-full border-1 border-white p-2 pl-4 text-gray-700"
          >
            {categories.map((option, index) => (
              <option key={index} className="text-black">
                {option}
              </option>
            ))}
            <option value={''}>Select...</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <div className="mb-2 flex w-full gap-1.5 lg:w-1/2">
          <div className="flex grow flex-col gap-1.5">
            <label htmlFor="price" className="required">
              Price
            </label>

            <input
              type="text"
              id="price"
              placeholder="Price"
              className="border-1 border-white p-2 pl-4"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="currency" className="required">
              Currency
            </label>
            <input
              type="text"
              id="currency"
              placeholder="ex:LE"
              className="w-15 border-1 border-white p-2"
            />
          </div>
        </div>
        <div className="mb-4 flex w-full min-w-fit flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="level" className="required">
            Course Level
          </label>
          <select
            id="level"
            defaultValue={''}
            className="border-1 border-white p-2 pl-4 text-gray-700"
          >
            {[1, 2, 3].map((option, index) => (
              <option key={index}>{option}</option>
            ))}
            <option value={''}>Select...</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <div className="mb-2 flex w-full flex-col gap-1.5">
          <label htmlFor="discount" className="">
            Discount
          </label>
          <input
            type="text"
            id="discount"
            placeholder="discount %"
            className="border-1 border-white p-2 pl-4"
          />
        </div>
        <div className="mb-2 flex w-full flex-col gap-1.5">
          <label htmlFor="discount-end-date" className="">
            Discount end-date
          </label>
          <input
            type="date"
            id="discount-end-date"
            className="border-1 border-white p-2 pl-4"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        {/* <div className="relative flex min-w-fit flex-col gap-1.5 sm:basis-[250px]">
          <label htmlFor="duration">Course Duration</label>
          <input
            type="text"
            id="duration"
            placeholder="Course Duration"
            className="border-1 border-white p-2 pl-4"
          />
          <select className="absolute right-0 bottom-0 w-17 p-2 text-gray-700">
            <option value={'day'}>Day</option>
            <option value={'week'}>week</option>
            <option value={'month'}>month</option>
          </select>
        </div> */}
      </div>
    </>
  );
}

export default BasicInfo;
