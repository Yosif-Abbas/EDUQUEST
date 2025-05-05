import WishlistItem from '../../components/WishlistItem';
import { useWishlist } from '../../hooks/useWishlist';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function Wishlist() {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const studentId = currentUser?.id;

  const { wishlist, isLoading, count } = useWishlist(studentId);

  const uniqueWishlist = wishlist?.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.course_id.id === item.course_id.id);
    if (!existingItem) {
      acc.push(item);
    }

    return acc;
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="ml-6 text-2xl font-normal">
        <span className="font-medium">Wishlist</span>{' '}
        <span>({isLoading ? <Spinner color="#ff5a00" /> : count || 0})</span>
      </h2>
      <ul className="bg-white px-6">
        <li className="student-wishlist-item text-sm text-[#4E5566]">
          <span className="col-span-5 md:col-span-6 lg:col-span-7">
            COURSES
          </span>
          <span className="col-span-3 md:col-span-2">PRICES</span>
          <span className="col-span-4 lg:col-span-3">ACTION</span>
        </li>
        {isLoading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Loading size={150} />
          </div>
        ) : (
          uniqueWishlist &&
          uniqueWishlist.map((item) => (
            <WishlistItem
              item={item}
              key={item.id}
              wishlist={uniqueWishlist}
              isLoadingWishlist={isLoading}
            />
          ))
        )}
      </ul>
    </section>
  );
}

export default Wishlist;
