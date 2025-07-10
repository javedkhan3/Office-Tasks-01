import React, { useEffect, useState } from "react";
import { updateUser } from "../api/api-service"; // Import the updateUser function
import toast from "react-hot-toast";
import Label from "../components/Label";
import Button from "../components/Buttons";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PageHeading from "../components/PageHeading";

const EditUserModal = ({
  isOpen,
  onClose,
  userData,
  refreshUsers,
  existingUsers,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const emailExists = existingUsers?.some(
      (u) =>
        u.email?.toLowerCase() === formData.email.toLowerCase() &&
        u.id !== userData.id
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
        <PageHeading title="Edit User" showBreakLine={true} />

        <div className="space-y-4">
          {/* Name */}
          <div>
            <TextInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            {/*
             */}
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div>
            <Label text="Role" />
            <SelectInput
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={["admin", "user"]}
            />
          </div>

          {/* Password with show/hide */}

          <div className="relative">
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-4 py-2">
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave} className="px-4 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
