import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Label from "../../components/Label";
import PageHeading from "../../components/PageHeading";

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
      {/* heading  */}
        <PageHeading title="My Profile" showBreakLine={true}/>

        <div className="space-y-6 text-gray-700 dark:text-gray-200 text-base">
          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <Label text="Full Name:" />
            <span className="mt-1 sm:mt-0 font-semibold text-gray-900 dark:text-white">
              {user.name}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <Label text="Email:" />
            <span className="mt-1 sm:mt-0 font-semibold text-gray-900 dark:text-white">
              {user.email}
            </span>
          </div>

          {/* Role */}
          <div className="flex flex-col sm:flex-row sm:items-center  border dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-700">
            <Label text="Role:" />
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
