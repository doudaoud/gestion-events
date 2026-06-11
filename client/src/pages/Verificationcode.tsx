import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Verificationcode() {
  return (
    <>
      <div
        className="verification-form"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="check-icon"
          style={{
            backgroundColor: "rgb(99, 102, 241)",
            // borderRadius: "50%",
            height: "40px",
            width: "40px",
            borderRadius: "10px",
          }}
        >
          <CheckCircleIcon
            style={{
              color: "white",
              marginLeft: "7px",
              marginTop: "6px",
              //   fontWeight:"bold",
              //   height:"30px"
            }}
          />
        </div>
        <h1>
            Gestion Events
        </h1>
      </div>
    </>
  );
}
