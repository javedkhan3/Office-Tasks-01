import React from "react";
import Label from "./Label"; // adjust the path

const TextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  showLabel = true,
}) => {
  return (
    <div>
      {showLabel && (
        <Label
          text={label}
          htmlFor={name}
          className="text-sm block"
        />
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
      />
    </div>
  );
};

export default TextInput;
