import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/verification.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OtpInput from "react-otp-input";
import { jwtDecode } from "jwt-decode";

interface RegisterTokenPayload {
  new_user: {
    fullName: string;
    email: string;
    role: string;
  };
  code_verification: string;
  exp: number;
}

function isTokenExpired(token: RegisterTokenPayload): boolean {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return token.exp < currentTimeInSeconds;
}

export default function Verificationcode() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [decodedToken] = useState<RegisterTokenPayload | null>(() => {
    const storedToken = localStorage.getItem("token_registerUser");
    if (!storedToken) {
      return null;
    }
    try {
      return jwtDecode<RegisterTokenPayload>(storedToken);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!decodedToken) {
      navigate("/signUp");
    }
  }, [decodedToken, navigate]);

  const handleVerification = () => {
    if (!decodedToken) {
      return;
    }
    if (!otp || otp.length < 6) {
      setError("Veuillez insérer le code de vérification.");
      return;
    }
    if (isTokenExpired(decodedToken)) {
      setError("Votre code a expiré, veuillez recommencer l'inscription.");
      return;
    }
    if (otp !== decodedToken.code_verification) {
      setError("Code de vérification incorrect.");
      return;
    }
    setError("");
    navigate("/signUp/typeprofile");
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
            We've sent a 6-digit verification code to {decodedToken?.new_user.email}.
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
        {error && <p className="error-message">{error}</p>}
        <div className="button-wrapper">
          <button type="button" className="verify-button" onClick={handleVerification}>
            verify&rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
