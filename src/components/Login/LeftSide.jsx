import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import LanguageButton from '../LanguageButton';
import Spinner from '../Spinner';

import { useLogin } from '../../hooks/useLogin';
import SocialButtonGroup from '../SocialButtonGroup';

function LeftSide() {
  const { login, isLoading } = useLogin();

  const validateLogin = (values) => {
    const errors = {};
    console.log(values);
    if (!values.email) errors.email = 'Required';

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = 'Invalid email address';

    if (values.password.length < 8) errors.password = 'Password too short';

    return errors;
  };

  return (
    <div className="sm:bg-alt rounded-xl p-5 sm:grow sm:rounded-l-none sm:rounded-r-4xl lg:flex lg:flex-col lg:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Login</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validateLogin}
        onSubmit={(values) => {
          login({ loginEmail: values.email, password: values.password });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div>
              <InputField
                placeholder="Enter your email"
                id="email"
                type="email"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                disabled={isLoading}
              />
              <span className="text-red-400">
                {errors.email && touched.email && errors.email}
              </span>
            </div>

            <div>
              <InputField
                isPassword
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                disabled={isLoading}
              />
              <span className="text-xs text-red-400 md:text-sm">
                {errors.password && touched.password && errors.password}
              </span>
            </div>

            <Button className="w-fit" type="submit" rounded disabled={isLoading}>
              {isLoading ? <Spinner color="#dde6ed" /> : 'Login'}
            </Button>
          </form>
        )}
      </Formik>
      <p className="text-alt-darker my-2 text-[12px]">
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

/*
function LeftSide() {
  // const [loginEmail, setLoginEmail] = useState('text@test.com');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
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
      </div>
      </div>
    );
  } 
  */
{
  /* <h3 className="mb-1 text-center">- OR -</h3>
 <SocialButtonGroup /> */
}
