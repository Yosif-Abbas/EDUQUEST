import { useState } from 'react';
import Logo from '../components/Logo';
import { Eye } from '../components/Eye';
import { EyeOff } from '../components/EyeOff';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-lvh bg-[#526D82]">
      <div className="width absolute py-2 pl-4">
        <Logo />
      </div>
      <div className="flex h-full w-3/5 flex-col gap-20 rounded-r-[60px] bg-[#DDE6ED] pt-25">
        <h1 className="ml-25 text-4xl font-extrabold tracking-widest text-[#27374D] not-italic">
          Login
        </h1>
        <form className="flex w-3/5 flex-col items-start gap-15 self-center">
          <div className="w-full">
            <label htmlFor="username" className="ml-2 text-[#7C838A]">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 min-w-full rounded-2xl bg-[#b0bac365] px-8 py-4"
              placeholder="Enter your username"
            />
          </div>

          <div className="relative w-full">
            <label htmlFor="Password" className="ml-2 text-[#7C838A]">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="Password"
              className="relative mt-2 min-w-full rounded-2xl bg-[#b0bac365] px-8 py-4 focus:ring focus:ring-blue-200"
              placeholder="Enter your Password"
            />
            <button
              type="button"
              className="absolute top-11/16 right-5 flex -translate-y-1/2 cursor-pointer items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
            </button>
          </div>
          <div className="flex w-full justify-center">
            <Button className="px-35" rounded>
              Login
            </Button>
          </div>
          <p className="text-[#939191]">
            Do you not have an account yet?{' '}
            <span className="text-[#b9896c]">
              <Link to="/signup">Create an Account</Link>
            </span>
          </p>
          <div className="flex w-full flex-col gap-6 text-[#939191]">
            <h3 className="self-center text-3xl">- OR -</h3>
            <div className="flex justify-around">
              <Button
                className="inline-flex items-center justify-center border-1 py-4 text-[16px] font-normal text-[#7C838A]"
                rounded
                type="submit"
              >
                <span className="mr-2 text-4xl">
                  <FcGoogle />
                </span>
                Sign up with Google
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-2xl border-1 text-[16px] font-normal text-[#7C838A]"
                rounded
                type="submit"
              >
                <span className="mr-2 text-4xl text-black">
                  <FaGithub />
                </span>
                Sign up with Github
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
