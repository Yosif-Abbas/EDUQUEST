import { Eye, EyeOff } from 'lucide-react';
import { LuUpload } from 'react-icons/lu';

import { useRef, useState } from 'react';

import Spinner from '../../components/Spinner';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useUploadAvatar } from '../../hooks/useUploadAvatar';
import { useUpdateStudentSettings } from '../../hooks/useUpdateStudentSettings';

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

  const { updateStudent, isLoading: isUpdating } = useUpdateStudentSettings();

  const [preview, setPreview] = useState(image_url);
  const [file, setFile] = useState(null);

  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();

  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(phone_number);
  const [bio, setBio] = useState(biography);

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [errors, setErrors] = useState({});

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
      email !== userEmail ||
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

  return (
    <section className="space-y-6 pb-10">
      <h2 className="ml-6 text-2xl font-medium">Account settings</h2>

      <div className="flex flex-col gap-y-10 md:flex-row md:gap-10 lg:gap-20">
        <div className="flex flex-col items-start">
          <figure
            className="relative h-110 w-110 cursor-pointer md:h-80 md:w-80 lg:h-110 lg:w-110"
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
                className="aspect-square h-110 w-110 object-cover object-top md:h-80 md:w-80 lg:h-110 lg:w-110"
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

          <button
            className={`mt-4 w-fit px-6 py-3 ${isUploadingAvatar || !file ? 'bg-l7 text-l4 cursor-not-allowed' : 'bg-l6 text-white'}`}
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

        <div className="w-full">
          <form className="" onSubmit={handleUpdateSettings}>
            <div className="max-w-180 space-y-5 lg:col-span-2">
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
                  placeholder="Your tittle, proffesion or small biography "
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Confirm Password</label>
                <div className="relative">
                  <input
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    type={showConfirmPass ? 'text' : 'password'}
                    className="w-full border-1 border-white px-4 py-3 placeholder:font-normal"
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPass}
                  </p>
                )}
              </div>
            </div>

            <button
              className={`col-start-2 mt-4 w-fit cursor-pointer bg-[#ff6636] px-6 py-3 text-white ${isUpdating ? 'bg-l7 text-l4 cursor-not-allowed' : 'bg-l6 text-white'}`}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Spinner size={25} color="white" />
              ) : (
                'Save Changes'
              )}
            </button>
            {errors.form && (
              <p className="mt-1 text-sm text-red-500">{errors.form}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default StudentSettings;
