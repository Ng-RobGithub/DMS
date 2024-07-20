//client/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('/api/dashboard');
                setDashboard(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDashboard();
    }, []);

    const handleClick = (orderType) => {
        // Logic to handle clicking on order buttons (new, saved, submitted)
        // Example: Display orders of the selected type
        console.log(orderType, dashboard.orders[orderType]);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {dashboard && (
                <div>
                    <div>
                        <label>Select Account:</label>
                        <select>
                            <option>{dashboard.user}</option>
                        </select>
                    </div>
                    <div>
                        <p>Wallet Ledger Balance: {dashboard.ledgerBalance}</p>
                        <p>Wallet Available Balance: {dashboard.availableBalance}</p>
                    </div>
                    <div>
                        <button onClick={() => handleClick('new')}>Orders (New)</button>
                        <button onClick={() => handleClick('saved')}>Orders (Saved)</button>
                        <button onClick={() => handleClick('submitted')}>Orders (Submitted)</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
