import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import Notfound from '../assets/404.png';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-240 flex-col items-center gap-y-4 px-4">
      <h1 className="text-L2 text-6xl">Error 404</h1>
      <p className="text-4xl">Oops! page not found</p>
      <Button
        size="md"
        className="mt-2 font-medium"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      <img src={Notfound} alt="404" className="" />
    </div>
  );
}

export default NotFound;
