import { useQuery } from '@tanstack/react-query';
import { getEnrolledCourses } from '../api/coursesApi';

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
