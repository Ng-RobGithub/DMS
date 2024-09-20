import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import logo from '../assets/NgRob.png'; // Ensure this path is correct
import api from '../api'; // Import the configured api instance

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
  const [totalWalletBalance, setTotalWalletBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [orderCounts, setOrderCounts] = useState({
    newOrders: 0,
    savedOrders: 0,
    pendingOrders: 0,
    submittedOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [fullName, setFullName] = useState(''); // State to hold the user's name

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user info
        const userResponse = await api.get('/user'); // Use the api utility for authenticated request
        console.log("User Response:", userResponse); // Add this log
        setFullName(userResponse.data.fullName); // Set the user's name from the response

        // Fetch wallet balance
        const walletResponse = await api.get('/dashboard'); // Adjust endpoint as needed
        console.log("Wallet Response:", walletResponse); // Add this log
        setTotalWalletBalance(walletResponse.data.totalWalletBalance);
        setAvailableBalance(walletResponse.data.availableBalance);

        // Fetch order counts
        const ordersResponse = await api.get('/orders/counts');
        console.log("Order Counts Response:", ordersResponse); // Add this log
        setOrderCounts(ordersResponse.data);

        // Fetch order data
        const ordersDataResponse = await api.get('/orders');
        console.log("Orders Data Response:", ordersDataResponse); // Add this log
        const ordersDataJson = ordersDataResponse.data;
        const ordersByQuarter = [0, 0, 0, 0]; // Initialize array for four quarters

        ordersDataJson.forEach(order => {
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

        // Fetch recent orders
        const recentOrdersResponse = await api.get('/orders/recent');
        console.log("Recent Orders Response:", recentOrdersResponse); // Add this log
        setRecentOrders(recentOrdersResponse.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        alert('Failed to load dashboard data.');
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome back, {fullName}!</h1>
        <p>Today is {new Date().toLocaleDateString()}</p>
      </section>

      {/* Wallet Balance Banner */}
      <section className="wallet-banner">
        <div className="banner-item">
          <h2>Total Wallet Balance</h2>
          <p>NGN{totalWalletBalance.toLocaleString()}</p>
        </div>
        <div className="banner-item">
          <h2>Available Balance</h2>
          <p>NGN{availableBalance.toLocaleString()}</p>
        </div>
      </section>

      {/* Order Status Buttons */}
      <section className="order-status-buttons">
        <Link to="/orders/new" className="order-btn">
          New Orders <span className="badge">{orderCounts.newOrders}</span>
        </Link>
        <Link to="/orders/saved" className="order-btn">
          Saved Orders <span className="badge">{orderCounts.savedOrders}</span>
        </Link>
        <Link to="/orders/pending" className="order-btn">
          Pending Orders <span className="badge">{orderCounts.pendingOrders}</span>
        </Link>
        <Link to="/orders/submitted" className="order-btn">
          Submitted Orders <span className="badge">{orderCounts.submittedOrders}</span>
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
            {recentOrders.length > 0 ? (
              recentOrders.map(order => (
                <tr key={order.orderNumber}>
                  <td>{order.orderNumber}</td>
                  <td>{order.status}</td>
                  <td>{`NGN${order.totalAmount.toLocaleString()}`}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No recent orders available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Support and FAQs */}
      <section className="support-faq">
        <Link to="/support">Support</Link>
        <Link to="/faq">FAQ</Link>
      </section>
    </div>
  );
};

export default Dashboard;
