import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ user = {}, updateUserProfile }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    photo: user.photo || ''
  });
  const [file, setFile] = useState(null);

  const { name, photo } = formData;

  useEffect(() => {
    // Only update state if the user data actually changes
    if (user.name !== formData.name || user.photo !== formData.photo) {
      setFormData({
        name: user.name || '',
        photo: user.photo || ''
      });
    }
  }, [user.name, user.photo, formData.name, formData.photo]); // Added formData dependencies

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', name);
      if (file) {
        formDataToSubmit.append('photo', file);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      };

      const response = await axios.post('/api/users/updateProfile', formDataToSubmit, config);
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={onFileChange}
          />
          {photo && (
            <img src={photo} alt="Profile Preview" className="profile-preview" />
          )}
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
