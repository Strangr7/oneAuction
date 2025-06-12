import React from "react";

const FormInput = ({ label, id, name, type = "text", value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;
