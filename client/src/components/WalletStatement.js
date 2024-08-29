import React, { useEffect, useState } from 'react';
import api from '../api'; // Import the api instance
import './WalletStatement.css';

const WalletStatement = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    // Fetch the balance data from the API
    const fetchBalances = async () => {
      try {
        const response = await api.get('/account/balances');
        setTotalBalance(response.data.totalBalance);
        setAvailableBalance(response.data.availableBalance);
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
  }, []);

  return (
    <div className="wallet-statement">
      <div className="banner">
        <h2>Account Balances</h2>
        <div className="balance-info">
          <div className="balance-item">
            <span className="label">Total Balance:</span>
            <span className="amount">${totalBalance.toFixed(2)}</span>
          </div>
          <div className="balance-item">
            <span className="label">Available Balance:</span>
            <span className="amount">${availableBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Other WalletStatement content here */}
    </div>
  );
};

export default WalletStatement;
