import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;