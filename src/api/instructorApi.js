import supabase from '../../supabase';

export const getInstructor = async (id) => {
  let { data, error } = await supabase
    .from('Teachers')
    .select('*, Users(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log(data);
  return data;
};
