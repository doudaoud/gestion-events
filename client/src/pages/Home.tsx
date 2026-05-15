import React from "react";
import logo from "../../assets/screen.png";

export default function Home() : React.ReactNode {
  return (
    <React.Fragment>
      {/* navbar */}
      <nav>
        <div className="left">
          <img src={logo} alt="logo de notre app " />
        </div>
        <div className="middle"></div>
        <div className="right"></div>
      </nav>
      {/* navbar */}
    </React.Fragment>
  );
}
