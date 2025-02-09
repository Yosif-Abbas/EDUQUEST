import Footer from '../components/Home/Footer';
import ImageGroup from '../components/Home/ImageGroup';

const Home = () => {
  return (
    <>
      <h1 className="mt-6 ml-5 text-4xl font-extrabold whitespace-nowrap italic md:ml-20 lg:ml-55 lg:text-left lg:text-6xl">
        Discover. Learn. Level up
      </h1>
      <ImageGroup />
      <Footer />
    </>
  );
};

export default Home;
