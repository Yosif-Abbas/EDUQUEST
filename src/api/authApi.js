import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import { useCurrentUser } from '../hooks/users/useCurrentUser';
import { createTeacher } from './userApi';

export async function login({ loginEmail, password }) {
  let { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', loginEmail)
    .maybeSingle();

  if (userError || !userData) {
    throw new Error('Invalid login credentials');
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password,
  });

  if (error || !data) {
    throw new Error(error.message);
  }

  const user = await getUser(data?.user?.id);

  const { email, aud, identities, user_metadata, is_anonymous } = data.user;

  return { ...user, email, aud, identities, user_metadata, is_anonymous };
}

export async function loginWithGoogle() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/',
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  window.location.href = data.url;
}

export async function loginWithGithub() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:5173/',
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  window.location.href = data.url;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function createUserFromOAuth(authUser) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        user_id: authUser.id,
        first_name: authUser.user_metadata.full_name,
        email: authUser.email,
        phone_number: authUser.phone,
        role: null,
        last_name: null,
        image_url: authUser.user_metadata.avatar_url || null,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user: currentUser },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) throw new Error(currentUserError.message);

  let userData = await getUser(currentUser.id);

  if (!userData) {
    const { data } = createUserFromOAuth(currentUser);
    userData = data;
  }

  const { aud, identities, user_metadata, is_anonymous } = currentUser;

  return {
    ...userData,
    aud,
    identities,
    user_metadata,
    is_anonymous,
  };
}

export async function getUser(id) {
  let { data: user, error } = await supabase
    .from('users')
    .select(
      `
      *,
      teachers (*)
    `,
    )
    .eq('user_id', id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function signup({ first_name, last_name, role, phone_number, email, password }) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const { data: userData, error: userInsertError } = await supabase
    .from('users')
    .insert([
      {
        email,
        first_name,
        last_name,
        role,
        phone_number,
        user_id: signUpData.user.id,
      },
    ])
    .select()
    .single();

  if (userInsertError) {
    throw new Error(userInsertError.message);
  }

  if (userData.role === 'teacher') {
    createTeacher({ user_id: userData.id, title: '' });
  }

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
