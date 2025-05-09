import { useQuery } from '@tanstack/react-query';
import { getEnrolledCourse } from '../api/coursesApi';

export const useEnrolledCourse = ({ studentId, courseId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['enrolledCourse', studentId, courseId],
    queryFn: () => getEnrolledCourse({ studentId, courseId }),
  });


  return { enrolledCourse: data, isLoading,error };
};
