import { useState } from "react";
import "./styles/verification.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OtpInput from "react-otp-input";
import {jwtDecode} from "jwt-decode";
export default function Verificationcode() {
  const [otp, setOtp] = useState("");
  const object   = localStorage.getItem("token_registerUser");
  const token_registerUser = object 
  const decodedToken = token_registerUser ? jwtDecode(token_registerUser) : null;
  console.log("Decoded Token:", decodedToken);
  //les fonctions
  const handleVerification = () => {
  
  };
  return (
    <div className="verification-page">
      <div className="verification-form">
        <div className="check-icon">
          <CheckCircleIcon className="check-icon-svg" />
        </div>
        <h2 className="brand-title">Gestion Events</h2>
        <h1 className="verify-title">Verify your email</h1>
        <div className="description-wrapper">
          <p className="description">
            We've sent a 6-digit verification code to alex.design@example.com.
            Please enter it below.
          </p>
        </div>
        <div className="otp-wrapper">
          <OtpInput
            numInputs={6}
            value={otp}
            onChange={setOtp}
            containerStyle="otp-container"
            skipDefaultStyles
            renderInput={(props) => <input {...props} className="otp-case" />}
          />
        </div>
        <div className="button-wrapper">
          <button type="button" className="verify-button" onClick={handleVerification}>
            verify&rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
