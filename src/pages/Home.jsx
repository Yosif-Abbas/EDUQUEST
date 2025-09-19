import Footer from '../components/Home/Footer';
import ImageGroup from '../components/Home/ImageGroup';

const Home = () => {
  return (
    <div className="container">
      <h1 className="mt-6 ml-auto text-4xl font-extrabold whitespace-nowrap italic md:ml-20 lg:ml-55 lg:text-left lg:text-6xl">
        Discover. Learn. Level up
      </h1>
      <main className="min-h-dvh">
        <ImageGroup />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
