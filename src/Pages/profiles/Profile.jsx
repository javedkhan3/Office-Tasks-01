import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setTimeout(() => {
        setUser(JSON.parse(storedUser));
      }, 1000); // Simulate loading delay (optional)
    }
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b dark:border-gray-600 pb-4">
          My Profile
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-200 text-base">
          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <label className="font-medium text-gray-500 dark:text-gray-300 pr-2">
              Full Name:
            </label>
            <span className="mt-1 sm:mt-0 font-semibold text-gray-900 dark:text-white">
              {user.name}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <label className="font-medium text-gray-500 dark:text-gray-300 pr-2">
              Email:
            </label>
            <span className="mt-1 sm:mt-0 font-semibold text-gray-900 dark:text-white">
              {user.email}
            </span>
          </div>

          {/* Role */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <label className="font-medium text-gray-500 dark:text-gray-300 pr-2">
              Role:
            </label>
            <span className="mt-1 sm:mt-0 font-semibold text-gray-900 dark:text-white">
              {user.role || "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
