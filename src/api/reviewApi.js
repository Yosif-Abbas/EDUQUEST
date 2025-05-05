import supabase from '../../supabase';
import { formatDate } from '../utils/helpers';

export async function addReview({ rating, comment, courseId, userId }) {
  if (!courseId || !userId || rating === undefined || comment === undefined) {
    console.warn('Missing data:', { courseId, userId, rating, comment });
    throw error('Missing data');
  }

  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .insert([
      {
        rating,
        text: comment,
        course_id: courseId,
        user_id: userId,
        timestamp: formatDate(Date.now()),
      },
    ]);

  if (reviewsError) {
    console.error(reviewsError.message);
    throw reviewsError;
  }

  const { data, error } = await supabase
    .from('student_courses')
    .update({ rating: rating, review_comment: comment })
    .eq('course_id', courseId)
    .eq('student_id', userId)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  const column = `${rating}_stars`;

  const { data: ratingsData, error: ratingsError } = await supabase.rpc(
    'increment_rating_column',
    {
      course_id: courseId,
      rating,
    },
  );

  if (ratingsError) {
    console.error(ratingsError.message);
    throw ratingsError;
  }

  return data;
}
