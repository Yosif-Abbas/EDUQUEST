import { useNavigate } from 'react-router-dom';
import image from '../assets/logo.png';

function Logo() {
  const navigate = useNavigate();

  const handleHomepRedirect = () => {
    navigate('/');
  };

  return (
    <img
      src={image}
      alt="eduquest"
      className="w-30 cursor-pointer sm:w-50"
      onClick={handleHomepRedirect}
    />
  );
}

export default Logo;
