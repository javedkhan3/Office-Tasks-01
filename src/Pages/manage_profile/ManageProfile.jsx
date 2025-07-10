import React, {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "../../api/api-service";
import { userEvents } from "../../utils/userEvents";
import Label from "../../components/Label";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import Button from "../../components/Buttons";

const ManageProfile = () => {
  const [user, setUser] = useState(null); // 🔹 Authenticated user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // ⏳ Loading state for save button
  const [message, setMessage] = useState(""); // ℹ️ Feedback message to user

  // ✅ Load user data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const userObj = JSON.parse(stored);
      setUser(userObj);

      // Pre-fill form with stored user data
      setFormData({
        name: userObj.name,
        email: userObj.email,
        role: userObj.role || "User",
        password: userObj.password || "",
      });
    }
  }, []);

  // 🔁 Update form fields on user input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 💾 Save updated profile
  const handleSave = async () => {
    if (!user?.id) return setMessage("User ID not found.");

    if (!formData.name || !formData.email) {
      setMessage("Name and email are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Call centralized updateUser API
      const res = await updateUser(user.id, formData);

      // 🧠 Sync localStorage with updated user
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);

      // 🔁 Trigger global user reload
      userEvents.reload();

      toast.success("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("❌ Error updating profile.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-4">
          Edit Profile
        </h1>

        <div className="space-y-6">
          {/* Name */}
          {/* <div>
            <Label text="Full Name" htmlFor="name" className=" text-sm block" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
            />
          </div> */}
          <TextInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Email */}
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* SelectOptions  */}
          <SelectInput
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              "Front-end Developer",
              "Back-end Developer",
              "Full-stack Developer",
            ]}
          />

          {/* Password */}
          <div>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <div className="text-right">
            {message && (
              <p
                className={`mb-2 text-sm ${
                  message.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <Button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
