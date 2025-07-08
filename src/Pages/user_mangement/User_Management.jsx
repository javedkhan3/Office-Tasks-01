import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../../api/api-service";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
// import { GiDuration } from "react-icons/gi";
import EditUserModal from "../../modals/Edit_User_Modal";
import AddUserModal from "../../modals/Add_User_Modal";
import UsersTable from "./Users_Table";
import { userEvents } from "../../utils/userEvents";
import Button from "../../components/Buttons";
// import { userEvents } from "../../utils/userEvents";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch All Users
  const loadeUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers(); // ✅ from apiService
      setUsers(res);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  loadeUsers(); // initial fetch

  // 🔁 Listen for global reload trigger
  const handleReload = () => loadeUsers();
  userEvents.listen(handleReload);

  // 🧹 Clean up listener on unmount
  return () => userEvents.remove(handleReload);
}, []);



  // ✅ Delete Handler
  const handleDelete = async (userId) => {
    if (userId === currentUser?.id) {
      toast.error("⚠️ You cannot delete your own account.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(userId); // ✅ from apiService
      toast.success("🗑️ User deleted successfully!", {
        duration: 2000, // 2 seconds
      });
      loadeUsers(); // ✅ refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  // ✅ Edit Handler
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // ✅ Search Filter
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded shadow px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button onClick={() => setShowAddModal(true)} variant="secondary">Add User</Button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded w-full sm:w-64"
        />

        {/* Loader or Table */}
        {loading ? (
          <Loader />
        ) : (
          // <<<<<<<<<<<<     Users Table  >>>>>>>>>>>>>>>>>>>
          <div className="overflow-x-auto">
            <UsersTable
              users={filteredUsers}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        userData={selectedUser}
        refreshUsers={loadeUsers}
        existingUsers={users}
      />
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        refreshUsers={loadeUsers}
         reloadUsers={users}
        existingUsers={users}
      />
    </div>
  );
};

export default UserManagement;
