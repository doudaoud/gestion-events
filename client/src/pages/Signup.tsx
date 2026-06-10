import React, { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import imageSignup from "../../assets/signup (1).png";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./styles/signup.css";
import axios from "axios";

export default function Signup(): React.ReactNode {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Left: image */}
        <div className="signup-image-panel">
          <img src={imageSignup} alt="event stage" />
          <div className="signup-image-overlay" />
          <div className="signup-image-text">
            <h2>Seamless Logistics.</h2>
            <p>
              Experience the world's most intuitive platform for event
              organizers and creative directors.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="signup-form-panel">
          <div className="signup-logo">
            <div className="signup-logo-icon">
              <DomainVerificationIcon fontSize="small" />
            </div>
            <span className="signup-logo-name">Gestion Events</span>
          </div>

          <h1>Create your account</h1>
          <p className="signup-subtitle">
            Join thousands of organizers managing <span>high-profile</span> live
            experiences.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="signup-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Alex Morgan"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup-field">
              <label htmlFor="password">Password</label>
              <div className="signup-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="signup-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
              <p className="signup-password-hint">
                Must be at least 8 characters long.
              </p>
            </div>

            <div className="signup-terms">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Create Account <ArrowForwardIcon fontSize="small" />
            </button>
          </form>

          <p className="signup-signin-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
