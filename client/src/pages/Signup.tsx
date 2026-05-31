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

        <div className="form-signup">
          <div
            style={{
              display: "inline-block",
              color: "white",
              backgroundColor: "rgb(96, 99, 238)",
              width: "max-content",
              borderRadius: "9px",
            }}
          >
            <DomainVerificationIcon fontSize="large" />
          </div>
          <div
            style={{
              display: "inline-block",
              fontSize: "18px",
              fontWeight: "bold",
              color: "rgb(96, 99, 238)",
              marginLeft: "12px",
              marginTop: "3px",
            }}
          >
            <h2>Gestion Events</h2>
          </div>
          <h1>Create your account</h1>
          <p>
            Join thousands of organizers managing high-profile live experiences.
          </p>
          <form className="signup-form">
            <label htmlFor="Full Name">Full Name</label>
            <input type="text" id="Full Name" placeholder="ex : Alex Morgan " />
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" placeholder="name@copany.com" />
            <label htmlFor="Password">Password</label>
            <div>
              <input
                type="password"
                name=""
                id="Password"
                placeholder="........"
              />
              <p>
                Must be at least 8 characters, including uppercase, lowercase,
                number, and symbol.
              </p>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
