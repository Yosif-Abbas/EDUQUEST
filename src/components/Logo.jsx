import image from '../assets/logo.png';

function Logo({ handleHomepRedirect }) {
  return (
    <img
      src={image}
      alt="eduquest"
      className="m-2 ml-4 w-xs cursor-pointer"
      onClick={handleHomepRedirect}
    />
  );
}

export default Logo;
