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
  if (password || email) {
    const { error: updateError } = await supabase.auth.updateUser({
      ...(password && { password }),
      ...(email && { email }),
    });

    if (updateError) {
      throw new Error('Error updating user information');
    }
  }

  const { data, error } = await supabase
    .from('users')
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
