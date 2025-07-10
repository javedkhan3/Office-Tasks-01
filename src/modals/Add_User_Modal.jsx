import React, { useState } from "react";
// import axios from "axios";
import { addUser } from "../api/api-service";
import toast from "react-hot-toast";
import { userEvents } from "../utils/userEvents";
import Button from "../components/Buttons";
import PasswordInput from "../components/PasswordInput";
import SelectInput from "../components/SelectInput";
import PageHeading from "../components/PageHeading";

// ➕ AddUserModal Component
const AddUserModal = ({ isOpen, onClose, existingUsers }) => {
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
      userEvents.reload();
      toast.success("User Added Successfully!");
      userEvents.reload(); // 🔁 Trigger global reload
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
       <PageHeading title="Add User" showBreakLine={true} />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 pl-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2  pl-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded"
          required
        />

        {/* Role Dropdown */}
       
        <SelectInput  name="role" value={formData.role} onChange={handleChange} options={['Front-end Developer', 'Back-end Developer', 'Full-stack Developer']}/>

        {/* Password with toggle */}
        <div className="relative mb-4">
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            showLabel={false}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="danger"
            onClick={onClose}
            className="py-2 px-4"
          >
            Cancel
          </Button>
          <Button type="submit" className="p-2 px-4">
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
