const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";

  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "Invalid email address.";
  }

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(formData.password)) {
  errors.password =
    "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.";
}

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export default validateForm;
