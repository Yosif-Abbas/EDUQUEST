import { Eye, EyeOff } from 'lucide-react';
import { LuUpload } from 'react-icons/lu';

import { useRef, useState } from 'react';

import Spinner from '../../components/Spinner';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useUploadAvatar } from '../../hooks/useUploadAvatar';

function StudentSettings() {
  const {
    currentUser: {
      id: userId,
      first_name,
      last_name,
      email: userEmail,
      phone_number,
      biography,
      image_url,
    },
    isLoading,
  } = useCurrentUser();

  const [preview, setPreview] = useState(image_url);
  const [file, setFile] = useState(null);

  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();

  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(phone_number);
  const [bio, setBio] = useState(biography);
  const [password, setPassword] = useState('');

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

  const handleUpdateSettings = (e) => {
    e.preventDefault();

    console.log(userId);
    uploadAvatar({ file, userId });
  };

  return (
    <section className="space-y-6">
      <h2 className="ml-6 text-2xl font-medium">Account settings</h2>

      <div className="">
        <form
          className="grid-col-1 grid gap-20 p-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-20"
          onSubmit={handleUpdateSettings}
        >
          <div className="space-y-5 lg:col-span-1">
            <figure
              className="relative h-110"
              onClick={handleUploadClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <img
                  src={
                    preview
                      ? preview
                      : 'https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//default-user.jpg'
                  }
                  alt="Avatar"
                  className="aspect-square h-110 object-cover object-top"
                />
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUploadImage}
                className="hidden"
              />
              <div
                className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 bg-[#0000007c] p-3 text-white"
                onClick={(e) => handleUploadImage(e)}
              >
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

          <div className="space-y-5 lg:col-span-2">
            <div>
              <label className="mb-1 block text-sm">Full Name</label>
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
                <input
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
                  required
                />
                <input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">Phone Number</label>
              <input
                placeholder="Enter your phone number"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Email</label>
              <input
                placeholder="Email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Biography</label>
              <input
                placeholder="Your tittle, proffesion or small biography"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">New Password</label>
              <div className="relative">
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
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
          </div>
          <button className="bg-L6 w-fit px-6 py-3 text-white">
            {isUploadingAvatar ? (
              <Spinner size={25} color="white" />
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default StudentSettings;
