import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
export default function ScanId() {
  return (
    <React.Fragment>
      <div
        className="navbar-scan-page"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "rgb(75, 77, 213)",
          }}
        >
          Gestion Events
        </h2>
        <button
          style={{
            color: "rgb(119, 119, 131)",
            fontSize: "1.2rem",
          }}
        >
          <CloseOutlinedIcon
            style={{
              marginTop: "-0.1rem",
            }}
          />{" "}
          <p
            style={{
              display: "inline-block",
              marginLeft: "0.5rem",
            }}
          >
            Cancel
          </p>
        </button>
      </div>
      <div className="scan-page">
        <div>
          <h2>Identity Verification</h2>
          <p>
            Please scan your identity document to validate your organizer
            profile and ensure the security of your future events.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
