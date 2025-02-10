import Button from '../Button';
import Title from '../Title';
import HourGlasses from '../../assets/hourglasses.png';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleCoursesRedirect = () => {
    navigate('/courses');
  };

  return (
    <div className="relative mt-20 flex justify-between py-5">
      <div className="flex">
        <Title className="inline-flex flex-col text-5xl font-extrabold italic">
          Start your first mission
          <span className="self-center"> Join→</span>
        </Title>
        <Button className="self-end" size="lg" onClick={handleCoursesRedirect}>
          Start
        </Button>
      </div>
      <div>
        <img
          src={HourGlasses}
          alt="Hourglasses"
          className="hidden w-2xl md:block"
        />
      </div>
    </div>
  );
}

export default Footer;
