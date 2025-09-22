import { useState } from 'react';
import { EyeOff } from './EyeOff';
import { Eye } from './Eye';

function InputField({
  isPassword = false,
  placeholder,
  id,
  type = 'text',
  value,
  onChange,
  disabled,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center">
      <div className={`${isPassword && 'relative'} mb-1 w-full`}>
        <input
          type={showPassword ? 'text' : type}
          id={id}
          className={`${error ? 'border border-red-400' : ''} min-w-full rounded-lg bg-[#b0bac365] p-2 pl-4 outline-none focus:ring focus:ring-blue-200 md:p-3 md:pl-4`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={isPassword.toString()}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-3 flex -translate-y-[50%] cursor-pointer items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default InputField;
