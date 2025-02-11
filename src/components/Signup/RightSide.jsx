import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import SocialButtonGroup from '../SocialButtonGroup';
import LanguageButton from '../LanguageButton';

function RightSide() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // create new account

    navigate('/courses');
  }
  return (
    <div className="sm:bg-alt rounded-xl px-3 py-5 sm:grow sm:rounded-l-4xl sm:rounded-r-none md:px-8 xl:flex xl:flex-col xl:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Sign Up</Title>
      <form onSubmit={handleSubmit}>
        <InputField placeholder="Full Name" id="full-name" label="label" />
        <InputField placeholder="Class" id="class" label="label" />
        <InputField placeholder="Phone Number" id="phone" label="label" />
        <InputField placeholder="Email Address" id="email" label="label" />

        <InputField
          isPassord
          id="password"
          placeholder="Password"
          label="label"
        />

        <div className="mx-auto mb-2">
          <Button rounded>Create Account</Button>
        </div>
      </form>
      <p className="text-alt-darker mb-4 text-[12px]">
        Already have an accout?{' '}
        <span className="text-alt-txt">
          <Link to="/login">Log in</Link>
        </span>
      </p>
      <div className="text-alt-darker">
        <h3 className="mb-1 text-center">- OR -</h3>
        <SocialButtonGroup forLogin={false} />
      </div>
    </div>
  );
}

export default RightSide;
