import Loading from '../../components/Loading';
import { useCategories } from '../../hooks/useGetCategories';

function BasicInfo({ course, setCourse, errors, showErrors }) {
  const { categories, error, isLoading } = useCategories();
  const {
    title: courseTitle = '',
    subject: courseSubject = '',
    category: courseCategory = '',
    regularPrice: price = '',
    currency: courseCurrency = 'LE',
    course_level: courseLevel = '',
    discount: courseDiscount = '',
    discount_end_date: discountEndDate = '',
    description,
  } = course ?? {};

  const handleChangeField = (value, field) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [field]: value,
    }));
  };

  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
      <Loading />
    </div>;
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-1.5">
        <label htmlFor="title" className="required">
          Title{' '}
          {showErrors && errors.title && (
            <span className="text-sm text-red-500">({errors.title})</span>
          )}
        </label>
        <input
          type="text"
          id="title"
          placeholder="Your course title"
          className={`required border-1 p-2 pl-4 ${showErrors && errors.title ? 'border-red-500' : 'border-white'}`}
          value={courseTitle}
          onChange={(e) => handleChangeField(e.target.value, 'title')}
        />
      </div>

      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="subject" className="required">
            Subject{' '}
            {showErrors && errors.subject && (
              <span className="text-sm text-red-500">({errors.subject})</span>
            )}
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Your course Subject"
            className={`border-1 p-2 pl-4 ${showErrors && errors.subject ? 'border-red-500' : 'border-white'}`}
            value={courseSubject}
            onChange={(e) => handleChangeField(e.target.value, 'subject')}
          />
        </div>

        <div className="mb-4 flex w-full flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="category" className="required">
            Category{' '}
            {showErrors && errors.category && (
              <span className="text-sm text-red-500">({errors.category})</span>
            )}
          </label>
          <select
            id="category"
            defaultValue={courseCategory}
            onChange={(e) => handleChangeField(e.target.value, 'category')}
            className={`w-full border-1 p-2 pl-4 text-gray-700 ${showErrors && errors.category ? 'border-red-500' : 'border-white'}`}
          >
            <option value={''}>Select...</option>
            {categories.map((option, index) => (
              <option key={index} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <div className="mb-2 flex w-full gap-1.5 lg:w-1/2">
          <div className="flex grow flex-col gap-1.5">
            <div className="flex items-center gap-x-2">
              <label htmlFor="price" className="required">
                Price{' '}
                {showErrors && errors.regularPrice && (
                  <span className="text-sm text-red-500">
                    ({errors.regularPrice})
                  </span>
                )}
              </label>
              <span className="text-[10px] text-gray-500">
                0 is a free course,
              </span>
              <span className="text-[10px] text-gray-500">
                max price is 2500LE{' '}
              </span>
            </div>
            <input
              type="number"
              min={0}
              max={2500}
              id="price"
              placeholder="Price"
              value={price > 2500 ? 2500 : price && price < 0 ? 0 : price}
              onChange={(e) =>
                handleChangeField(e.target.value, 'regularPrice')
              }
              className={`border-1 p-2 pl-4 ${showErrors && errors.regularPrice ? 'border-red-500' : 'border-white'}`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="currency" className="required">
              Currency
            </label>
            <input
              type="text"
              id="currency"
              value={courseCurrency}
              disabled
              onChange={(e) => handleChangeField(e.target.value, 'currency')}
              placeholder="ex:LE"
              className="w-15 border-1 border-white p-2"
            />
          </div>
        </div>
        <div className="mb-4 flex w-full min-w-fit flex-col gap-1.5 lg:w-1/2">
          <label htmlFor="level" className="required">
            Course Level{' '}
            {showErrors && errors.course_level && (
              <span className="text-sm text-red-500">
                ({errors.course_level})
              </span>
            )}
          </label>
          <select
            id="level"
            defaultValue={courseLevel}
            onChange={(e) => handleChangeField(e.target.value, 'course_level')}
            className={`border-1 p-2 pl-4 text-gray-700 ${showErrors && errors.course_level ? 'border-red-500' : 'border-white'}`}
          >
            <option value={''}>Select...</option>
            {[1, 2, 3].map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <div className="mb-2 flex w-full flex-col gap-1.5">
          <label htmlFor="discount" className="">
            Discount{' '}
            {showErrors && errors.discount && (
              <span className="text-sm text-red-500">({errors.discount})</span>
            )}
          </label>
          <input
            type="text"
            id="discount"
            value={
              courseDiscount > 100
                ? 100
                : courseDiscount && courseDiscount < 0
                  ? 0
                  : courseDiscount
            }
            onChange={(e) => handleChangeField(e.target.value, 'discount')}
            placeholder="discount %"
            className={`border-1 p-2 pl-4 ${showErrors && errors.discount ? 'border-red-500' : 'border-white'}`}
          />
        </div>
        <div className="mb-2 flex w-full flex-col gap-1.5">
          <label htmlFor="discount-end-date" className="">
            Discount end-date{' '}
            {showErrors && errors.discount_end_date && (
              <span className="text-sm text-red-500">
                ({errors.discount_end_date})
              </span>
            )}
          </label>
          <input
            type="datetime-local"
            value={discountEndDate?.replace(' ', 'T') || ''}
            onChange={(e) =>
              handleChangeField(e.target.value, 'discount_end_date')
            }
            id="discount-end-date"
            className={`border-1 p-2 pl-4 ${showErrors && errors.discount_end_date ? 'border-red-500' : 'border-white'}`}
          />
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-1.5">
        <label htmlFor="description" className="required mb-2 text-lg">
          Course Description{' '}
          {showErrors && errors.description && (
            <span className="text-sm text-red-500">({errors.description})</span>
          )}
        </label>
        <textarea
          id="description"
          placeholder="Enter your course description"
          value={description}
          onChange={(e) => handleChangeField(e.target.value, 'description')}
          className={`h-62 w-full border-1 p-2 pl-4 ${showErrors && errors.description ? 'border-red-500' : 'border-white'}`}
        ></textarea>
      </div>
    </>
  );
}

export default BasicInfo;
