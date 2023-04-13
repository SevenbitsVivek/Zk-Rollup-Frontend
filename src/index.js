import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import StartPolygonTransactonIndexer from './PolygonTransactionsList';
import StartEthereumTransactonIndexer from './EthereumTransactionsList';
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/PolygonTransactionsList" element={<StartPolygonTransactonIndexer />} />
        <Route path="/EthereumTransactionsList" element={<StartEthereumTransactonIndexer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
