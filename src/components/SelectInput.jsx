import React from "react";
import Label from "./Label"; // adjust path as needed

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  showLabel = true,
}) => {
  return (
    <div>
      {showLabel && (
        <Label text={label} htmlFor={name} className="text-sm block" />
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mb-2 block w-full px-2 py-2   dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
