import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../api/coursesApi';
import { useSearchParams } from 'react-router-dom';
import { getQuestions } from '../api/questionBankApi';

export const useQuestions = (category) => {
  const { data: questions = [], ...queryInfo } = useQuery({
    queryKey: ['questions', category],
    queryFn: () => getQuestions(category),
  });

  return { questions, ...queryInfo };
};
