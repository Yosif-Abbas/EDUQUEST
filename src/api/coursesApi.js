import supabase from '../../supabase';

export const getCourses = async () => {
  let { data, error } = await supabase.from('Courses').select('*');

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getCourse = async (id) => {
  // const { data, error } = await supabase
  //   .from('Courses')
  //   .select(
  //     `*,
  //       course_benefits(*),
  //       course_includes(*),
  //       course_requirements(*),
  //       course_sections(*, Lectures(*, Videos(*))),
  //       Ratings(*),
  //       Reviews(*, Users(*))`,
  //   )
  //   .eq('id', id)
  //   .single();

  const { data, error } = await supabase
    .from('Courses')
    .select(
      `*,
        course_requirements(*),
        course_includes(*),
        course_benefits(*),
        course_sections(*, Lectures(*, Videos(*))),
        Teachers(*),
        Ratings(*),
        Reviews(*, Users(*))`,
    )
    .eq('id', id)
    .single();

  console.log(id, data);
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
    .eq('teacherId', id);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};
