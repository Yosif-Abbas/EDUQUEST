import supabase from '../../supabase';

export async function updateStudentSettings({
  id,
  first_name,
  last_name,
  phone_number,
  email,
  biography,
  password,
}) {
  if (password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password,
    });

    if (passwordError) {
      throw new Error('Error updating password');
    }
  }

  const { data, error } = await supabase
    .from('Users')
    .update({ first_name, last_name, phone_number, email, biography })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('Error updating student settings');
  }

  console.log('Student settings updated: ', data, 'password ');

  return data;
}
