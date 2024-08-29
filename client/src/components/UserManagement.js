import React from 'react';
import axios from 'axios';

const UserManagement = ({ user, setUsers }) => {
  const deleteUser = async (email) => {
    try {
      await axios.delete('/api/users/delete', { data: { email } });
      setUsers(prevUsers => prevUsers.filter(u => u.email !== email));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <li>
      {user.name} - {user.email}
      <button onClick={() => deleteUser(user.email)}>Delete</button>
    </li>
  );
};

export default UserManagement;
