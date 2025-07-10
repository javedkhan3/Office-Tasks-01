
// src/components/Label.jsx
import React from "react";

const Label = ({ text, htmlFor, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium text-sm text-gray-500 dark:text-gray-300 pr-2 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
