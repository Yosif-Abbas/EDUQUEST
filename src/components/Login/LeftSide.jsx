import { Link } from 'react-router-dom';
import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import LanguageButton from '../LanguageButton';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import Spinner from '../Spinner';

function LeftSide() {
  // const [loginEmail, setLoginEmail] = useState('text@test.com');
  const [loginEmail, setLoginEmail] = useState('abdo@abdo.com');
  const [password, setPassword] = useState('123456');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!loginEmail || !password) return;

    login({ loginEmail, password });
  }

  return (
    <div className="sm:bg-alt rounded-xl p-5 sm:grow sm:rounded-l-none sm:rounded-r-4xl lg:flex lg:flex-col lg:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Login</Title>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <InputField
          placeholder="Enter your email"
          id="email"
          type="email"
          label="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          disabled={isLoading}
        />

        <InputField
          isPassord={true}
          id="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <div className="mb-2">
          <Button rounded disabled={isLoading}>
            {isLoading ? <Spinner color="#dde6ed" /> : 'Login'}
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
        {/* <h3 className="mb-1 text-center">- OR -</h3>
        <SocialButtonGroup /> */}
      </div>
    </div>
  );
}

export default LeftSide;
