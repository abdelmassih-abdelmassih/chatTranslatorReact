import React from 'react';
import { useAuth } from './useAuth'; // Adjust the import path
import { Navigate } from 'react-router-dom'; 

export default function ProtectedRoute ({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};
