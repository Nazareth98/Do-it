import React from "react";

const CustomSelect = ({ label, options, onChange, register, name }) => {
  return (
    <div className="max-w-sm">
      <select
        className="bg-gray-800 border-2 border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        onChange={onChange}
        {...register(name)}
      >
        <option value="">{label}</option>
        {options?.map((option) => (
          <option
            key={option.value || option.id}
            value={option.value || option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
