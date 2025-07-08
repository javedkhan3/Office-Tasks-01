import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { FiMoreVertical } from "react-icons/fi";
import { fetchUsers } from "../api/api-service";
import { userEvents } from "../utils/userEvents";

const DBoardHeader = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const optionsRef = useRef(null);

  // ✅ Load current user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    };

    loadUser();
    userEvents.listen(loadUser);
    return () => userEvents.remove(loadUser);
  }, []);

  // ✅ Fetch users (for notifications)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    getUsers();
    userEvents.listen(getUsers);
    return () => userEvents.remove(getUsers);
  }, []);

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Count new signups in the last 1 hour
  const emailSet = new Set();
  const newSignupsCount = users.filter((u) => {
    if (!u.createdAt || !u.email) return false;
    const created = new Date(u.createdAt);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const email = u.email.toLowerCase().trim();
    if (created >= oneHourAgo && !emailSet.has(email)) {
      emailSet.add(email);
      return true;
    }
    return false;
  }).length;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-full px-4 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        {/* Icons + Menus */}
        <div className="flex items-center space-x-4 relative">
          {/* 🔔 Notification Bell */}
          <div className="relative" >
            <Bell
              className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded p-4 z-50">
                <p className="text-sm font-semibold">Notifications</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>👥 Total users: {users.length}</li>
                  <li>📂 Files updated</li>
                  <li>
                    🆕 user{newSignupsCount !== 1 ? "s" : ""} added:{" "}
                    {newSignupsCount}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700 rounded shadow-md z-50 p-4">
                <Link to="/profile">
                  <div className="mb-2 text-center flex flex-col items-center border rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-95 transition-transform">
                    <img
                      src="https://i.pravatar.cc/100?img=3"
                      alt="Admin"
                      className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-sm hover:scale-105 transition-transform cursor-pointer"
                    />
                    <p className="mt-2 font-semibold text-gray-800 dark:text-white">
                      {user?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-[150px]">
                      {user?.email || "Not Available"}
                    </p>
                  </div>
                </Link>

                <hr className="my-2 mt-4 border-gray-300 dark:border-gray-600" />

                <Link
                  to="/manage-profile"
                  className="block border dark:border-gray-600 w-full rounded text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Manage Profile
                </Link>

                <Link
                  to="/logout"
                  className="flex items-center gap-3 px-6 py-3 text-sm text-red-300 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 rounded transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </div>
            )}
          </div>

          {/* ⋮ Options Menu */}
          <div className="relative" ref={optionsRef}>
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="focus:outline-none"
            >
              <FiMoreVertical className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            {showOptionsMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border dark:border-gray-700 rounded shadow-md z-50">
                <Link
                  to="/users"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Users
                </Link>
                <Link
                  to="/settings"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBoardHeader;
