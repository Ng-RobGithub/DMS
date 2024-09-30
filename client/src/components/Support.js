import React, { useState } from 'react';
import './Support.css'; // Ensure you create a Support.css file for styling

const Support = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>Support Center</h1>
        <p>We're here to help you with any questions or issues you may have. Choose a category below to get started.</p>
      </div>

      <div className="support-tabs">
        <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>General</button>
        <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders & Delivery</button>
        <button onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>Payments & Wallet</button>
        <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>Account Management</button>
        <button onClick={() => setActiveTab('technical')} className={activeTab === 'technical' ? 'active' : ''}>Technical Support</button>
        <button onClick={() => setActiveTab('Cake Bag Recovery')} className={activeTab === 'Cake Bag Recovery' ? 'active' : ''}>Cake Bag Recovery</button>

        <button onClick={() => setActiveTab('faq')} className={activeTab === 'faq' ? 'active' : ''}>FAQ</button>
      </div>

      <div className="support-content">
        {activeTab === 'general' && (
          <div className="tab-content">
            <h2>General Support</h2>
            <p>Find general guidance on how to use the Distributor Management System effectively.</p>
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="tab-content">
            <h2>Orders & Delivery</h2>
            <p>Need help with placing orders, modifying delivery schedules, or tracking your shipments?</p>
          </div>
        )}
        {activeTab === 'payments' && (
          <div className="tab-content">
            <h2>Payments & Wallet</h2>
            <p>Get assistance with payments, refunds, and wallet balance management.</p>
          </div>
        )}
        {activeTab === 'account' && (
          <div className="tab-content">
            <h2>Account Management</h2>
            <p>Manage your profile, account settings, and permissions.</p>
          </div>
        )}
        {activeTab === 'technical' && (
          <div className="tab-content">
            <h2>Technical Support</h2>
            <p>Facing technical difficulties? We're here to help with system errors, login issues, and more.</p>
          </div>
        )}
        {activeTab === 'faq' && (
          <div className="tab-content">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to the most commonly asked questions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
