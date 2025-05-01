import { useMutation, useQuery } from '@tanstack/react-query';
import {
  enrollInCourse as enrollInCourseApi,
  getEnrolledCourses,
} from '../api/coursesApi';

export const useEnrolledCourses = (studentId) => {
  const { data: { student_courses, count } = {}, ...queryInfo } = useQuery({
    queryKey: ['enrolledCourses', studentId],
    queryFn: () => getEnrolledCourses(studentId),
  });

  return {
    enrolledCourses: student_courses,
    count,
    ...queryInfo,
  };
};

export const useEnrollInCourse = () => {
  const { mutate: enrollInCourse, isPending: isLoading } = useMutation({
    mutationFn: ({ studentId, courseId }) =>
      enrollInCourseApi({ studentId, courseId }),
    onSuccess: (data) => {
      console.log('Enrolled in course:', data);
    },
    onError: (error) => {
      console.error('Error enrolling in course:', error);
    },
  });

  return {
    enrollInCourse,
    isLoading,
  };
};
