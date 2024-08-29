import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import logo from '../assets/NgRob1.png'; // Ensure this path is correct

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState({
    labels: ['Jan-Feb-Mar', 'Apr-May-Jun', 'Jul-Aug-Sep', 'Oct-Nov-Dec'],
    datasets: [
      {
        label: 'Total Orders Raised',
        data: [0, 0, 0, 0], // Initial placeholder data
        backgroundColor: '#4caf50',
      },
    ],
  });

  useEffect(() => {
    // Fetch order data when the component mounts
    fetch('/api/orders')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        const ordersByQuarter = [0, 0, 0, 0]; // Initialize array for four quarters

        data.forEach(order => {
          const orderDate = new Date(order.date);
          const month = orderDate.getMonth() + 1; // getMonth() is zero-indexed

          if (month >= 1 && month <= 3) {
            ordersByQuarter[0]++;
          } else if (month >= 4 && month <= 6) {
            ordersByQuarter[1]++;
          } else if (month >= 7 && month <= 9) {
            ordersByQuarter[2]++;
          } else if (month >= 10 && month <= 12) {
            ordersByQuarter[3]++;
          }
        });

        setPerformanceData({
          labels: ['Jan-Feb-Mar', 'Apr-May-Jun', 'Jul-Aug-Sep', 'Oct-Nov-Dec'],
          datasets: [
            {
              label: 'Total Orders Raised',
              data: ordersByQuarter, // Use the calculated data
              backgroundColor: '#4caf50',
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome back, John Doe!</h1>
        <p>Today is {new Date().toLocaleDateString()}</p>
      </section>

      {/* Wallet Balance Banner */}
      <section className="wallet-banner">
        <div className="banner-item">
          <h2>Total Wallet Balance</h2>
          <p>$5,000</p>
        </div>
        <div className="banner-item">
          <h2>Available Balance</h2>
          <p>$3,500</p>
        </div>
      </section>

      {/* Order Status Buttons */}
      <section className="order-status-buttons">
        <Link to="/orders/new" className="order-btn">
          New Orders <span className="badge">5</span>
        </Link>
        <Link to="/orders/saved" className="order-btn">
          Saved Orders <span className="badge">3</span>
        </Link>
        <Link to="/orders/pending" className="order-btn">
          Pending Orders <span className="badge">2</span>
        </Link>
        <Link to="/orders/submitted" className="order-btn">
          Submitted Orders <span className="badge">4</span>
        </Link>
      </section>

      {/* Distributor Performance Histogram */}
      <section className="performance-chart">
        <h2>Distributor Performance Year-To-Date</h2>
        <Bar data={performanceData} />
      </section>

      {/* Order Summary */}
      <section className="order-summary">
        <h2>Recent Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>Submitted</td>
              <td>$2,000</td>
              <td>08/23/2024</td>
            </tr>
            <tr>
              <td>12344</td>
              <td>Saved</td>
              <td>$1,500</td>
              <td>08/22/2024</td>
            </tr>
            <tr>
              <td>12343</td>
              <td>Pending</td>
              <td>$3,000</td>
              <td>08/21/2024</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Notifications */}
      <section className="notifications-section">
        <h2>Notifications</h2>
        <ul className="notifications-list">
          <li>New product launch - Product X now available!</li>
          <li>System maintenance scheduled for 08/25/2024.</li>
          <li>New features added to the DMS platform.</li>
        </ul>
      </section>

      {/* Activity Feed */}
      <section className="activity-feed">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          <li>Order #12345 submitted on 08/23/2024</li>
          <li>Wallet topped up with $1,500 on 08/22/2024</li>
          <li>Order #12343 updated on 08/21/2024</li>
        </ul>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <h2>Need Help?</h2>
        <div className="support-links">
          <Link to="/support">Contact Support</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
