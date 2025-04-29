import WishlistItem from '../../components/WishlistItem';
import { useWishlist } from '../../hooks/useWishlist';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function Wishlist() {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const studentId = currentUser?.id;
  
  const { wishlist, isLoading } = useWishlist(studentId);

  return (
    <section className="space-y-6">
      <h2 className="ml-6 text-2xl font-normal">
        <span className="font-medium">Wishlist</span>{' '}
        <span>
          ({isLoading ? <Spinner color="#ff5a00" /> : wishlist.length})
        </span>
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
          wishlist.map((item) => (
            <li key={item.id} className="student-wishlist-item">
              <WishlistItem item={item} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Wishlist;
