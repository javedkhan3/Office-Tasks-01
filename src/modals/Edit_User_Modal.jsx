import React, { useEffect, useState } from "react";
import { updateUser } from "../api/api-service"; // Import the updateUser function
import toast from "react-hot-toast";

const EditUserModal = ({ isOpen, onClose, userData, refreshUsers, existingUsers }) => {

  const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);
  // useEffect(() => {
  //   if (userData) {
  //     setFormData({
  //       name: userData.name || "",
  //       email: userData.email || "",
  //       role: userData.role || "",
  //       password: userData.password || "",
  //     });
  //   }
  // }, [userData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSave = async () => {
    const emailExists = existingUsers?.some(
      (u) => u.email?.toLowerCase() === formData.email.toLowerCase() && u.id !== userData.id
    );

   if (emailExists) return toast.error("⚠️ Email already exists!");

    try {
      await updateUser(userData.id, formData);
      toast.success("✅ User updated!");
      refreshUsers?.();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-lg w-full max-w-md shadow-xl border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select Role</option>
                       <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="Full-stack Developer">Full-stack Developer</option>
            </select>
          </div>

          {/* Password with show/hide */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
