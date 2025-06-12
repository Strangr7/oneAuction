import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegistrationForm from './pages/Register/RegistrationForm';

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
      <RegistrationForm />
    </div>
  );
}

export default App;