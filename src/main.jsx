// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './component/AuthContext'; // ✅ path to your AuthContext

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Now all components inside can use useAuth() */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
