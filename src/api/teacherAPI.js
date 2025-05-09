import supabase from '../../supabase';
import { getCurrentUser } from './authApi';

export async function getTeacher() {
  const currentTeacher = await getCurrentUser();

  if (currentTeacher.role !== 'teacher') return;

  let { data: userTeacher, error } = await supabase
    .from('teachers')
    .select('id, title')
    .eq('user_id', currentTeacher.id)
    .single();

  if (error) {
    console.error(error.message);

    throw new Error('Error fetching teacher title');
  }

  return { ...currentTeacher, userTeacher };
}

export async function getTeacherRatings(teacherId) {
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id')
    .eq('teacher_id', teacherId);

  if (coursesError) {
    console.error('Error fetching courses:', coursesError);
    return;
  }

  const courseIds = courses.map((c) => c.id);

  // Step 2: Get ratings for those course IDs
  const { data: ratingsData, error: ratingsError } = await supabase
    .from('ratings')
    .select('*')
    .in('course_id', courseIds);

  if (ratingsError) {
    console.error('Error fetching ratings:', ratingsError);
    throw new Error(ratingsError.message);
  }

  const ratings = ratingsData.reduce(
    (acc, rating) => {
      acc['1_stars'] += rating['1_stars'];
      acc['2_stars'] += rating['2_stars'];
      acc['3_stars'] += rating['3_stars'];
      acc['4_stars'] += rating['4_stars'];
      acc['5_stars'] += rating['5_stars'];
      return acc;
    },
    {
      '1_stars': 0,
      '2_stars': 0,
      '3_stars': 0,
      '4_stars': 0,
      '5_stars': 0,
    },
  );

  return ratings;
}
