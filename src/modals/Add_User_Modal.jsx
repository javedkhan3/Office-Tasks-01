import React, { useState } from "react";
// import axios from "axios";
import { addUser } from "../api/api-service";
import toast from "react-hot-toast";

// ➕ AddUserModal Component
const AddUserModal = ({ isOpen, onClose, refreshUsers, existingUsers }) => {
  // 🔒 Password toggle state
  const [showPassword, setShowPassword] = useState(false);

  // 🟡 Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  // 🖊️ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📨 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // ✅ Prevent duplicate emails
    const emailExists = existingUsers?.some(
      (user) =>
        (user.email?.toLowerCase() || "") === formData.email.toLowerCase()
    );

    if (emailExists) {
      toast.error("⚠️ A user with this email already exists!");
      return;
    }

    // 🆕 Construct new user object
    const newUser = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // 📤 Send user to API`
    try {
      await addUser(newUser); // ✅ Use shared API call
      toast.success("User Added Successfully!");
      refreshUsers(); // 🔄 Refresh user list
      onClose(); // ❌ Close modal
      setFormData({ name: "", email: "", role: "", password: "" }); // 🧹 Reset form
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("❌ Failed to add user");
    }
  };

  // 🚫 Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800 dark:text-gray-200"
      >
        <h2 className="text-xl font-bold mb-4">Add New User</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
          required
        />

        {/* Role Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
          required
        >
          <option value="" disabled className="text-gray-400 dark:text-gray-500">
            -- Select Role --
          </option>
          <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="Full-stack Developer">Full-stack Developer</option>
        </select>

        {/* Password with toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
