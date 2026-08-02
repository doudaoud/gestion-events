import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/verification.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OtpInput from "react-otp-input";
import http, { getApiErrorMessage } from "../api/http";

export default function Verificationcode() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [email] = useState<string | null>(() =>
    localStorage.getItem("pending_verification_email"),
  );

  useEffect(() => {
    if (!email) {
      navigate("/signUp");
    }
  }, [email, navigate]);

  const handleVerification = async () => {
    if (!email) {
      return;
    }
    if (!otp || otp.length < 6) {
      setError("Veuillez insérer le code de vérification.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const response = await http.post("/auth/verify-email", { email, otp });
      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("pending_verification_email");
      navigate("/signUp/typeprofile");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Impossible de vérifier le code, veuillez réessayer."),
      );
    } finally {
      setSubmitting(false);
    }
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
            We've sent a 6-digit verification code to {email}.
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
          <button
            type="button"
            className="verify-button"
            onClick={handleVerification}
            disabled={submitting}
          >
            {submitting ? "Verifying..." : <>verify&rarr;</>}
          </button>
        </div>
      </div>
    </div>
  );
}
