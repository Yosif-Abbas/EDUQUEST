import supabase from '../../supabase';
import { formatDate } from '../utils/helpers';

export async function addReview({ rating, comment, courseId, userId }) {
  if (!courseId || !userId || rating === undefined || comment === undefined) {
    console.warn('Missing data:', { courseId, userId, rating, comment });
    throw error('Something is wrong!');
  }

  const { data: existing, error: checkError } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (checkError) {
    console.error(checkError.message);
    throw checkError;
  }

  let query = supabase.from('reviews');

  // check if the review already exists
  if (existing) {
    // update the ratings table
    const { data: ratingsData, error: ratingsError } = await supabase.rpc(
      'decrement_ratings',
      {
        p_course_id: courseId,
        p_rating: existing.rating,
      },
    );

    query = query
      .update({ rating, text: comment, timestamp: formatDate(Date.now()) })
      .eq('user_id', userId)
      .eq('course_id', courseId);
  } else {
    query = query.insert([
      {
        rating,
        text: comment,
        course_id: courseId,
        user_id: userId,
        timestamp: formatDate(Date.now()),
      },
    ]);
  }

  const { error: reviewsError } = await query;

  if (reviewsError) {
    console.error(reviewsError.message);
    throw reviewsError;
  }

  // update the student_courses table
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

  // update the ratings table
  const { data: ratingsData, error: ratingsError } = await supabase.rpc(
    'increment_ratings',
    {
      p_course_id: courseId,
      p_rating: rating,
    },
  );

  if (ratingsError) {
    console.error(ratingsError.message);
    throw ratingsError;
  }

  // update the rating column in the courses table
  const { data: ratingData, error: ratingError } = await supabase.rpc(
    'increment_rating_column',
    {
      course_id: courseId,
    },
  );

  if (ratingError) {
    console.error(ratingError.message);
    throw ratingError;
  }

  return data;
}
