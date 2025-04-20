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
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center">
      <div className={`${isPassord && 'relative'} mb-1 w-full`}>
        <label htmlFor={id} className="text-[#7C838A]">
          {label}
        </label>
        <input
          type={showPassword ? 'text' : type}
          id={id}
          className={`${error ? 'border border-red-500' : ''} min-w-full rounded-xl bg-[#b0bac365] p-2 pl-4 outline-none focus:ring focus:ring-blue-200 md:p-4`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={isPassord.toString()}
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
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;
