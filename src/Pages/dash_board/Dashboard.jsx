import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";

import { fetchUsers } from "../../api/api-service";
import DashboardCard from "../../components/DashboardCard";
// import DashBoardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(); // ✅  API call
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // 🧮 Count new signups in last hour
  const emailSet = new Set();
  const newSignupsCount = users.filter((user) => {
    if (!user.createdAt || !user.email) return false;
    const created = new Date(user.createdAt);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (created >= oneHourAgo) {
      const email = user.email.toLowerCase().trim();
      if (!emailSet.has(email)) {
        emailSet.add(email);
        return true;
      }
    }
    return false;
  }).length;

  // 🧮 Count users by role
  const roleCounts = users.reduce((acc, user) => {
    const role = user.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 p-4 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <Loader text="Loading Dashboard..." />
        ) : (
          <>
            {/* 📊 Dashboard Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard title="Total Users" value={users.length} />

              <DashboardCard
                title="New Added Users"
                value={newSignupsCount}
                subtext="(Last 1 Hour )"
              />

              {/* 🎭 Role Cards */}
              {Object.entries(roleCounts).map(([role, count]) => (
                <DashboardCard key={role} title={role} value={count} />
              ))}
            </div>

            {/* ⚡ Quick Actions */}
            <div className="bg-white dark:bg-gray-800  rounded p-6 mt-10 md:w-[48%] lg:w-[32%] pb-8">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">
                Quick Actions
              </h3>

              <Link
                to="/users"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Manage Users
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
