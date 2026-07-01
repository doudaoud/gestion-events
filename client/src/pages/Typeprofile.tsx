import { Link } from "react-router-dom";
import "./styles/typeprofile.css";
import { type SxProps } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
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
                <button className="profiletype-continue-btn user-btn">
                  Continue
                </button>
              </div>
            </div>
            {/* <div></div> */}
            <div className="profiletype-card">
              <div
                className="icon-profiletype"
                style={{
                  backgroundColor: "rgb(108, 248, 187)",
                }}
              >
                <Person4OutlinedIcon
                  className="profiletype-icon"
                  sx={{ fontSize: 32, color: "rgb(1, 109, 74)" }}
                />
              </div>
              <div>
                <h3 className="profiletype-card-title">Organizer</h3>
                <p className="profiletype-card-desc">
                  Create, manage, and analyze your events. Access professional
                  ticketing and marketing tools.
                </p>
                <InfoOutlinedIcon
                  sx={{
                    fontSize: 15,
                    // color: rgb(163, 163, 171),
                  }}
                  style={{
                    color: "rgb(140, 140, 140)",
                  }}
                />
                <p
                  style={{
                    // display:"inline-block",
                    color: "rgb(140, 140, 140)",
                    fontSize: "14px",
                    // marginTop:"19px/"
                    position: "relative",
                    top: "-20px",
                    left: "20px",
                  }}
                >
                  Identity verification required
                </p>
                <div className="profiletype-checkbox">
                  <FormControlLabel
                    control={<Checkbox {...label} />}
                    label=" I am an organizer"
                  />
                </div>
                <button className="scan-btn">
                 <DocumentScannerOutlinedIcon/> Scan my ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
