import supabase from '../../supabase';
import { getCurrentUser } from './authApi';

// Rule used in Supabase in the Users Policies inside "using()"
// (auth.uid() = "userId")

export async function getWishlist(studentId) {
  let {
    data: wishlist,
    error: wishlistError,
    count,
  } = await supabase
    .from('Wishlist')
    // teacher_id(userId(*))
    .select(
      'id, courseId(image_url, subject, currency, title, teacher_id(user_id(first_name, last_name)), regularPrice, discount, rating, rating_count)',
      { count: 'exact' },
    )
    .eq('userId', studentId);

  if (wishlistError) {
    console.error('Error fetching wishlist:', wishlistError.message);

    throw new Error('Error fetching wishlist');
  }

  return { wishlist, count };
}
