import supabase from '../../supabase';

const PAGE_SIZE = 8;

export const getCourses = async ({ sort, filter, search, page }) => {
  let query = supabase.from('courses').select('*', { count: 'exact' });

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

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw error;
  }

  return { data, count };
};

export const getCourse = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .select(
      `*,
        course_requirements(*),
        course_includes(*),
        course_benefits(*),
        course_sections(*, lectures(*, videos(*))),
        teachers(*, users(*)),
        ratings(*),
        reviews(*, users(*))`,
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
    .from('courses')
    .select('*')
    .eq('teacher_id', id);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getEnrolledCourses = async (studentId) => {
  let {
    data: student_courses,
    isLoading,
    count,
    error,
    isError,
  } = await supabase
    .from('student_courses')
    .select('created_at, id, is_active, is_completed, course_id(*)', {
      count: 'exact',
    })
    .eq('student_id', studentId);

  if (error) {
    throw new Error('Error fetching student courses');
  }

  return { student_courses, isLoading, count, error, isError };
};

export const getEnrolledCourse = async ({ studentId, courseId }) => {
  const { data, error } = await supabase
    .from('student_courses')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const enrollInCourse = async ({ studentId, courseId }) => {
  // Check if the record exists
  const { data: existing, error: checkError } = await supabase
    .from('student_courses')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (checkError) {
    console.error(checkError.message);
    throw checkError;
  }

  if (existing) {
    console.error('Already enrolled in this course');

    throw new Error('Already enrolled in this course');
  }

  // Insert if not existing
  const { data, error } = await supabase
    .from('student_courses')
    .insert([
      {
        student_id: studentId,
        course_id: courseId,
        is_active: false,
        is_completed: false,
      },
    ])
    .select('*')
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};
