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
      <div className="flex items-center">
        <Title className="mt-6 ml-12 inline-flex flex-col text-5xl font-extrabold italic">
          Start your first mission
          <span className="mt-4 ml-25 self-center">Join →</span>
        </Title>
        <Button className="self-end" size="lg" onClick={handleCoursesRedirect}>
          Start
        </Button>
      </div>
      <div>
        <img src={HourGlasses} alt="Hourglasses" className="w-2xl" />
      </div>
    </div>
  );
}

export default Footer;
