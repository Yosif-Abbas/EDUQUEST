function Selector({ id, label, options, onChange }) {
  function handleSelected(e) {
    const value = +e.target.value;
    onChange(value);
  }

  return (
    <div className="relative w-fit">
      {label && (
        <label htmlFor={id} className="mr-2 hidden sm:inline-block md:mr-4">
          {label}
        </label>
      )}
      <select
        id={id}
        className="form-select h-[48px] w-30 border border-[#E9EAF0] bg-white px-2.5 py-2.5 text-base font-normal text-[#4E5566] md:w-45"
        onChange={(e) => handleSelected(e)}
      >
        {options.map((option) => {
          const key = Object.keys(option)[0];
          return (
            <option value={key} key={key}>
              {option[key]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Selector;
