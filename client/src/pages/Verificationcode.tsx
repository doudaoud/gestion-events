import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Verificationcode() {
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
            // height: "auto",
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
            }}
          >
            Verify your email
          </h1>
          <div
            style={{
              //   width: "70%",
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "white",
                // margin:"auto"
            }}
          >
            <p
              style={{
                width: "80%",
               textAlign:"center"
                // display: "flex",
                // justifyContent: "center",
              }}
            >
              We•ve sent a 6-digit verification code to alex.design@example.com.
              Please enter it below.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
