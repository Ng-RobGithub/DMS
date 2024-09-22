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
 
  // const [recentOrders, setRecentOrders] = useState([]);
  const [fullName, setFullName] = useState(''); // State to hold the user's name
  const [order, setOrder] = useState([]); // State to hold the user's name

  // check pending orders
  const pending = order?.filter(order => order?.status === "Pending");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await api.get('/users/profile');
        setFullName(userResponse.data.fullName);
  
        const walletResponse = await api.get('/wallet');
        setTotalWalletBalance(walletResponse.data.totalWalletBalance);
        setAvailableBalance(walletResponse.data.availableBalance);
  
        const ordersDataResponse = await api.get('/orders');
        const orders = ordersDataResponse.data;
        setOrder(orders); // Set the full list of orders
  
        // Calculate the number of orders for each quarter based on paymentDate
        const quarterlyOrders = [0, 0, 0, 0]; // Array to hold counts for each quarter
  
        orders.forEach(order => {
          const paymentDate = new Date(order.paymentDate); // Using paymentDate to calculate the quarter
          const month = paymentDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January, so +1)
  
          if (month >= 1 && month <= 3) {
            quarterlyOrders[0]++; // Jan-Feb-Mar
          } else if (month >= 4 && month <= 6) {
            quarterlyOrders[1]++; // Apr-May-Jun
          } else if (month >= 7 && month <= 9) {
            quarterlyOrders[2]++; // Jul-Aug-Sep
          } else if (month >= 10 && month <= 12) {
            quarterlyOrders[3]++; // Oct-Nov-Dec
          }
        });
  
        // Update the chart data with calculated quarterly order counts
        setPerformanceData({
          labels: ['Jan-Feb-Mar', 'Apr-May-Jun', 'Jul-Aug-Sep', 'Oct-Nov-Dec'],
          datasets: [
            {
              label: 'Total Orders Raised',
              data: quarterlyOrders, // Use the calculated quarterly data
              backgroundColor: '#4caf50',
            },
          ],
        });
  
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, []);
   
  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome back, {fullName ?? "John Doe"}!</h1>
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
          New Orders <span className="badge">0</span>
        </Link>
        <Link to="/orders/saved" className="order-btn">
          Saved Orders <span className="badge">0</span>
        </Link>
        <Link to="/orders/pending" className="order-btn">
          Pending Orders <span className="badge">{pending?.length}</span>
        </Link>
        <Link to="/orders/submitted" className="order-btn">
          Submitted Orders <span className="badge">{order?.length ?? 0}</span>
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
          {/* <tbody>
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
          </tbody> */}
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
