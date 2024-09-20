import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Optionally, you can also clear other session data or reset application state here

    // Redirect to the login page or another part of the application
    navigate('/login'); // Adjust the route based on your application's routing setup
  }, [navigate]);

  return (
    <div>
      <h2>Logout</h2>
      <p>You have been logged out.</p>
    </div>
  );
};

export default Logout;
