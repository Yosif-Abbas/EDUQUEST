import WishlistItem from '../../components/WishlistItem';
import image from '../../assets/Course image.png';

function Wishlist() {
  return (
    <section className="space-y-6">
      <h2 className="ml-6 text-2xl font-normal">
        <span className="font-medium">Wishlist</span> (3)
      </h2>
      <ul className="bg-white px-6">
        <li className="student-wishlist-item text-sm text-[#4E5566]">
          <span className="col-span-3">COURSES</span>
          <span className="col-span-1">PRICES</span>
          <span className="col-span-2">ACTION</span>
        </li>
        <li className="student-wishlist-item">
          <WishlistItem
            image={image}
            instructor={'Mr Mahmoud'}
            price={{ now: '37.00', pre: '49.00' }}
            rating={4.6}
            reviews={'451,444'}
            subject={'Maths'}
            title={'Mathematics Chapter 3'}
          />
        </li>
      </ul>
    </section>
  );
}

export default Wishlist;
