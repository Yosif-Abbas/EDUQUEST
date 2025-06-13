import { useState } from 'react';
import { FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import { PiMonitorPlayFill } from 'react-icons/pi';
import BasicInfo from './BasicInfo';
import AdvancedInfo from './AdvancedInfo';
import Curriculum from './Curriculum';
import { useAddNewCourse } from '../../hooks/useAddNewCourse';
import Spinner from '../../components/Spinner';
import { useCurrentUser } from './../../hooks/useCurrentUser';

function NewCourse() {
  const { currentUser } = useCurrentUser();
  const teacherId = currentUser?.userTeacher?.id;

  const [currentTab, setCurrentTab] = useState(0);

  const [course, setCourse] = useState({
    // basic info
    title: '',
    subject: '',
    category: '',
    regularPrice: '',
    currency: 'LE',
    course_level: '',
    discount: '',
    discount_end_date: '',

    // files
    image_url: '',
    intro: '',

    // description
    description: '',

    // lists => they are in diffrent tables in database
    course_benefits: [''],
    course_requirements: [''],
    course_includes: [''],

    // sections list is a table, lectures is a another table
    course_sections: [
      {
        title: '',
        duration: 0,
        description: '',
        lectures: [
          { title: '', type: 'video', content_info: '', file_url: '' },
        ],
      },
    ],

    students_enrolled: 0,
    rating: 0,
    rating_count: 0,
    course_duration: 0,
    number_of_lessons: 0,
  });

  const newCourseInfoTabs = [
    {
      id: 0,
      icon: <FaInfoCircle />,
      title: 'Basic Information',
      element: <BasicInfo course={course} setCourse={setCourse} />,
    },
    {
      id: 1,
      icon: <FaClipboardList />,
      title: 'Advanced Information',
      element: <AdvancedInfo course={course} setCourse={setCourse} />,
    },
    {
      id: 2,
      icon: <PiMonitorPlayFill />,
      title: 'Curriculum',
      element: <Curriculum course={course} setCourse={setCourse} />,
    },
    // {
    //   id: 3,
    //   icon: <FaPlayCircle />,
    //   title: 'Publish Course',
    //   element: <PublishCourse course={course} setCourse={setCourse} />,
    // },
  ];

  const { createNewCourse, isLoading } = useAddNewCourse({
    course,
    teacherId,
  });

  const validateCourse = (course) => {
    if (
      !course.title ||
      !course.subject ||
      !course.category ||
      !course.regularPrice ||
      !course.currency ||
      !course.description
    ) {
      return 'Missing basic course info';
    }

    if (!course.image_url || !course.intro) {
      return 'Thumbnail or trailer is missing';
    }

    if (course.description.length < 20) {
      return 'Course description is too short';
    }

    if (!course.course_benefits?.filter((b) => b.trim()).length) {
      return 'At least add one of what you will teach';
    }

    for (let section of course.course_sections) {
      if (!section.title || !section.lectures?.length) {
        return 'Each section must have a title and at least one lecture';
      }

      for (let lecture of section.lectures) {
        if (!lecture.title || (!lecture.content_info && !lecture.file_url)) {
          return 'Each lecture must have a title and a video or a file';
        }
      }
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const error = validateCourse(course);
    // if (error) {
    //   console.log(error);
    // } else {
    //   createNewCourse();
    // }

    createNewCourse();
  };

  function handleNext(e) {
    e.preventDefault();
    // Savieg Logic

    if (currentTab !== newCourseInfoTabs.length - 1)
      setCurrentTab((pre) => pre + 1);
  }

  function handlePrevious(e) {
    e.preventDefault();
    if (currentTab !== 0) setCurrentTab((pre) => pre - 1);
  }

  return (
    <main>
      <ul className={`flex border-b border-white`}>
        {newCourseInfoTabs.map(({ id, icon, title }) => (
          <li
            key={id}
            onClick={() => setCurrentTab(id)}
            className={`relative flex items-center gap-2 p-3 after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#FF6636] after:transition after:duration-300 after:content-[''] ${id === currentTab && 'after:scale-x-100'} ${id !== currentTab && 'hidden'} lg:flex lg:basis-1/3 lg:gap-2 lg:p-5`}
          >
            {icon}
            <span className="lg:text-sm xl:text-lg">{title}</span>
          </li>
        ))}
      </ul>
      <section className="p-8">
        <h2 className="mb-6 text-2xl font-bold">
          {newCourseInfoTabs[currentTab].title}
        </h2>

        {newCourseInfoTabs[currentTab].element}

        <form
          className="mt-8 flex justify-between"
          onSubmit={(e) => handleSubmit(e)}
        >
          {newCourseInfoTabs[currentTab].id !== 0 && (
            <button
              onClick={(e) => handlePrevious(e)}
              className="border-pinky-violet border-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-[16px]"
            >
              Previous
            </button>
          )}

          {newCourseInfoTabs[currentTab].id === newCourseInfoTabs.length - 1 ? (
            <button
              type="submit"
              className="bg-pinky-violet ml-auto px-2 py-1 text-sm text-white md:px-4 md:py-2 md:text-[16px]"
            >
              {isLoading ? <Spinner color="#fff" /> : 'Publish'}
            </button>
          ) : (
            <button
              onClick={(e) => handleNext(e)}
              className="bg-pinky-violet ml-auto px-2 py-1 text-sm text-white md:px-4 md:py-2 md:text-[16px]"
            >
              Save & Next
            </button>
          )}
        </form>
      </section>
    </main>
  );
}

export default NewCourse;
