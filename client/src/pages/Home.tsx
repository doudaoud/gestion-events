import React from "react";
import logo from "../../assets/screen.png";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import theme from "../themes/theme";
import "./styles/home.css";
import SearchBar from "../components/Searchbar";

export default function Home(): React.ReactNode {
  return (
    <React.Fragment>
      {/* navbar */}
      <nav>
        <div className="left">
          <img
            src={logo}
            alt="logo de notre app"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <p>Gestion Events</p>
        </div>
        <div className="middle">
          <a href="">Discover</a>
          <a href=""> Schedule</a>
          <a href="">Pricing</a>
          <a href="">Support </a>
        </div>
        <div className="right">
          <Link to={"/signIn"}>Sign in</Link>
          <ThemeProvider theme={theme}>
            <Button variant="contained">Create Event</Button>
          </ThemeProvider>
        </div>
      </nav>
      {/* navbar */}
      {/* header de la page home */}
      <header>
        <div className="titles">
          <h1>
            Empower Your <span>Events</span>
          </h1>
          <p>
            The authoritative platform for logistical precision and vibrant live
            experiences. Coordinater manage, and scale your events with
            effortless sophistication.
          </p>
        </div>
        <div
          style={{
            marginTop: -50,
            marginBottom: 50,
          }}
        >
          <div style={{
            marginBottom:"30px"
          }}>
          <SearchBar />

          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              marginBottom:"20px"
            }}
          >
            {" "}
            <img
              src="../../assets/unnamed.png"
              alt="event image"
              style={{
                height: "280px",
                width: "654px",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      </header>
      {/* header de la page home */}
    </React.Fragment>
  );
}
