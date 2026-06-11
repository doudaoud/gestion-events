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
        <h2 style={{
            color:"rgb(99, 102, 241)", 
            fontSize:"18px",
            fontWeight:"bold"   
        }} >
            Gestion Events
        </h2>
        <h1>
            Verify your email
        </h1>
      </div>
    </>
  );
}
