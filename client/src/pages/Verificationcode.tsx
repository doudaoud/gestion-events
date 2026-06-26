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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="check-icon"
            style={{
              backgroundColor: "rgb(99, 102, 241)",
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
              containerStyle={{ gap: "10px" }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="otp-case"
                  style={{
                    width: "45px",
                    height: "50px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "rgb(99, 102, 241)",
                    border: "2px solid #d1d5db",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "2px solid rgb(99, 102, 241)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "2px solid #d1d5db";
                  }}
                />
              )}
            />
          </div>
          <div className="button verifiy">
            <button
              style={{
                color: "white",
                backgroundColor: "rgb(70, 72, 212)",
                paddingTop:"10px",
                paddingBottom:"10px",
                paddingRight:"120px",
                paddingLeft:"120px",
                borderRadius: "10px",
              }}
            >
              {" "}
              verify&rarr;{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
