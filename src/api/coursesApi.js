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
  const { data, error } = await supabase
    .from('Courses')
    .select(
      `*, 
      course_requirements(*), 
      course_includes(*), 
      course_benefits(*),
      Teachers(*, Users(*)),
      course_sections(*, Lectures(*, Videos(*))),
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
