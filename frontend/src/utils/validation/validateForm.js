const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";

  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "Invalid email address.";
  }

  if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export default validateForm;
