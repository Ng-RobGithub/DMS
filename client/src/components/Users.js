import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from './UserManagement';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <UserManagement key={user.email} user={user} setUsers={setUsers} />
        ))}
      </ul>
    </div>
  );
};

export default Users;

