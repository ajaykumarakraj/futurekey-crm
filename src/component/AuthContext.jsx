import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for auth token on initial load
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setUser({ email: 'user@example.com' }); // Simulating authenticated user
    }
  }, []);

  const login = () => {
    setUser({ email: 'user@example.com' });
    localStorage.setItem('authToken', 'your-auth-token'); // Simulate auth token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
