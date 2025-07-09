import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  to = null,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "rounded font-medium focus:outline-none transition inline-block text-center";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    delete: "text-red-600 hover:underline",
    edit: "text-blue-600 hover:underline",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  }`;


//   if to is passed than return the childern and link
  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;
