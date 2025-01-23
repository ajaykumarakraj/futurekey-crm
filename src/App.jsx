import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/AuthContext'; // Import AuthProvider
import { useEffect } from 'react';
import SignInPage from './pages/Sign-in/Sign-in'; 
import MiniDrawer from './pages/Home/Home';
import ProtectedRoute from './component/ProtectedRoute'; // Import ProtectedRoute
import ChangePasswordPage from './component/ChangePassword'
import './app.css'
function App() {
  useEffect(() => {
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: 'YOUR_APP_ID', // Replace with your Facebook App ID
            cookie: true,
            xfbml: true,
            version: 'v16.0', // Use the latest Facebook API version
        });
    };
}, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected Route for Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><MiniDrawer /></ProtectedRoute>} />

          {/* Public route for Sign-In */}
          <Route path="/sign-in" element={<SignInPage />} />

          {/* Public route for password reset */}
          <Route path="/change-password" element={<ChangePasswordPage />} />

          {/* Default route */}
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
