import supabase from '../../supabase';

export const getCourses = async ({ sort, filter, search }) => {
  let query = supabase.from('Courses').select('*');
  console.log(search);

  // Searching
  if (search && search.value) {
    const searchTerm = `%${search.value}%`;
    query = query.or(
      `title.ilike.${searchTerm},subject.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`,
    );
  }

  // Filtering
  if (filter && filter.value !== 'all') {
    query = query.ilike('category', `%${filter.value}%`);
  }

  // Sorting
  query = query.order(sort.value, { ascending: sort.order === 'asc' });

  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getCourse = async (id) => {
  const { data, error } = await supabase
    .from('Courses')
    .select(
      `*,
        course_requirements(*),
        course_includes(*),
        course_benefits(*),
        course_sections(*, Lectures(*, Videos(*))),
        Teachers(*, Users(*)),
        Ratings(*),
        Reviews(*, Users(*))`,
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getCoursesByTeacherId = async (id) => {
  const { data, error } = await supabase
    .from('Courses')
    .select('*')
    .eq('teacher_id', id);

  console.log(id, data);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export async function getStudentCourses({ studentID, sort }) {
  let query = supabase
    .from('student_courses')
    .select('created_at, id, course_id(*)')
    .eq('student_id', studentID);

  // Sorting
  query = query.order(
    sort.value === 'created_at' ? sort.value : `course_id(${sort.value})`,
    { ascending: sort.order === 'asc' },
  );

  const { data: student_courses, error } = await query;

  if (error) {
    console.error(error.message);

    throw new Error('Error fetching student courses');
  }

  return student_courses;
}
