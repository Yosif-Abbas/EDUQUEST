import { Link } from 'react-router-dom';
import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import SocialButtonGroup from '../SocialButtonGroup';
import LanguageButton from '../LanguageButton';

function LeftSide() {
  return (
    <div className="flex min-h-lvh w-3/5 flex-col gap-15 rounded-r-[60px] bg-[#DDE6ED]">
      <div className="flex justify-between px-4 py-2">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="ml-20">Login</Title>
      <div className="flex w-3/5 flex-col items-start gap-15 self-center">
        <form className="flex w-full flex-col gap-15">
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

          <div className="flex w-full justify-center">
            <Button className="px-35" rounded>
              Login
            </Button>
          </div>
        </form>
        <p className="text-[#939191]">
          Do you not have an account yet?{' '}
          <span className="text-[#b9896c]">
            <Link to="/signup">Create an Account</Link>
          </span>
        </p>
        <div className="flex w-full flex-col gap-6 text-[#939191]">
          <h3 className="self-center text-3xl">- OR -</h3>
          <SocialButtonGroup />
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
