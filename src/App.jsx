import React, { useEffect } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import { AuthProvider, useAuth } from './services/useAuth'; // Adjust the import path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';

export default function App() {
  useEffect(()=>{
    console.log("version: 2")
  },[])
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
