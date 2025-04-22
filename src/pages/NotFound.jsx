import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-240 flex-col items-center gap-y-4 px-4">
      <h1 className="text-L2 text-6xl">Error 404</h1>
      <p className="text-4xl">Oops! page not found</p>
      <Button
        size="md"
        className="mt-2 font-medium"
        onClick={() => navigate('/home')}
      >
        Go Back
      </Button>
      <img
        src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//404.png"
        alt="404"
        className=""
      />
    </div>
  );
}

export default NotFound;
