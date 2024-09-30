// src/WalletContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [totalWalletBalance, setTotalWalletBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await api.get('/wallet');
        setTotalWalletBalance(response.data.totalWalletBalance);
        setAvailableBalance(response.data.availableBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, []);

  return (
    <WalletContext.Provider
      value={{ totalWalletBalance, availableBalance, setAvailableBalance }}
    >
      {children}
    </WalletContext.Provider>
  );
};
