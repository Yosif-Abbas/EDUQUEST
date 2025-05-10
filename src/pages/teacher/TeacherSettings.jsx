import { useEffect, useRef, useState } from 'react';

import { LuUpload } from 'react-icons/lu';
import { Eye } from '../../components/Eye';
import { EyeOff } from '../../components/EyeOff';

import { useTeacher } from '../../hooks/useTeacher';
import { useUploadAvatar } from '../../hooks/useUploadAvatar';
import Spinner from '../../components/Spinner';
import { useUpdateStudentSettings } from '../../hooks/useUpdateStudentSettings';

function TeacherSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { teacher = {}, isLoading } = useTeacher();
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const { updateStudent, isLoading: isUpdating } = useUpdateStudentSettings();

  const fileInputRef = useRef(null);

  if (isLoading) {
    <div>
      <isLoading />
    </div>;
  }

  const {
    id: userId,
    image_url: image,
    userTeacher,
    first_name,
    last_name,
    phone_number,
    biography,
    email: teacherEmail,
  } = teacher;

  useEffect(() => {
    if (userTeacher) {
      setTeacherId(userTeacher.id);
      setTitle(userTeacher.title);
    }
  }, [userTeacher]);

  const [preview, setPreview] = useState(image);
  const [file, setFile] = useState(null);

  const [teacherId, setTeacherId] = useState(null);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [phone, setPhone] = useState(phone_number);
  const [bio, setBio] = useState(biography);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState(teacherEmail);

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [errors, setErrors] = useState({});

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatar = () => {
    uploadAvatar({ file, userId }, { onSuccess: setFile(null) });
  };

  function handleUpdateSettings(e) {
    e.preventDefault();

    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format.';
    if (password && password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long.';
    if (password && !confirmPass)
      newErrors.confirmPass = 'Please confirm your password.';
    if (!password && confirmPass)
      newErrors.password = 'Please Enter your password.';
    if (password && confirmPass && password !== confirmPass)
      newErrors.confirmPass = 'Passwords do not match.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const hasChanges =
      email !== teacherEmail ||
      firstName !== first_name ||
      lastName !== last_name ||
      phone !== phone_number ||
      bio !== biography ||
      password !== '';

    if (!email || !firstName || !lastName || !phone) return;

    setPassword('');
    setConfirmPass('');

    if (hasChanges)
      updateStudent({
        id: userId,
        biography: bio,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
      });
    else newErrors.form = 'No changes made to update.';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
      <h2 className="col-span-2 mb-6 text-2xl font-bold">Account Settings</h2>
      <div className="row-start-3 mb-10 lg:row-start-2">
        <form className="" onSubmit={(e) => handleUpdateSettings(e)}>
          <div className="mb-2 flex flex-col gap-1.5">
            <label htmlFor="firstName " className="required">
              Full name
            </label>
            <div className="flex flex-col gap-2 lg:flex-row">
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-1 border-white p-2 pl-4"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-1 border-white p-2 pl-4"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-2 flex flex-col gap-1.5">
            <label htmlFor="email" className="required">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-1 border-white p-2 pl-4"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-2 flex flex-col gap-1.5">
            <label htmlFor="phone" className="required">
              Phone number
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-1 border-white p-2 pl-16"
              />
              <select className="absolute top-1/2 left-0 h-full -translate-y-1/2 pl-2 text-[#876A9A]">
                <option value="20">+20</option>
              </select>
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="mb-2 flex flex-col gap-1.5">
            <label htmlFor="title" className="">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-1 border-white p-2 pl-4"
            />
          </div>

          <div className="mb-4 flex flex-col gap-1.5">
            <label htmlFor="biography" className="">
              Biography
            </label>
            <input
              type="text"
              id="biography"
              placeholder="Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border-1 border-white p-2 pl-4"
            />
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="new-password">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="new-password"
                placeholder="New password"
                className="w-full border-1 border-white p-2 pl-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="confirm-Passord">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                id="confirm-Passord"
                placeholder="Confirm Password"
                className="w-full border-1 border-white p-2 pl-4"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <Eye size={26} /> : <EyeOff size={26} />}
              </button>
            </div>
            {errors.confirmPass && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPass}</p>
            )}
          </div>

          <button className="bg-[#876A9A] px-3 py-2 text-white">
            {isUpdating ? <Spinner size={25} color="white" /> : 'Save Changes'}
          </button>
          {errors.form && (
            <p className="mt-1 text-xs text-red-500">{errors.form}</p>
          )}
        </form>
      </div>

      <div className="mb-4 h-full space-y-5 px-8 lg:col-span-1">
        <figure
          className="relative h-80 w-80 cursor-pointer"
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            src={
              preview
                ? preview
                : 'https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//default-user.jpg'
            }
            alt="Avatar"
            className="h-full w-full object-cover object-top"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUploadImage}
            className="hidden"
          />
          <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 bg-[#0000007c] p-3 text-white">
            <span>
              <LuUpload />
            </span>
            <span className="text-sm">Upload Photo</span>
          </div>
        </figure>
        <p className="text-sm font-normal text-[#6E7485]">
          Image size should be under 1MB and image ration needs to be 1:1
        </p>
        <button
          className="bg-[#876A9A] px-3 py-2 text-white"
          onClick={handleUploadAvatar}
          disabled={isUploadingAvatar || !file}
          type="button"
        >
          {isUploadingAvatar ? (
            <Spinner size={25} color="white" />
          ) : (
            'Update photo'
          )}
        </button>
      </div>
    </div>
  );
}

export default TeacherSettings;

{
  /* <div className="mb-10">
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
      </div> */
}
