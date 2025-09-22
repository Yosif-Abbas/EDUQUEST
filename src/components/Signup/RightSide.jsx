import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import LanguageButton from '../LanguageButton';
import { useSignup } from '../../hooks/useSignup';
import Spinner from '../Spinner';
import Role from '../Role';

function RightSide() {
  const { signup, isLoading } = useSignup();

  const validateSignup = (values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const { first_name, last_name, role, email, password, confirm_password } = values;

    // first_name
    if (!first_name) errors.first_name = 'Name required';
    else if (!nameRegex.test(first_name) || first_name.length < 3 || first_name.length > 51)
      errors.first_name = 'Add your real name';
    // last_name
    if (!last_name) errors.last_name = 'Name required';
    else if (!nameRegex.test(last_name) || last_name.length < 3 || last_name.length > 51)
      errors.last_name = 'Add your real name';

    // role
    if (!role) errors.role = 'Role required';

    // email
    if (!email) errors.email = 'Email required';
    else if (!emailRegex.test(email)) errors.email = 'Invalid email address';

    // password
    if (!password) errors.password = 'Password Required';
    else if (password.length < 8) errors.password = 'Too short password';
    else if (!/[A-Z]/.test(password)) errors.password = 'At least 1 uppercase letter';
    else if (!/[a-z]/.test(password)) errors.password = 'At least 1 lowercase letter';
    else if (!/[0-9]/.test(password)) errors.password = 'At least 1 number';
    else if (!/[!@#$&*]/.test(password)) errors.password = 'At least 1 special character';

    // confirm_password
    if (!confirm_password) errors.confirm_password = 'Confirm your password please';
    else if (confirm_password !== password)
      errors.confirm_password = 'Make sure passwords are the same';

    return errors;
  };

  return (
    <div className="sm:bg-alt rounded-xl px-3 py-5 sm:grow sm:rounded-l-4xl sm:rounded-r-none md:px-8 xl:flex xl:flex-col xl:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Sign Up</Title>

      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          role: '',
          // phone_number: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        validate={validateSignup}
        onSubmit={(values) => {
          signup(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <div className="flex gap-x-4">
              <div className="flex-1">
                <InputField
                  placeholder="First Name"
                  id="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />

                <span className="text-sm text-red-400">
                  {errors.first_name && touched.first_name && <div>{errors.first_name}</div>}
                </span>
              </div>
              <div className="flex-1">
                <InputField
                  placeholder="Last Name"
                  id="last_name"
                  disabled={isLoading}
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-sm text-red-400">
                  {errors.last_name && touched.last_name && <div>{errors.last_name}</div>}
                </span>
              </div>
            </div>

            <div className="mx-auto">
              <Role handleBlur={handleBlur} handleChange={handleChange} values={values} />
            </div>
            <span className="text-sm text-red-400">
              {errors.role && touched.role && <div>{errors.role}</div>}
            </span>

            <InputField
              placeholder="Email Address"
              id="email"
              disabled={isLoading}
              value={values.email}
              onChange={handleChange}
            />

            <span className="text-sm text-red-400">
              {errors.email && touched.email && <div>{errors.email}</div>}
            </span>

            <InputField
              isPassword
              id="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span className="text-sm text-red-400">
              {errors.password && touched.password && <div>{errors.password}</div>}
            </span>

            <InputField
              isPassword
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
              disabled={isLoading}
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="text-sm text-red-400">
              {errors.confirm_password && touched.confirm_password && (
                <div>{errors.confirm_password}</div>
              )}
            </span>

            <Button className="w-fit" rounded={true} type="submit" disabled={isLoading}>
              {isLoading ? <Spinner color="#dde6ed" /> : 'Sign up'}
            </Button>
          </form>
        )}
      </Formik>

      <p className="text-alt-darker my-4 text-[12px]">
        Already have an accout?{' '}
        <span className="text-alt-txt">
          <Link to="/login">Log in</Link>
        </span>
      </p>
      {/* <div className="text-alt-darker">
        <h3 className="mb-1 text-center">- OR -</h3>
        <SocialButtonGroup forLogin={false} />
      </div> */}
    </div>
  );
}

export default RightSide;

{
  /* <InputField
              placeholder="Phone Number"
              id="phone"
              disabled={isLoading}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            /> */
}
