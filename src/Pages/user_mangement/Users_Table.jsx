import React from "react";
import Button from "../../components/Buttons";

const UsersTable = ({ users, handleEdit, handleDelete, currentUser }) => {
  return (
    <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded">
      <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white text-sm">
        <tr>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Email</th>
          <th className="px-4 py-3 text-left">Role</th>
          <th className="px-4 py-3 text-left">Password</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {users.map((user) => (
          <tr key={user.id} className="border-t dark:border-gray-700">
            <td className="px-4 py-3">{user.name}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3">{user.role}</td>
            <td className="px-4 py-3">{user.password}</td>
            <td className="px-4 py-3 space-x-2">
              <Button
                variant="edit"
                onClick={() => handleEdit(user)}
                disabled={user.id === currentUser?.id}
                type="button"
              >
                Edit
              </Button>
              <Button
                variant="delete"
                onClick={() => handleDelete(user.id)}
                disabled={user.id === currentUser?.id}
                type="button"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
