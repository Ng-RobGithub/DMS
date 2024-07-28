// client/src/components/Profile.js
import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ user, updateUserProfile }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    photo: user.photo
  });

  const { name, photo } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      };

      const response = await axios.post('/api/users/updateProfile', formData, config);
      if (response.data.success) {
        updateUserProfile(formData);
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data || error.message);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Photo URL</label>
          <input
            type="text"
            name="photo"
            value={photo}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
