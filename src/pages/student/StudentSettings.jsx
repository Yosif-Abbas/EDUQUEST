import { LuUpload } from 'react-icons/lu';
import avatar from '../../assets/picture.jpg';
import { useState } from 'react';
import { Eye } from '../../components/Eye';
import { EyeOff } from '../../components/EyeOff';

function StudentSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="ml-6 text-2xl font-medium">Account settings</h2>

      <div className="grid-col-1 grid gap-20 p-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-20">
        <div className="space-y-5 lg:col-span-1">
          <figure className="relative">
            <img src={avatar} alt="Avatar" className="h-auto w-full" />
            <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 bg-[#0000007c] p-3 text-white">
              <span>
                <LuUpload />
              </span>
              <span className="text-sm">Upload Photo</span>
            </div>
          </figure>
          <p className="text-center text-sm font-normal text-[#6E7485]">
            Image size should be under 1MB and image ration needs to be 1:1
          </p>
        </div>

        <form className="space-y-5 lg:col-span-2">
          <div>
            <label className="mb-1 block text-sm">Full Name</label>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
              <input
                placeholder="First name"
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
              <input
                placeholder="Last name"
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm">Username</label>
            <input
              placeholder="Enter your username"
              className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              placeholder="Email address"
              className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Tittle</label>
            <input
              placeholder="Your tittle, proffesion or small biography"
              className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">New Password</label>
            <div className="relative">
              <input
                placeholder="Password"
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
              </button>
            </div>
          </div>
          <button className="bg-L6 px-6 py-3 text-white">Save Changes</button>
        </form>
      </div>
    </section>
  );
}

export default StudentSettings;
