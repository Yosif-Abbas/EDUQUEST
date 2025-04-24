import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();

  const handleHomepRedirect = () => {
    navigate('/');
  };

  return (
    <img
      src="https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//logo.png"
      alt="eduquest"
      className="w-30 cursor-pointer sm:w-50"
      onClick={handleHomepRedirect}
    />
  );
}

export default Logo;
