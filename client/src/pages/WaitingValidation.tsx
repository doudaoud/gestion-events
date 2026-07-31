import { useNavigate } from "react-router-dom";
import "./styles/waitingvalidation.css";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export default function WaitingValidation() {
  const navigate = useNavigate();

  return (
    <div className="waiting-page">
      <header className="waiting-navbar">
        <h2 className="waiting-brand">Gestion Events</h2>
      </header>

      <main className="waiting-body">
        <div className="waiting-card">
          <div className="waiting-icon">
            <HourglassTopOutlinedIcon />
          </div>

          <h1 className="waiting-title">Verification in progress</h1>
          <p className="waiting-description">
            Your identity documents have been submitted successfully. Our
            team is now reviewing your information and will validate your
            organizer profile shortly.
          </p>

          <ul className="waiting-timeline">
            <li className="waiting-timeline-item waiting-timeline-item--done">
              <span className="waiting-timeline-badge">
                <CheckCircleIcon fontSize="inherit" />
              </span>
              <span>
                <p className="waiting-timeline-name">Documents received</p>
                <p className="waiting-timeline-status">Completed</p>
              </span>
            </li>
            <li className="waiting-timeline-item waiting-timeline-item--active">
              <span className="waiting-timeline-badge">
                <BadgeOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                <p className="waiting-timeline-name">Admin review</p>
                <p className="waiting-timeline-status">In progress...</p>
              </span>
            </li>
            <li className="waiting-timeline-item">
              <span className="waiting-timeline-badge">
                <ShieldOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                <p className="waiting-timeline-name">Profile validated</p>
                <p className="waiting-timeline-status">Pending</p>
              </span>
            </li>
          </ul>

          <p className="waiting-note">
            You will be notified by email as soon as your documents have been
            checked. This usually takes less than 24 hours.
          </p>

          <button
            type="button"
            className="waiting-home-btn"
            onClick={() => navigate("/home")}
          >
            Back to home
          </button>
        </div>
      </main>
    </div>
  );
}
