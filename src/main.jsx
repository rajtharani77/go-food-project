import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import Bootstrap JavaScript (This will fix the carousel)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
