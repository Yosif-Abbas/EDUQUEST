import { Link } from 'react-router-dom';
import Button from '../Button';
import InputField from '../InputField';
import Logo from '../Logo';
import Title from '../Title';
import SocialButtonGroup from '../SocialButtonGroup';
import LanguageButton from '../LanguageButton';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

function RightSide() {
  const { signup, isLoading } = useSignup();

  const [firstName, setFirstName] = useState('Yosif');
  const [lastName, setLastName] = useState('Abbas');

  const [phone, setPhone] = useState('01096229495');

  const [email, setEmail] = useState('yosif1@test.com');
  const [password, setPassword] = useState('123456');
  const [confirmPass, setConfirmPass] = useState('123456');

  const [selectedRole, setSelectedRole] = useState('');

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!selectedRole) newErrors.role = 'Please select a role.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format.';
    if (!password) newErrors.password = 'Password is required.';
    if (!confirmPass) newErrors.confirmPass = 'Please confirm your password.';
    if (password && confirmPass && password !== confirmPass)
      newErrors.confirmPass = 'Passwords do not match.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // create new account

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !selectedRole
    )
      return;

    signup({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      role: selectedRole,
    });
  }

  return (
    <div className="sm:bg-alt rounded-xl px-3 py-5 sm:grow sm:rounded-l-4xl sm:rounded-r-none md:px-8 xl:flex xl:flex-col xl:justify-center">
      <div className="mb-3 flex justify-between">
        <Logo />
        <LanguageButton />
      </div>
      <Title className="">Sign Up</Title>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
          <InputField
            placeholder="First Name"
            id="first-name"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            error={errors.firstName}
          />

          <InputField
            placeholder="Last Name"
            id="last-name"
            label="Last Name"
            disabled={isLoading}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
        </div>

        <div className="flex gap-6 py-1 text-[#7C838A]">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={selectedRole === 'student'}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="cursor-pointer accent-blue-500"
            />
            <span>Student</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-[#7C838A]">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={selectedRole === 'teacher'}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="cursor-pointer accent-blue-500"
            />
            <span>Teacher</span>
          </label>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        <InputField
          placeholder="Phone Number"
          id="phone"
          label="Phone Number"
          disabled={isLoading}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
        <InputField
          placeholder="Email Address"
          id="email"
          label="Email Address"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <InputField
          isPassord
          id="password"
          type="password"
          placeholder="Password"
          label="Password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <InputField
          isPassord
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          disabled={isLoading}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          error={errors.confirmPass}
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
