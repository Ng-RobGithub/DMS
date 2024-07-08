# Distributor Management System -DMS

A comprehensive mobile application designed to manage distributor operations including daily visits by staff, order generation, order processing, and order fulfillment.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Description

The Distributor Management System is a mobile application that facilitates the management of distributor activities. It captures daily visits by staff, manages distributor order generation, processing, and fulfillment. The application features a dashboard displaying important metrics, a payment module, distributor profiles, order management, reports, wallet statements, product management, a cart for purchases, and support functionalities.

## Features

1. **Dashboard**: Displays wallet balance (ledger and available balance), new orders, saved orders, and submitted orders.
2. **Payment Platform**: Integrates a payment module for processing transactions.
3. **Distributor Profile**: Displays distributor profile pictures and details on the dashboard.
4. **Order Management**: Allows creating, viewing, and managing orders.
5. **Reports**: Generates reports based on order data.
6. **Wallet Statement**: Displays the ledger and available balances.
7. **Products**: Manages product selection, delivery methods, and scheduling.
8. **Cart**: Manages items for purchase and scheduling delivery.
9. **Support and FAQ**: Provides user support and frequently asked questions.
10. **Authentication**: Incorporates One-Time Password (OTP) at login and after scheduling delivery checkout.

## Technologies Used

### Frontend
- **Framework**: React Native
- **State Management**: Redux
- **Navigation**: React Navigation

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication and Security**: JWT for authentication, bcryptjs for password hashing

### Additional Technologies
- **Payment Integration**: Stripe API
- **Deployment and Hosting**: Heroku for the backend, Firebase for the mobile app
- **Project Management**: Trello or Kanban board

## Installation

### Backend
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/distributor-management-system.git
