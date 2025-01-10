import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/AuthContext'; // Import AuthProvider
import SignInPage from './pages/Sign-in/Sign-in'; 
import MiniDrawer from './pages/Home/Home';
import ProtectedRoute from './component/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <AuthProvider> {/* Provide authentication context to the app */}
      <BrowserRouter>
        <Routes>
          {/* Protect the /dashboard route */}
          <Route path="/dashboard" element={<ProtectedRoute><MiniDrawer /></ProtectedRoute>} />
          {/* Public route */}
          <Route path="/sign-in" element={<SignInPage />} />
          {/* Default route */}
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
