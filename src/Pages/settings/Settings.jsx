import React, { useContext } from "react";
import ThemeProvider, { ThemeContext } from "../../ThemeContext";
import Button from "../../components/Buttons";
import Label from "../../components/Label";
import PageHeading from "../../components/PageHeading";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className=" bg-gray-100 dark:bg-gray-900  ">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-10">
        <PageHeading title="Settings" showBreakLine={true} />

        {/* <hr className="border-gray-300 dark:border-gray-700 mb-6" /> */}

        <form className="space-y-6">
          {/* Email Notification */}
          <div>
            <Label
              text="Email Notifications"
              htmlFor="email-notifications"
              className=" text-sm"
            />

            <select className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 mt-1">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          {/* Theme Preference */}
          <div>
            <Label text="Theme" htmlFor="theme" className=" text-sm" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 mt-1"
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4 text-right">
            <Button type="submit" className="px-4 py-2">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
