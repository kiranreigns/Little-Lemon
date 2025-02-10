import React, { useState } from "react";

// Define FormField outside LoginPage
const FormField = ({
  label,
  type,
  name,
  placeholder,
  error,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-yellow-light focus:border-transparent ${
        error ? "border-red-500" : "border-gray-200"
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log("Logging in:", formData);
        // Add login logic here
      } else {
        console.log("Signing up:", formData);
        // Add signup logic here
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-gray-600">
            {isLogin
              ? "Please enter your details to sign in"
              : "Enter your details to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          {!isLogin && (
            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />
          )}

          <button
            type="submit"
            className="w-full bg-primary-yellow text-black py-3 px-4 rounded-lg font-medium hover:bg-primary-yellow-dark transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-green hover:text-gray-800 font-medium focus:outline-none"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
