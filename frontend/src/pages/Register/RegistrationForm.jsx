import React, { useState } from "react";
import FormInput from "../../components/FormInput.jsx";
import Button from "../../components/Button.jsx";
import validateForm from "../../utils/validation/validateForm.js";
import { useEffect } from "react";
import "./register.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      setMessage(
        <div className="text-success text-center mb-3">Registration successful!</div>
      );
    } else {
      setMessage("");
    }
  };

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <section className="logo-container text-center">
          <img src={`/images/logo.png`} alt="logo" height="70" />
        </section>

        <div className="form-wrapper">
          <FormInput
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <FormInput
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
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