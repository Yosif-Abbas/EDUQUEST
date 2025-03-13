import { LuUpload } from 'react-icons/lu';
import avatar from './../../assets/picture.jpg';
import { PiGlobeSimple } from 'react-icons/pi';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import { Eye } from '../../components/Eye';
import { EyeOff } from '../../components/EyeOff';

function TeacherSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  return (
    <>
      <form className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Account Settings</h2>

        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full grow">
            <div className="mb-6 flex flex-col gap-1.5">
              <label htmlFor="full-name" className="">
                Full name
              </label>
              <div className="flex flex-col gap-2 lg:flex-row">
                <input
                  type="text"
                  id="first-name"
                  placeholder="First name"
                  className="grow border-1 border-white p-2 pl-4"
                />
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                  className="grow border-1 border-white p-2 pl-4"
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-1.5">
              <label htmlFor="username" className="">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="border-1 border-white p-2 pl-4"
              />
            </div>

            <div className="mb-6 flex flex-col gap-1.5">
              <label htmlFor="phone-number" className="">
                Phone number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  placeholder="Your phone number"
                  className="w-full border-1 border-white p-2 pl-16"
                />
                <select className="absolute top-1/2 left-2 -translate-y-1/2 text-[#876A9A]">
                  <option value="20">+20</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-full space-y-5 px-8 lg:col-span-1 lg:w-76">
            <figure className="relative mx-auto">
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
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="title" className="">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Your title"
            className="border-1 border-white p-2 pl-4"
          />
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="biography" className="">
            Biography
          </label>
          <input
            type="text"
            id="biography"
            placeholder="Your biography"
            className="border-1 border-white p-2 pl-4"
          />
        </div>

        <button className="bg-[#876A9A] px-3 py-2 text-white">
          Save Changes
        </button>
      </form>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Social Profile</h2>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="personal-website" className="">
            Personal website
          </label>
          <div className="relative">
            <input
              type="text"
              id="personal-website"
              placeholder="Personal website or portfolio url"
              className="w-full border-1 border-white p-2 pl-12"
            />
            <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
              <PiGlobeSimple />
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="facebook" className="">
              Facebook
            </label>
            <div className="relative">
              <input
                type="text"
                id="facebook"
                placeholder="Link"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaFacebookF />
              </span>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="instagram" className="">
              Instagram
            </label>
            <div className="relative">
              <input
                type="text"
                id="instagram"
                placeholder="Link"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaInstagram />
              </span>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="linkedin" className="">
              LinkedIn
            </label>
            <div className="relative">
              <input
                type="text"
                id="linkedin"
                placeholder="Link"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaLinkedinIn />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="x" className="">
              X
            </label>
            <div className="relative">
              <input
                type="text"
                id="x"
                placeholder="Link"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaXTwitter />
              </span>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="whatsapp" className="">
              Whatsapp
            </label>
            <div className="relative">
              <input
                type="text"
                id="whatsapp"
                placeholder="Phone number"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaWhatsapp />
              </span>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="youtube" className="">
              Youtube
            </label>
            <div className="relative">
              <input
                type="text"
                id="youtube"
                placeholder="Link"
                className="w-full border-1 border-white p-2 pl-12"
              />
              <span className="absolute top-0 left-0 border-r-1 border-white p-3 text-xl text-[#876A9A]">
                <FaYoutube />
              </span>
            </div>
          </div>
        </div>

        <button className="bg-[#876A9A] px-3 py-2 text-white">
          Save Changes
        </button>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Social Profile</h2>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="current-password">Current Password</label>
          <div className="relative">
            <input
              type="text"
              id="current-password"
              placeholder="Current password"
              className="w-full border-1 border-white p-2 pl-4"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <Eye size={26} /> : <EyeOff size={26} />}
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="new-password">New Password</label>
          <div className="relative">
            <input
              type="text"
              id="new-password"
              placeholder="New password"
              className="w-full border-1 border-white p-2 pl-4"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <Eye size={26} /> : <EyeOff size={26} />}
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="relative">
            <input
              type="text"
              id="confirm-password"
              placeholder="Confirm password"
              className="w-full border-1 border-white p-2 pl-4"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
            >
              {showConfirmedPassword ? <Eye size={26} /> : <EyeOff size={26} />}
            </button>
          </div>
        </div>

        <button className="bg-[#876A9A] px-3 py-2 text-white">
          Save Changes
        </button>
      </div>
    </>
  );
}

export default TeacherSettings;
