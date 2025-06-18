import { useState } from 'react';
import { FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import { PiMonitorPlayFill } from 'react-icons/pi';
import Spinner from '../../components/Spinner';
import { useAddNewCourse } from '../../hooks/useAddNewCourse';
import { useCurrentUser } from './../../hooks/useCurrentUser';
import AdvancedInfo from './AdvancedInfo';
import BasicInfo from './BasicInfo';
import Curriculum from './Curriculum';

function NewCourse() {
  const { currentUser } = useCurrentUser();
  const teacherId = currentUser?.userTeacher?.id;
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

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
          {
            title: '',
            type: 'video',
            content_info: '',
            file_url: '',
            questions: [], // Array of quiz questions
          },
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
      element: (
        <BasicInfo
          course={course}
          setCourse={setCourse}
          errors={errors}
          showErrors={showErrors}
        />
      ),
    },
    {
      id: 1,
      icon: <FaClipboardList />,
      title: 'Advanced Information',
      element: (
        <AdvancedInfo
          course={course}
          setCourse={setCourse}
          errors={errors}
          showErrors={showErrors}
        />
      ),
    },
    {
      id: 2,
      icon: <PiMonitorPlayFill />,
      title: 'Curriculum',
      element: (
        <Curriculum
          course={course}
          setCourse={setCourse}
          errors={errors}
          showErrors={showErrors}
        />
      ),
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
    const newErrors = {};

    // Basic Info Validation
    if (!course.title?.trim()) {
      newErrors.title = 'Course title is required';
    } else if (course.title.length < 5) {
      newErrors.title = 'Course title must be at least 5 characters long';
    }

    if (!course.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!course.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!course.regularPrice) {
      newErrors.regularPrice = 'Regular price is required';
    }

    if (!course.course_level?.trim()) {
      newErrors.course_level = 'Course level is required';
    }

    // Description Validation
    if (!course.description?.trim()) {
      newErrors.description = 'Course description is required';
    } else if (course.description.length < 30) {
      newErrors.description =
        'Course description must be at least 30 characters long';
    } else if (course.description.length > 800) {
      newErrors.description =
        'Course description can not exceed 800 characters';
    }

    // Media Validation
    if (!course.image_url) {
      newErrors.image_url = 'Course thumbnail is required';
    }

    if (!course.intro) {
      newErrors.intro = 'Course trailer/intro video is required';
    }

    // Benefits Validation
    const validBenefits = course.course_benefits?.filter(
      (b) => b.trim().length > 0,
    );
    if (!validBenefits?.length) {
      newErrors.course_benefits =
        'At least one (What you will teach) is required';
    }

    // Requirements Validation
    const validRequirements = course.course_requirements?.filter(
      (r) => r.trim().length > 0,
    );
    if (!validRequirements?.length) {
      newErrors.course_requirements = 'At least one requirement is required';
    }

    // Course Includes Validation
    const validIncludes = course.course_includes?.filter(
      (i) => i.trim().length > 0,
    );
    if (!validIncludes?.length) {
      newErrors.course_includes = 'At least one course include is required';
    }

    // Sections and Lectures Validation
    if (!course.course_sections?.length) {
      newErrors.course_sections = 'At least one section is required';
    } else {
      course.course_sections.forEach((section, sectionIndex) => {
        if (!section.title?.trim()) {
          newErrors[`section_${sectionIndex}_title`] =
            'Section title is required';
        } else if (section.title.length < 5) {
          newErrors[`section_${sectionIndex}_title`] =
            'Section title must be at least 5 characters long';
        }

        if (!section.description?.trim()) {
          newErrors[`section_${sectionIndex}_description`] =
            'Section description is required';
        } else if (section.description.length < 30) {
          newErrors[`section_${sectionIndex}_description`] =
            'Section description must be at least 30 characters long';
        } else if (section.description.length > 500) {
          newErrors[`section_${sectionIndex}_description`] =
            'Section description cannot exceed 500 characters';
        }

        if (!section.lectures?.length) {
          newErrors[`section_${sectionIndex}_lectures`] =
            'Section must have at least one lecture';
        } else {
          section.lectures.forEach((lecture, lectureIndex) => {
            if (!lecture.title?.trim()) {
              newErrors[
                `section_${sectionIndex}_lecture_${lectureIndex}_title`
              ] = 'Lecture title is required';
            } else if (lecture.title.length < 5) {
              newErrors[
                `section_${sectionIndex}_lecture_${lectureIndex}_title`
              ] = 'Lecture title must be at least 5 characters long';
            }

            // Quiz validation
            if (lecture.type === 'quiz') {
              if (!lecture.questions?.length) {
                newErrors[
                  `section_${sectionIndex}_lecture_${lectureIndex}_questions`
                ] = 'At least one question is required for quiz';
              } else {
                lecture.questions.forEach((question, questionIndex) => {
                  if (!question.question?.trim()) {
                    newErrors[
                      `section_${sectionIndex}_lecture_${lectureIndex}_question_${questionIndex}`
                    ] = 'Question text is required';
                  }
                  if (!question.correctAnswer) {
                    newErrors[
                      `section_${sectionIndex}_lecture_${lectureIndex}_correct_answer_${questionIndex}`
                    ] = 'Correct answer must be selected';
                  }
                  if (
                    !question.answer_a?.trim() ||
                    !question.answer_b?.trim() ||
                    !question.answer_c?.trim() ||
                    !question.answer_d?.trim()
                  ) {
                    newErrors[
                      `section_${sectionIndex}_lecture_${lectureIndex}_answers_${questionIndex}`
                    ] = 'All answer options are required';
                  }
                });
              }
            } else if (!lecture.file_url) {
              newErrors[
                `section_${sectionIndex}_lecture_${lectureIndex}_file`
              ] = 'Lecture file is required';
            }
          });
        }
      });
    }

    // Discount Validation
    if (course.discount) {
      const discount = Number(course.discount);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discount = 'Discount must be a number between 0 and 100';
      }
      if (discount > 0 && !course.discount_end_date) {
        newErrors.discount_end_date =
          'Discount end date is required when discount is provided';
      }
    }

    return Object.keys(newErrors).length > 0 ? newErrors : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCourse(course);
    if (validationErrors) {
      setErrors(validationErrors);
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors({});
      setShowErrors(false);
      createNewCourse();
    }
  };

  function handleNext(e) {
    e.preventDefault();
    if (currentTab !== newCourseInfoTabs.length - 1) {
      setCurrentTab((pre) => pre + 1);
    }
  }

  function handlePrevious(e) {
    e.preventDefault();
    if (currentTab !== 0) setCurrentTab((pre) => pre - 1);
  }

  return (
    <main>
      {showErrors && Object.keys(errors).length > 0 && (
        <div
          className="mb-4 border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
          role="alert"
        >
          <ul className="list-inside list-disc">{Object.values(errors)[0]}</ul>
        </div>
      )}
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
