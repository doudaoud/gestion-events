import React from "react";
import imageSignup from "../../assets/signup (1).png";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
export default function Signup(): React.ReactNode {
  return (
    <React.Fragment>
      <div
        className="container_form_signup"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="image-form-signup">
          <img src={imageSignup} alt="image for signup form " />
          <div
            className="write-image"
            style={{
              backgroundColor: "rgb(192, 194, 220)",
              color: "white",
              alignSelf: "flex-start",
              width: "400px",
              borderRadius: "9px",
              position: "relative",
              top: "-125px",
              left: "10%",
              padding: "20px",
            }}
          >
            <h2>Seamless Logistics.</h2>
            <p>
              Experience the world's most intutive platform for event organizers
              and creative directors
            </p>
          </div>
        </div>

        <div
          style={{
            color: "white",
            backgroundColor: "rgb(96, 99, 238)",
            width: "max-content",
            borderRadius: "9px",
          }}
        >
          <DomainVerificationIcon fontSize="large" />
        </div>
      </div>
    </React.Fragment>
  );
}
