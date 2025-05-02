import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { enrollInCourse as enrollInCourseApi } from '../api/coursesApi';

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();
  const { mutate: enrollInCourse, isPending: isLoading } = useMutation({
    mutationFn: ({ studentId, courseId }) =>
      enrollInCourseApi({ studentId, courseId }),
    onSuccess: (data) => {
      toast.success('Successfully enrolled in course!');

      queryClient.refetchQueries({
        queryKey: ['enrolledCourses', data.student_id],
        exact: true,
      });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error('Error enrolling in course. Please try again.');
    },
  });

  return {
    enrollInCourse,
    isLoading,
  };
};
