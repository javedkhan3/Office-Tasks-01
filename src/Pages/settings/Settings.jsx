import React, { useContext } from "react";
import ThemeProvider, { ThemeContext } from "../../ThemeContext";
// import { ThemeContext } from "../../ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className=" bg-gray-100 dark:bg-gray-900  ">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Settings
        </h1>

        <hr className="border-gray-300 dark:border-gray-700 mb-6" />

        <form className="space-y-6">
          {/* Email Notification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Notifications
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          {/* Theme Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
