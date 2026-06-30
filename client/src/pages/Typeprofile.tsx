import { Link } from "react-router-dom";
import "./styles/typeprofile.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
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
            <div>
              <div className="icon-profiletype">
                <PersonOutlinedIcon
                  style={{
                    fontSize: 50,
                    color: "rgb(73, 75, 213)",
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(73, 75, 213,0.1)",
                    padding: "10px",
                  }}
                />
              </div>
              <div>
                <h3>User</h3>
                <p>
                  Discover events, book tickets, and manage your personal
                  schedule with ease.{" "}
                </p>
                <div style={{
                  
                }} >
                  <FormControlLabel control={<Checkbox />} label=" I am a user (Attendee)" />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
