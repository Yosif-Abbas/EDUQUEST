import { UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';

function Curriculum({ course, setCourse, errors, showErrors }) {
  const fileInputRefs = useRef({});
  const [collapsedQuestions, setCollapsedQuestions] = useState({});
  const [collapsedLectures, setCollapsedLectures] = useState({});

  const { course_sections } = course;

  const handleAddSection = () => {
    setCourse((prev) => ({
      ...prev,
      course_sections: [
        ...(prev.course_sections || []),
        {
          title: '',
          duration: 0,
          description: '',
          lectures: [
            { title: '', type: 'video', content_info: '', file_url: '' },
          ],
        },
      ],
    }));
  };

  const handleAddLecture = (secIndex) => {
    setCourse((prev) => ({
      ...prev,
      course_sections: prev.course_sections.map((section, index) =>
        index === secIndex
          ? {
              ...section,
              lectures: [
                ...(section.lectures || []),
                { title: '', type: 'video', content_info: '', file_url: '' },
              ],
            }
          : section,
      ),
    }));
  };

  const handleRemoveSection = (indexToRemove) => {
    setCourse((prev) => ({
      ...prev,
      course_sections: (prev.course_sections || []).filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };

  const removeLecture = (secIndex, lecIndex) => {
    setCourse((prev) => ({
      ...prev,
      course_sections: prev.course_sections.map((section, index) =>
        index === secIndex
          ? {
              ...section,
              lectures: section.lectures.filter((_, i) => i !== lecIndex),
            }
          : section,
      ),
    }));
  };

  const handleChangeSectionDescription = (value, secIndex) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      course_sections: prevCourse.course_sections.map((section, index) =>
        index === secIndex ? { ...section, description: value } : section,
      ),
    }));
  };

  const handleLectureFileUpload = (e, secIndex, lecIndex) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => {
        const newSections = [...prev.course_sections];
        const lecture = newSections[secIndex].lectures[lecIndex];

        // Set the file object first
        lecture.file = file;

        // Then set the title and file_url
        lecture.title = file.name;
        lecture.file_url = URL.createObjectURL(file);

        return {
          ...prev,
          course_sections: newSections,
        };
      });
    }
  };

  const updateSectionField = (secIndex, field, value) => {
    setCourse((prev) => {
      const newSections = [...prev.course_sections];
      newSections[secIndex][field] = value;
      return {
        ...prev,
        course_sections: newSections,
      };
    });
  };

  const updateLectureField = (secIndex, lecIndex, field, value) => {
    setCourse((prev) => {
      const newSections = [...prev.course_sections];
      newSections[secIndex].lectures[lecIndex][field] = value;
      return {
        ...prev,
        course_sections: newSections,
      };
    });
  };

  const addQuizQuestion = (sectionIndex, lectureIndex) => {
    setCourse((prev) => {
      // Create a new array of sections
      const newSections = prev.course_sections.map((section, idx) => {
        if (idx === sectionIndex) {
          // For the target section, map through lectures
          return {
            ...section,
            lectures: section.lectures.map((lecture, lidx) => {
              if (lidx === lectureIndex) {
                // For the target lecture, add the new question
                return {
                  ...lecture,
                  questions: [
                    ...(lecture.questions || []),
                    {
                      question: '',
                      correctAnswer: '',
                      answer_a: '',
                      answer_b: '',
                      answer_c: '',
                      answer_d: '',
                    },
                  ],
                };
              }
              return lecture;
            }),
          };
        }
        return section;
      });

      return {
        ...prev,
        course_sections: newSections,
      };
    });
  };

  const updateQuizQuestion = (
    sectionIndex,
    lectureIndex,
    questionIndex,
    field,
    value,
  ) => {
    setCourse((prev) => {
      const newSections = [...prev.course_sections];
      const lecture = newSections[sectionIndex].lectures[lectureIndex];

      // If updating correctAnswer, ensure it's in the correct format
      if (field === 'correctAnswer') {
        lecture.questions[questionIndex][field] = value;
      } else {
        lecture.questions[questionIndex][field] = value;
      }

      return {
        ...prev,
        course_sections: newSections,
      };
    });
  };

  const removeQuizQuestion = (sectionIndex, lectureIndex, questionIndex) => {
    setCourse((prev) => {
      // Create a deep copy of the course sections
      const newSections = JSON.parse(JSON.stringify(prev.course_sections));
      const lecture = newSections[sectionIndex].lectures[lectureIndex];
      lecture.questions = lecture.questions.filter(
        (_, index) => index !== questionIndex,
      );
      return {
        ...prev,
        course_sections: newSections,
      };
    });
  };

  const isLectureFileUploaded = (lecture) => {
    return !!lecture.file_url || !!lecture.file;
  };

  const toggleQuestionCollapse = (
    sectionIndex,
    lectureIndex,
    questionIndex,
  ) => {
    const key = `${sectionIndex}-${lectureIndex}-${questionIndex}`;
    setCollapsedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleLectureCollapse = (sectionIndex, lectureIndex) => {
    const key = `${sectionIndex}-${lectureIndex}`;
    setCollapsedLectures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      {showErrors && errors.course_sections && (
        <div className="mb-4 text-red-500">{errors.course_sections}</div>
      )}
      {course_sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 bg-[#9DB2BF] p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="mr-4 flex w-full items-center gap-2">
              <HiBars3 />
              <h3 className="required text-nowrap">
                Section ({String(sectionIndex + 1).padStart(2, '0')}):
                {showErrors && errors[`section_${sectionIndex}_title`] && (
                  <span className="ml-2 text-sm text-red-500">
                    ({errors[`section_${sectionIndex}_title`]})
                  </span>
                )}
              </h3>
              <input
                className={`grow truncate border-b-1 outline-none ${showErrors && errors[`section_${sectionIndex}_title`] ? 'border-red-500' : 'border-gray-500'}`}
                value={section.title}
                onChange={(e) =>
                  updateSectionField(sectionIndex, 'title', e.target.value)
                }
              />
            </span>
            <span className="flex gap-2 text-gray-500">
              <button>
                <RiEdit2Line />
              </button>
              <button
                onClick={() => handleRemoveSection(sectionIndex)}
                disabled={course_sections?.length <= 1}
                className={
                  course_sections?.length <= 1 ? 'cursor-not-allowed' : ''
                }
              >
                <FaRegTrashAlt
                  color={course_sections?.length > 1 ? '#E25E35' : ''}
                />
              </button>
            </span>
          </div>

          {showErrors && errors[`section_${sectionIndex}_lectures`] && (
            <div className="mb-4 text-red-500">
              {errors[`section_${sectionIndex}_lectures`]}
            </div>
          )}

          <ul className="flex flex-col gap-4">
            {section.lectures?.map((lecture, lectureIndex) => (
              <li
                key={lectureIndex}
                className="flex flex-col bg-white px-4 py-2"
              >
                <div className="flex">
                  <div className="flex w-full items-center gap-x-2">
                    <h3 className="required text-nowrap">
                      Lecture ({String(lectureIndex + 1).padStart(2, '0')}):
                      {showErrors &&
                        errors[
                          `section_${sectionIndex}_lecture_${lectureIndex}_title`
                        ] && (
                          <span className="ml-2 text-sm text-red-500">
                            (
                            {
                              errors[
                                `section_${sectionIndex}_lecture_${lectureIndex}_title`
                              ]
                            }
                            )
                          </span>
                        )}
                    </h3>
                    {isLectureFileUploaded(lecture) ||
                    lecture.type === 'quiz' ? (
                      <div className="w-full">
                        <input
                          className={`w-full truncate border-b px-2 py-1 outline-none ${showErrors && errors[`section_${sectionIndex}_lecture_${lectureIndex}_title`] ? 'border-red-500' : ''}`}
                          value={lecture.title}
                          onChange={(e) =>
                            updateLectureField(
                              sectionIndex,
                              lectureIndex,
                              'title',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <button
                          className={`flex items-center gap-2 px-4 py-2 transition-all duration-150 ${showErrors && errors[`section_${sectionIndex}_lecture_${lectureIndex}_file`] ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                          onClick={() =>
                            fileInputRefs.current[
                              `${sectionIndex}-${lectureIndex}`
                            ]?.click()
                          }
                        >
                          <UploadIcon size={16} />
                          <span>
                            {showErrors &&
                            errors[
                              `section_${sectionIndex}_lecture_${lectureIndex}_file`
                            ]
                              ? 'Upload Required'
                              : 'Upload'}
                          </span>
                        </button>

                        {/* video */}
                        {lecture.type === 'video' && (
                          <input
                            type="file"
                            className="hidden"
                            accept="video/mp4, video/webm"
                            ref={(el) =>
                              (fileInputRefs.current[
                                `${sectionIndex}-${lectureIndex}`
                              ] = el)
                            }
                            onChange={(e) =>
                              handleLectureFileUpload(
                                e,
                                sectionIndex,
                                lectureIndex,
                              )
                            }
                          />
                        )}

                        {/* file */}
                        {lecture.type === 'file' && (
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf, .doc, .docx, .ppt, .pptx, .txt"
                            ref={(el) =>
                              (fileInputRefs.current[
                                `${sectionIndex}-${lectureIndex}`
                              ] = el)
                            }
                            onChange={(e) =>
                              handleLectureFileUpload(
                                e,
                                sectionIndex,
                                lectureIndex,
                              )
                            }
                          />
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex w-full justify-around gap-3 pt-2 md:justify-end">
                    <select
                      className={`text-pinky-violet w-26 bg-[#FFEEE8] p-2 ${isLectureFileUploaded(lecture) ? 'bg-gray-300' : ''}`}
                      value={lecture.type}
                      disabled={isLectureFileUploaded(lecture)}
                      onChange={(e) =>
                        updateLectureField(
                          sectionIndex,
                          lectureIndex,
                          'type',
                          e.target.value,
                        )
                      }
                    >
                      <option value="video">Video</option>
                      <option value="file">File</option>
                      <option value="quiz">Quiz</option>
                    </select>

                    <div className="flex gap-x-2">
                      <button
                        className={
                          section.lectures.length > 1
                            ? ''
                            : 'cursor-not-allowed'
                        }
                        disabled={section.lectures.length <= 1}
                        onClick={() =>
                          removeLecture(sectionIndex, lectureIndex)
                        }
                      >
                        <FaRegTrashAlt
                          color={section.lectures.length > 1 ? '#E25E35' : ''}
                        />
                      </button>
                      {lecture.type === 'quiz' && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleLectureCollapse(sectionIndex, lectureIndex)
                          }
                          className="text-gray-500 hover:text-gray-700 md:p-2"
                        >
                          {collapsedLectures[
                            `${sectionIndex}-${lectureIndex}`
                          ] ? (
                            <IoIosArrowDown className="rotate-180 transform" />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {lecture.type === 'quiz' &&
                  !collapsedLectures[`${sectionIndex}-${lectureIndex}`] && (
                    <div className="mt-4 w-full">
                      {lecture.questions?.map((question, questionIndex) => (
                        <div
                          key={`${sectionIndex}-${lectureIndex}-${questionIndex}`}
                          className="mb-6"
                        >
                          <div className="mb-4 flex items-center gap-2 rounded-xl bg-gray-100 p-2">
                            <span className="text-xl text-nowrap">
                              Q{questionIndex + 1}.
                            </span>
                            <input
                              type="text"
                              value={question.question}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  sectionIndex,
                                  lectureIndex,
                                  questionIndex,
                                  'question',
                                  e.target.value,
                                )
                              }
                              placeholder="Enter your question"
                              className="w-full rounded border p-2"
                            />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeQuizQuestion(
                                  sectionIndex,
                                  lectureIndex,
                                  questionIndex,
                                );
                              }}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <FaRegTrashAlt />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                toggleQuestionCollapse(
                                  sectionIndex,
                                  lectureIndex,
                                  questionIndex,
                                )
                              }
                              className="p-2 text-gray-500 hover:text-gray-700"
                            >
                              {collapsedQuestions[
                                `${sectionIndex}-${lectureIndex}-${questionIndex}`
                              ] ? (
                                <IoIosArrowDown className="rotate-180 transform" />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </button>
                          </div>

                          {!collapsedQuestions[
                            `${sectionIndex}-${lectureIndex}-${questionIndex}`
                          ] && (
                            <>
                              {[
                                'answer_a',
                                'answer_b',
                                'answer_c',
                                'answer_d',
                              ].map((option) => (
                                <div
                                  key={`${sectionIndex}-${lectureIndex}-${questionIndex}-${option}`}
                                  className="mb-2 flex items-center gap-2"
                                >
                                  <input
                                    type="radio"
                                    name={`correctAnswer_${sectionIndex}_${lectureIndex}_${questionIndex}`}
                                    checked={question.correctAnswer === option}
                                    onChange={() =>
                                      updateQuizQuestion(
                                        sectionIndex,
                                        lectureIndex,
                                        questionIndex,
                                        'correctAnswer',
                                        option,
                                      )
                                    }
                                    className="h-4 w-4"
                                  />
                                  <input
                                    type="text"
                                    value={question[`${option}`]}
                                    onChange={(e) =>
                                      updateQuizQuestion(
                                        sectionIndex,
                                        lectureIndex,
                                        questionIndex,
                                        `${option}`,
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`Option ${option.split('_').at(1).toUpperCase()}`}
                                    className="flex-1 rounded border p-2"
                                  />
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addQuizQuestion(sectionIndex, lectureIndex);
                        }}
                        className="bg-pinky-violet hover:bg-pinky-violet/95 w-full px-4 py-2 text-white"
                      >
                        Add Question
                      </button>
                    </div>
                  )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="text-pinky-violet mt-5 w-full bg-[#92b1c4] px-4 py-2"
            onClick={() => handleAddLecture(sectionIndex)}
          >
            Add Lecture
          </button>

          <div className="mt-2 flex flex-col gap-1.5">
            <label htmlFor="description" className="required mb-2 text-lg">
              Section Description
            </label>
            <textarea
              id="description"
              value={section.description}
              onChange={(e) =>
                handleChangeSectionDescription(e.target.value, sectionIndex)
              }
              placeholder="Enter your section description"
              className={`h-24 w-full border-1 p-2 pl-4 ${showErrors && errors[`section_${sectionIndex}_description`] ? 'border-red-500' : 'border-white'}`}
            ></textarea>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="text-pinky-violet mt-5 w-full bg-[#9DB2BF59] px-4 py-2"
        onClick={handleAddSection}
      >
        Add Section
      </button>
    </div>
  );
}

export default Curriculum;
