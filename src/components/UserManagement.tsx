import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = (name: string, role: string) => {
    setUsers([...users, { id: users.length + 1, name, role }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        {/* Add form to add user */}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 