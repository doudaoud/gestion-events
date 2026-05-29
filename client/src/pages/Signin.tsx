// todo regller le login apres le signup et la pagge de verification du code par mail

import { Fragment, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./styles/signin.css";

export default function Signin(): React.ReactNode {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  return (
    <Fragment>
      <div className="container_form_signin">
        <div className="logo-container">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRpY2tldC1pY29uIGx1Y2lkZS10aWNrZXQiPjxwYXRoIGQ9Ik0yIDlhMyAzIDAgMCAxIDAgNnYyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtMmEzIDMgMCAwIDEgMC02VjdhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJaIi8+PHBhdGggZD0iTTEzIDV2MiIvPjxwYXRoIGQ9Ik0xMyAxN3YyIi8+PHBhdGggZD0iTTEzIDExdjIiLz48L3N2Zz4="
            alt="icon ticket"
          />
        </div>
        <h2 className="logo-container">Gestion des événements</h2>
        <div className="form_signin">
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Log in to manage your premium events and attendees.</p>
          </div>

          <div className="input-container">
            <label htmlFor="email">Address e-mail</label>
            <div className="input-group">
              <span className="input-icon">
                <EmailIcon fontSize="small" />
              </span>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Votre email"
              />
            </div>
          </div>

          <div className="input-container">
            <div className="password-label-group">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot_password">
                Forgot password?
              </Link>
            </div>
            <div className="input-group">
              <span className="input-icon">
                <LockIcon fontSize="small" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Votre mot de passe"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </span>
            </div>
          </div>

          <button className="btn_signin">Sign in</button>
        </div>
      </div>
    </Fragment>
  );
}
