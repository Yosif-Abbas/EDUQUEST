import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import SocialButtonGroup from '../SocialButtonGroup';
import LanguageButton from '../LanguageButton';

function LeftSide() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate('/courses');
  }

  return (
    <div className="sm:bg-alt rounded-xl p-5 sm:grow sm:rounded-l-none sm:rounded-r-4xl lg:flex lg:flex-col lg:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Login</Title>
      <form onSubmit={handleSubmit}>
        <InputField
          placeholder="Enter your username"
          id="username"
          label="User Name"
        />

        <InputField
          isPassord
          id="password"
          placeholder="Enter your password"
          label="Password"
        />

        <div className="mb-2">
          <Button className="" rounded>
            Login
          </Button>
        </div>
      </form>
      <p className="text-alt-darker mb-4 text-[12px]">
        Do you not have an account yet?{' '}
        <span className="text-alt-txt">
          <Link to="/signup">Create an Account</Link>
        </span>
      </p>
      <div className="text-alt-darker">
        <h3 className="mb-1 text-center">- OR -</h3>
        <SocialButtonGroup />
      </div>
    </div>
  );
}

export default LeftSide;
