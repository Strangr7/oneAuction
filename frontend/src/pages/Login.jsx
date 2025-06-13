import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import Button from '../components/Button.jsx';
import validateForm from '../utils/validation/validateForm.js';
import { loginUser } from '../services/userService';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Changed from email to identifier
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'OneAuction - Login';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await loginUser(formData);
        localStorage.setItem('token', data.accessToken); // Use accessToken from backend response
        setMessage(
          <div className="text-success text-center mb-3">
            {data?.message || 'Login successful!'}
          </div>
        );
        navigate('/dashboard');
      } catch (error) {
        const msg =
          error.message || 'Login failed. Please try again.';
        setMessage(<div className="text-danger text-center mb-3">{msg}</div>);
      }
    } else {
      setMessage('');
    }
  };

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <section className="logo-container text-center">
          <h3>Login</h3>
        </section>

        <div className="form-wrapper">
          <FormInput
            label="Email Address*"
            id="identifier"
            name="identifier" // Changed to identifier
            type="email"
            value={formData.identifier}
            onChange={handleChange}
            error={errors.identifier} // Update error key
          />
          <FormInput
            label="Password*"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {message}

          <div className="register-actions d-flex flex-column justify-content-between align-items-center">
            <Button
              type="submit"
              className="btn btn-info btn-register d-flex align-items-center"
            >
              Login
            </Button>
          </div>

          <p className="text-center text-muted mt-3">
            <Link to="/forgot-password" className="text-primary text-decoration-none">
              Forgot Password?
            </Link>
          </p>
          <p className="text-center text-muted mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;