import supabase from '../../supabase';

export async function login({ loginEmail, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = await getUser(data?.user?.id);

  const { email, aud, identities, user_metadata, is_anonymous } = data.user;

  return { ...user, email, aud, identities, user_metadata, is_anonymous };
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user: currentUser },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) throw new Error(currentUserError.message);

  const user = await getUser(currentUser.id);

  const { email, aud, identities, user_metadata, is_anonymous } = currentUser;

  return { ...user, email, aud, identities, user_metadata, is_anonymous };
}

export async function getUser(id) {
  let { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('userId', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
