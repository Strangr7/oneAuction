import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'OneAuction - Dashboard';
    
    const token = localStorage.getItem('accessToken');
    
    
    if (!token) {
      console.log("No token found, redirecting to login"); 
      setIsAuthenticated(false); 
    } 

  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken');
   
    navigate('/login'); // Redirect to login
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="register-page">
      <div className="form-wrapper text-center">
        <h3>Welcome to Your Dashboard</h3>
        <p className="text-muted mt-3">
          You are successfully logged in to OneAuction.
        </p>
        <div className="register-actions d-flex flex-column justify-content-between align-items-center">
          <Button
            className="btn btn-info btn-register d-flex align-items-center"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;