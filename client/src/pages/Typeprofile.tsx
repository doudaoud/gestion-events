import { Link } from "react-router-dom";
import "./styles/typeprofile.css";
import { type SxProps } from "@mui/material/styles";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const CHECKBOX_COLOR = "rgb(70, 72, 212)";
const checkboxSx: SxProps = {
  color: CHECKBOX_COLOR,
  "&.Mui-checked": {
    color: CHECKBOX_COLOR,
  },
  "&.Mui-disabled": {
    color: CHECKBOX_COLOR,
    opacity: 0.4,
  },
};

const label = {
  slotProps: { input: { "aria-label": "Checkbox demo" } } as const,
  sx: checkboxSx,
};

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
            <div className="profiletype-card">
              <div className="icon-profiletype">
                <PersonOutlinedIcon
                  className="profiletype-icon"
                  sx={{ fontSize: 32, color: "rgb(73, 75, 213)" }}
                />
              </div>
              <div>
                <h3 className="profiletype-card-title">User</h3>
                <p className="profiletype-card-desc">
                  Discover events, book tickets, and manage your personal
                  schedule with ease.{" "}
                </p>
                <div className="profiletype-checkbox">
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label=" I am a user (Attendee)"
                  />
                </div>
                <button className="profiletype-continue-btn">Continue</button>
              </div>
            </div>
            {/* <div></div> */}
            <div className="profiletype-card">
              <div className="icon-profiletype">
                <PersonOutlinedIcon
                  className="profiletype-icon"
                  sx={{ fontSize: 32, color: "rgb(73, 75, 213)" }}
                />
              </div>
              <div>
                <h3 className="profiletype-card-title">User</h3>
                <p className="profiletype-card-desc">
                  Discover events, book tickets, and manage your personal
                  schedule with ease.{" "}
                </p>
                <div className="profiletype-checkbox">
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label=" I am a user (Attendee)"
                  />
                </div>
                <button className="profiletype-continue-btn">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
