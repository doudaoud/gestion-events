import { Link } from "react-router-dom";
import "./styles/typeprofile.css";

export default function Typeprofile() {
  return (
    <>
      <div className="profiletype-page">
        <div className="titles-profiletype">
          <div className="retour_linscription">
            <Link to="/register">&larr; Back to registration</Link>
          </div>
          <div className="profiletype-title">
            <h2>Event Management</h2>
          </div>
        </div>
        <div className="profiletype-content">
          <div className="title-profiletype">
            <h1>Choose your account type</h1>
            <p>
              Select the profile that best fits your needs to personalize your
              event management experience.
            </p>
          </div>
          <div className="profiletype-options">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
