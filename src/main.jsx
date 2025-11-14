import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Mengimpor CSS global yang akan digunakan di seluruh aplikasi
import './index.css'; 
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);