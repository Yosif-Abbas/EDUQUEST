import { UploadIcon } from 'lucide-react';
import { useRef } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

function Curriculum({ course, setCourse }) {
  const fileInputRefs = useRef({});

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
        lecture.title = file.name;
        lecture.file_url = URL.createObjectURL(file);

        lecture.file = file;
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

  const isLectureFileUploaded = (lecture) => {
    return !!lecture.file_url || !!lecture.file;
  };

  return (
    <div>
      {course_sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 bg-[#9DB2BF] p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="mr-4 flex w-full items-center gap-2">
              <HiBars3 />
              <h3 className="required text-nowrap">
                Section ({String(sectionIndex + 1).padStart(2, '0')}):
              </h3>
              <input
                className="grow truncate border-b-1 border-gray-500 outline-none"
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

          <ul className="flex flex-col gap-4">
            {section.lectures?.map((lecture, lectureIndex) => (
              <li
                key={lectureIndex}
                className="flex flex-col items-center justify-between bg-white px-4 py-2 md:flex-row"
              >
                <div className="flex w-full items-center gap-x-2">
                  <h3 className="text-nowrap">
                    Lecture ({String(lectureIndex + 1).padStart(2, '0')}):
                  </h3>
                  {isLectureFileUploaded(lecture) ? (
                    <div className="w-full">
                      <input
                        className="w-full truncate px-2 py-1 outline-none"
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
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 transition-all duration-150 hover:bg-gray-200"
                        onClick={() =>
                          fileInputRefs.current[
                            `${sectionIndex}-${lectureIndex}`
                          ]?.click()
                        }
                      >
                        <UploadIcon size={16} />
                        <span>Upload</span>
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
                    {/* <option value="">Contents</option> */}
                    <option value="video">Video</option>
                    <option value="file">File</option>
                    {/* <option value="test">Test</option> */}
                  </select>

                  <div className="flex gap-x-2">
                    {/* <button>
                      <RiEdit2Line />
                    </button> */}
                    <button
                      className={
                        section.lectures.length > 1 ? '' : 'cursor-not-allowed'
                      }
                      disabled={section.lectures.length <= 1}
                      onClick={() => removeLecture(sectionIndex, lectureIndex)}
                    >
                      <FaRegTrashAlt
                        color={section.lectures.length > 1 ? '#E25E35' : ''}
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
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
              className="h-24 w-full border-1 border-white p-2 pl-4"
            ></textarea>
          </div>
        </div>
      ))}
      <button
        className="text-pinky-violet mt-5 w-full bg-[#9DB2BF59] px-4 py-2"
        onClick={handleAddSection}
      >
        Add Section
      </button>
    </div>
  );
}

export default Curriculum;
