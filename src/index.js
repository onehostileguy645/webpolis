import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // optional, remove if you don't have this file yet
import { useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);