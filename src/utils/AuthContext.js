import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // For demo purposes, we'll just set a user without verifying the token
      setCurrentUser({
        id: "1",
        name: "Jane Advisor",
        email: "jane@example.com",
        role: "financial_advisor"
      });
    }
    
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      // For demo purposes, we'll simulate a successful login
      if (email === "demo@example.com" && password === "password") {
        const user = {
          id: "1",
          name: "Jane Advisor",
          email: "jane@example.com",
          role: "financial_advisor"
        };
        
        // Store token in localStorage
        localStorage.setItem('token', 'demo-token-123');
        
        setCurrentUser(user);
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
      
      // In a real app, you would make an API call like this:
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      // setCurrentUser(response.data.user);
      // return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "An error occurred during login" 
      };
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };
  
  // Check if user is authenticated
  const isAuthenticated = currentUser !== null;
  
  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}