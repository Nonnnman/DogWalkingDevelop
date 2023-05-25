import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ListingsContextProvider } from './context/ListingsContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <ListingsContextProvider>
        <App />
      </ListingsContextProvider>
    </AuthContextProvider>
);