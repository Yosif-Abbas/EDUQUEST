import supabase from '../../supabase';
import { getCurrentUser } from './authApi';

// Rule used in Supabase in the Users Policies inside "using()"
// (auth.uid() = "userId")

export async function getWishlist() {
  const currentUser = await getCurrentUser();

  let { data: wishlist, error: wishlistError } = await supabase
    .from('Wishlist')
    // teacher_id(userId(*))
    .select(
      'id, courseId(image_url, subject, currency, title, teacher_id(user_id(first_name, last_name)), regularPrice, discount, rating, rating_count)',
    )
    .eq('userId', currentUser.id);

  if (wishlistError) {
    console.error('Error fetching wishlist:', wishlistError.message);

    throw new Error('Error fetching wishlist');
  }

  return wishlist;
}
