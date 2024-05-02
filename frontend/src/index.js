import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'path-browserify';

import App from './App';
import { UserProvider } from './userContext/UserContext';
import Login from './page/login/page';
import Register from './page/register/page';
import Wallet from './page/wallet/page';
import WalletCreation from './page/wallet/create/page';
import W3ssdk  from './page/wallet/create/w3ssdk';


import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <UserProvider>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/createwallet" element={<WalletCreation />} />
        <Route path="/w3ssdk" element={<W3ssdk />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </UserProvider>
);

reportWebVitals();
