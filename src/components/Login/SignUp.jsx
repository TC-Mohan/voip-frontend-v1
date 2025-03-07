// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CallPOSTAPI } from '../../helper/Constants';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await CallPOSTAPI('api/create-user-v2', formData);
      if (response?.data?.status) {
        navigate('/');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className={errors.first_name ? 'error' : ''}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className={errors.last_name ? 'error' : ''}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePassword}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="repassword"
            placeholder="Confirm Password"
            value={formData.repassword}
            onChange={handleChange}
            className={errors.repassword ? 'error' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePassword}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;