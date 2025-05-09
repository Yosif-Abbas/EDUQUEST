import { useQuery } from '@tanstack/react-query';
import { getTeacherRatings } from '../api/teacherAPI';

export function useTeacherRatings(teacherId) {
  const { data: ratings, isLoading } = useQuery({
    queryKey: ['ratings', teacherId],
    queryFn: () => getTeacherRatings(teacherId),
  });

  return { ratings, isLoading };
}
