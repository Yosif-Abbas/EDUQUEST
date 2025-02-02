import { useState } from 'react';
import { EyeOff } from './EyeOff';
import { Eye } from './Eye';

function InputField({ isPassord = false, placeholder, id, label }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${isPassord && 'relative'} w-full`}>
      <label htmlFor={id} className="ml-2 text-[#7C838A]">
        {label}
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        className="relative mt-2 min-w-full rounded-2xl bg-[#b0bac365] px-8 py-4 focus:ring focus:ring-blue-200"
        placeholder={placeholder}
      />
      {isPassord && (
        <button
          type="button"
          className="absolute top-11/16 right-5 flex -translate-y-1/2 cursor-pointer items-center text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
        </button>
      )}
    </div>
  );
}

export default InputField;
