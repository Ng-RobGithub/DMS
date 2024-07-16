// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import WalletStatement from './components/WalletStatement';
import Products from './components/Products';
import Reports from './components/Reports';
import Support from './components/Support';
import FAQ from './components/FAQ';
import Logout from './components/Logout';
import Menus from './components/Menus'; // Import the Menus component

const user = {
  name: 'John Doe',
  photo: 'path/to/profile/photo.jpg' // Replace with actual path to the profile photo
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Menus user={user} /> {/* Include the Menus component */}
        <div className="main-content">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/wallet-statement" component={WalletStatement} />
            <Route path="/products" component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/reports" component={Reports} />
            <Route path="/support" component={Support} />
            <Route path="/faq" component={FAQ} />
            <Route path="/logout" component={Logout} />
            {/* Define other routes here */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
