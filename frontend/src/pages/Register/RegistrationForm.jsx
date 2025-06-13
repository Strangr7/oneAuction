import React, { useState } from "react";
import FormInput from "../../components/FormInput.jsx";
import Button from "../../components/Button.jsx";
import validateForm from "../../utils/validation/validateForm.js";
import { useEffect } from "react";
import "./register.css";
import { registerUser } from "../../services/userService";



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username:"",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "OneAuction - Register";
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
      const data = await registerUser(formData); // Call the API function
      setMessage(
        <div className="text-success text-center mb-3">
          {data?.message || "Registration successful!"}
        </div>
      );
    } catch (error) {
      const msg =
        error.response?.data?.message || "Registration failed. Please try again.";
      setMessage(<div className="text-danger text-center mb-3">{msg}</div>);
    }
  } else {
    setMessage("");
  }
};


  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <section className="logo-container text-center">
          <h3>Create an Account</h3>
        </section>

        <div className="form-wrapper">
         <div className="row-name">
          <FormInput
            label="First Name*"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <FormInput
            label="Last Name*"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          </div>

          <FormInput
            label="Email Address*"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
           <FormInput
            label="UserName"
            id="username"
            name="username"
            value={formData.username}
             onChange={handleChange}
           
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

          <FormInput
            label="Confirm Password*"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {message}

          <div className="register-actions d-flex flex-column justify-content-between align-items-center">
            <Button type="submit" className="btn btn-info btn-register d-flex align-items-center">
              Register
            </Button>
          </div>

          <p className="text-center text-muted mt-3">
            Already have an account?{" "}
            <a href="#" className="text-primary text-decoration-none">
              Login
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegistrationForm;