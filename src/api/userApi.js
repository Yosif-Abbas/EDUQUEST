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

  return data;
}

export async function updateUser({ id, obj }) {
  const { data, error } = await supabase.from('users').update(obj).eq('id', id);

  if (error) {
    throw new Error('Error updating user!');
  }

  return data;
}

export async function deleteStudent({ id, user_id }) {
  let { errorUser } = await supabase.from('users').select('*').eq('user_id', id).maybeSingle();

  if (errorUser) throw new Error(studentCoursesError.message);

  const { error: studentCoursesError } = await supabase
    .from('student_courses')
    .delete()
    .eq('student_id', id);

  if (studentCoursesError) throw new Error(studentCoursesError.message);

  const { error: reviewsError } = await supabase.from('reviews').delete().eq('user_id', id);

  if (reviewsError) throw new Error(reviewsError.message);

  const { error: userError } = await supabase.from('users').delete().eq('id', id);

  if (userError) throw new Error(userError.message);

  const { error } = await supabase.functions.invoke('delete-user', {
    body: { userId: user_id },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function deleteTeacher({ id, user_id }) {
  const { error: teachersError } = await supabase.from('teachers').delete().eq('user_id', id);

  if (teachersError) throw new Error(teachersError.message);

  const { error: userError } = await supabase.from('users').delete().eq('id', id);

  if (userError) throw new Error(userError.message);

  const { error } = await supabase.functions.invoke('delete-user', {
    body: { userId: user_id },
  });

  if (error) console.error(error);
}

export async function createTeacher({ user_id }) {
  const { error } = await supabase.from('teachers').insert([{ user_id }]);

  if (error) throw new Error(error.message);
}
