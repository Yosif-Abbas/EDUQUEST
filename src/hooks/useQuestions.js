import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../api/questionBankApi';

export const useQuestions = () => {
  const { data: questions = [], ...queryInfo } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getQuestions(),
  });

  return { questions, ...queryInfo };
};
