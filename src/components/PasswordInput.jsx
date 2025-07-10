import React, { useState } from "react";
import Label from "./Label"; // adjust the path as needed

const PasswordInput = ({
  label = "Password",
  name,
  value,
  onChange,
  placeholder = "Password",
  showLabel = true, // ✅ NEW: optional control
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {showLabel && <Label text={label} htmlFor={name} />}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2  border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white mt-1"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
