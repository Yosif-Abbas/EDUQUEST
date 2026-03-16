import { useNavigate } from 'react-router-dom';

import Button from '../Button';

function Footer() {
  const navigate = useNavigate();

  const handleCoursesRedirect = () => {
    navigate('/courses');
  };

  return (
    <div className="relative flex justify-between">
      <div className="flex w-full max-w-180 flex-col items-center justify-center gap-y-2 md:gap-y-4">
        <p className="footer-p">Start your first mission</p>
        <div className="flex items-center gap-x-4">
          <p className="footer-p">Join→</p>
          <Button className="" size="md" onClick={handleCoursesRedirect}>
            Start
          </Button>
        </div>
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
