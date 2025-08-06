import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../app.css';

const SignInPage = () => {
  const [mobile, setMobile] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.almonkdigital.in/api/send-login-otp', { mobile });
      const data = response.data;

      if (data.status === 200) {
        setError('');
        navigate('/verifyOtp', { state: { mobile } });
      } else {
        setError(data.message || 'Login failed. Please check the mobile number.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="avatar">
          🔒
        </div>
        <h2 className="title">Sign In</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <label htmlFor="mobile" style={{ display: "block" }}>Mobile Number</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="submit-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
