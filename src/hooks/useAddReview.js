import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addReview as addReviewApi } from '../api/reviewApi';

export const useAddReview = () => {
  const queryClient = useQueryClient();

  const { mutate: addReview, isPending: isLoading } = useMutation({
    mutationFn: ({ rating, comment, courseId, userId }) =>
      addReviewApi({ rating, comment, courseId, userId }),
    onSuccess: (data) => {
      toast.success('Successfully added a Review!');
      queryClient.refetchQueries([
        'enrolledCourse',
        data.student_id,
        String(data.course_id),
      ]);
    },
    onError: (error) => {
      console.log(error);
      toast.error('Error adding a Review');
    },
  });

  return {
    addReview,
    isLoading,
  };
};
