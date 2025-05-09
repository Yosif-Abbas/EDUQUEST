import { useQuery } from '@tanstack/react-query';
import { getTeacher } from '../api/teacherAPI';

export function useTeacher() {
  const { data: teacher, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getTeacher,
  });

  return { teacher, isLoading };
}
