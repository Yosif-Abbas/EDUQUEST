import { useState } from 'react';
import { EyeOff } from './EyeOff';
import { Eye } from './Eye';

function InputField({
  isPassord = false,
  placeholder,
  id,
  label,
  type = 'text',
  value,
  onChange,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${isPassord && 'relative'} mb-3 w-full`}>
      <label htmlFor={id} className="text-[#7C838A]">
        {label}
      </label>
      <input
        type={showPassword ? 'text' : type}
        id={id}
        className="min-w-full rounded-xl bg-[#b0bac365] p-2 pl-4 focus:ring focus:ring-blue-200 md:p-4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {isPassord && (
        <button
          type="button"
          className="absolute top-11/17 right-2 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
        </button>
      )}
    </div>
  );
}

export default InputField;
