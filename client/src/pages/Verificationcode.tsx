import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OtpInput from "react-otp-input";
import { useState } from "react";
export default function Verificationcode() {
  const [opt, setOpt] = useState("");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="verification-form"
          style={{
            width: "500px",
            height: "700px",

            display: "flex",
            flexFlow: "column wrap",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
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
              marginTop: "-150px",
            }}
          >
            <CheckCircleIcon
              style={{
                color: "white",
                marginLeft: "7px",
                marginTop: "6px",
              }}
            />
          </div>
          <h2
            style={{
              color: "rgb(99, 102, 241)",
              fontSize: "18px",
              fontWeight: "bold",
              // marginTop:"200px"
            }}
          >
            Gestion Events
          </h2>
          <h1
            style={{
              color: "black",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "50px",
            }}
          >
            Verify your email
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                width: "60%",
                textAlign: "center",
              }}
            >
              We•ve sent a 6-digit verification code to alex.design@example.com.
              Please enter it below.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <OtpInput
              numInputs={6}
              value={opt}
              onChange={setOpt}
             
              renderInput={(props) => <input {...props} className="otp-case" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
