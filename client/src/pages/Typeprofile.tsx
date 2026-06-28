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
      </div>
    </>
  );
}
