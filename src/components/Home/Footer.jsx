import Button from '../Button';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleCoursesRedirect = () => {
    navigate('/courses');
  };

  return (
    <div className="relative flex justify-between py-5">
      <div className="flex w-full max-w-180 items-center justify-around">
        <h1 className="text-main-txt inline-flex flex-col text-xl font-extrabold whitespace-nowrap italic md:text-2xl lg:text-4xl">
          Start your first mission
          <span className="self-center"> Join→</span>
        </h1>
        <Button className="self-end" size="md" onClick={handleCoursesRedirect}>
          Start
        </Button>
      </div>
      <div>
        <img
          src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//hourglasses.png"
          alt="Hourglasses"
          className="hidden w-lg md:w-xl lg:block"
        />
      </div>
    </div>
  );
}

export default Footer;
