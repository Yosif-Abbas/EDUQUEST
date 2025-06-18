import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api/uploadAvatarApi';
import { createNewCourse as createNewCourseApi } from '../api/coursesApi';
import toast from 'react-hot-toast';

const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve(Math.round(video.duration));
    };
    video.onerror = (e) => reject(new Error('Could not load video metadata'));
    video.src = URL.createObjectURL(file);
  });
};

export const useAddNewCourse = ({ course, teacherId }) => {
  const { mutate: createNewCourse, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      // Upload thumbnail
      const thumbnailPath = `thumbnails/${course.title}-${Date.now()}.jpg`;
      await uploadFile(course.image_url, thumbnailPath, 'thumbnails');
      const thumbnailUrl = `https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/thumbnails/${thumbnailPath}`;

      // Upload intro video
      const introsPath = `intros/${course.title}-${Date.now()}.mp4`;
      await uploadFile(course.intro, introsPath, 'intros');
      const introUrl = `https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/intros/${introsPath}`;

      const updatedCourse = structuredClone(course);

      for (const [
        sectionIndex,
        section,
      ] of updatedCourse.course_sections.entries()) {
        let secDuration = 0;

        for (const [lectureIndex, lecture] of section.lectures.entries()) {
          // Handle quiz type lectures
          if (lecture.type === 'quiz') {
            updatedCourse.course_sections[sectionIndex].lectures[lectureIndex] =
              {
                ...lecture,
                content_info: lecture.questions?.length || 0,
              };
            secDuration += 15 * 60; // Add 15 minutes for quiz
            continue;
          }

          // Handle video and file type lectures
          const file = lecture.file;

          if (file) {
            const extension = file.name.split('.').pop();
            const timestamp = Date.now();
            const sanitizedTitle =
              updatedCourse.title?.replace(/\s+/g, '-').toLowerCase() ||
              'course';

            const fileType = lecture.type === 'video' ? 'lectures' : 'files';
            const path = `${fileType}/${sanitizedTitle}-s${sectionIndex + 1}-l${lectureIndex + 1}-${timestamp}.${extension}`;

            try {
              // Upload the file to the correct bucket
              await uploadFile(file, path, fileType);

              // Generate the public URL for Supabase storage
              const publicUrl = `https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/${fileType}/${path}`;

              // Update the lecture with the public URL
              updatedCourse.course_sections[sectionIndex].lectures[
                lectureIndex
              ] = {
                ...lecture,
                file_url: publicUrl,
              };

              if (lecture.type === 'video') {
                const duration = await getVideoDuration(file); // in seconds
                secDuration += duration;
                updatedCourse.course_sections[sectionIndex].lectures[
                  lectureIndex
                ].content_info = `${duration} sec`;
              } else {
                const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                secDuration += sizeMB * 4 * 60;
                updatedCourse.course_sections[sectionIndex].lectures[
                  lectureIndex
                ].content_info = `${sizeMB} MB`;
              }

              // Remove the `file` object to avoid sending it to your database
              delete updatedCourse.course_sections[sectionIndex].lectures[
                lectureIndex
              ].file;
            } catch (error) {
              console.error('Error uploading file:', error);
              throw new Error(
                `Failed to upload ${lecture.type} file: ${error.message}`,
              );
            }
          } else {
            console.log('No file found for lecture. Lecture data:', lecture);
          }
        }

        if (updatedCourse?.course_sections?.length > 0) {
          updatedCourse.course_sections[sectionIndex].duration =
            Math.round(secDuration);
        } else {
          throw new Error('Course must contain at least one section.');
        }
      }

      return createNewCourseApi({
        course: {
          ...updatedCourse,
          image_url: thumbnailUrl,
          intro: introUrl,
        },
        teacherId,
      });
    },
    onSuccess: () => {
      toast.success('Course created successfully!');
    },
    onError: (error) => {
      console.error('Course creation error:', error);
      toast.error(error.message);
    },
  });

  return {
    createNewCourse,
    isLoading,
  };
};
