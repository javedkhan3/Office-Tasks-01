import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🧹 Clear login data
    localStorage.removeItem("user");



    // ⏳ Redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login");
toast.success("Logout successful!");

    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className=" flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          You have been logged out
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Redirecting to login...
        </p>
      </div>
    </div>
  );
};

export default Logout;
