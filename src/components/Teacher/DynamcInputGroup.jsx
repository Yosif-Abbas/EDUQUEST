import { GoPlus } from 'react-icons/go';
import { X } from 'lucide-react';

const DynamicInputGroup = ({
  title,
  name,
  items,
  onAdd,
  onRemove,
  onChange,
  datalistId,
  datalistOptions = [],
  maxItems = 10,
  placeholder = 'Enter text...',
  isRequired = true,
  error,
}) => {
  return (
    <div>
      <h2 className="mb-2 text-lg">
        <label htmlFor={`${title}-0`} className={isRequired ? 'required' : ''}>
          {title} ( {items.length} )
        </label>
        {maxItems && (
          <span className="ml-2 text-xs font-normal text-gray-600">
            max {maxItems}
          </span>
        )}

        {error && (
          <span className="ml-2 text-xs font-normal text-red-500">{error}</span>
        )}
      </h2>

      {items.map((item, index) => (
        <div key={index} className="mb-4 flex items-center gap-1.5">
          <label htmlFor={`${title}-${index}`} className="px-2">
            {String(index + 1).padStart(2, '0')}
          </label>
          <input
            id={`${title}-${index}`}
            list={datalistId}
            placeholder={placeholder}
            value={item}
            onChange={(e) => onChange(e.target.value, index, name)}
            className={`grow border-1 ${error ? 'border-red-500' : 'border-white'} p-2 pl-4`}
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index, name)}
              className="px-2"
            >
              <X color="#C70000" />
            </button>
          )}
        </div>
      ))}

      {datalistId && (
        <datalist id={datalistId}>
          {datalistOptions.map((option, i) => (
            <option key={i} value={option} />
          ))}
        </datalist>
      )}

      {items.length < maxItems && (
        <button
          type="button"
          onClick={() => onAdd(name)}
          className="text-pinky-violet mb-4 flex items-center gap-1"
        >
          <GoPlus />
          <span>Add new</span>
        </button>
      )}
    </div>
  );
};

export default DynamicInputGroup;
