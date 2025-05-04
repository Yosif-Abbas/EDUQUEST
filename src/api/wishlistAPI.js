import supabase from '../../supabase';

// Rule used in Supabase in the Users Policies inside "using()"
// (auth.uid() = "userId")

export async function getWishlist(studentId) {
  let {
    data: wishlist,
    error: wishlistError,
    count,
  } = await supabase
    .from('wishlist')
    // teacher_id(userId(*))
    .select('id, course_id(*, teacher_id(user_id(*))),user_id', {
      count: 'exact',
    })
    .eq('user_id', studentId);

  if (wishlistError) {
    console.error('Error fetching wishlist:', wishlistError.message);

    throw new Error('Error fetching wishlist');
  }

  return { wishlist, count };
}

export async function addToWishlist({ courseId, userId }) {
  // Check if the record exists
  const { data: existing, error: checkError } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (checkError) {
    console.error(checkError.message);
    throw checkError;
  }

  if (existing) {
    console.error('Already in your wishlist');

    throw new Error('Already in your wishlist');
  }

  const { data, error } = await supabase
    .from('wishlist')
    .insert({ course_id: courseId, user_id: userId })
    .select('*')
    .single();

  if (error) {
    console.error('Error adding to wishlist:', error.message);
    throw new Error('Error adding to wishlist');
  }

  return data;
}

export async function removeFromWishlist({ courseId, userId }) {
  const { data, error } = await supabase
    .from('wishlist')
    .delete()
    .eq('course_id', courseId)
    .eq('user_id', userId)
    .select('*');

  if (error) {
    console.error('Error removing from wishlist:', error.message);
    throw new Error('Error removing from wishlist');
  }

  return data;
}
