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

  console.log(currentUser.id);
  const user = await getUser(currentUser.id);



  const { email, aud, identities, user_metadata, is_anonymous } = currentUser;

  const finalUser = {
    ...user,
    email,
    aud,
    identities,
    user_metadata,
    is_anonymous,
  };

  console.log(finalUser);

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

export async function signup({
  first_name,
  last_name,
  role,
  phone_number,
  email,
  password,
}) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const { data: userData, error: userInsertError } = await supabase
    .from('Users')
    .insert([
      {
        email,
        first_name,
        last_name,
        role,
        phone_number,
        userId: signUpData.user.id,
      },
    ])
    .select()
    .single();

  if (userInsertError) {
    throw new Error(userInsertError.message);
  }

  console.log('User data:', userData);

  const { aud, identities, user_metadata, is_anonymous } = signUpData.user;

  return {
    ...userData,
    image_url: '',
    biography: '',
    aud,
    identities,
    user_metadata,
    is_anonymous,
  };
}
