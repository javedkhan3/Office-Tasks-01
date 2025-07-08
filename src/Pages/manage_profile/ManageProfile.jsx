import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "../../api/api-service";
import { userEvents } from "../../utils/userEvents";

const ManageProfile = () => {
  const [user, setUser] = useState(null); // 🔹 Authenticated user
  const [showPassword, setShowPassword] = useState(false); // 🔒 Toggle password visibility
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
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
            >
              <option value="Front-end Developer">Front-end Developer</option>
              <option value="Back-end Developer">Back-end Developer</option>
              <option value="Full-stack Developer">Full-stack Developer</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
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
            <button
              onClick={handleSave}
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
