import React, { useState } from "react";
import logo from "../../assets/screen.png";
import eventImage from "../../assets/unnamed.png";
import techSummit from "../../assets/event_tech_summit.png";
import aiRobotics from "../../assets/event_ai_robotics.png";
import startupNight from "../../assets/event_startup_night.png";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import theme from "../themes/Theme";
import "./styles/home.css";
import SearchBar from "../components/Searchbar";
// TODO: regler le truc de create event pour que si t'es pas connecté ça te redirige vers sign in et faire la verefication des compte pour voir esq cest un organisateur ou pas et afficher les event en fonction de ça (genre les organisateurs voient tous les events et les autres que les events publics) et faire la page de profil pour voir les events auxquels t'as participé et ceux que t'as organisé et faire la page de création d'event avec le formulaire et tout et faire la page de connexion et d'inscription et faire la partie admin pour valider les organisateurs et les events et f
const events = [
  {
    id: 1,
    image: techSummit,
    badge: "CONFIRMED",
    badgeType: "confirmed",
    date: "Oct 23, 2024",
    title: "Global Tech Summit 2024",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    image: aiRobotics,
    badge: "PENDING",
    badgeType: "pending",
    date: "Nov 15, 2024",
    title: "AI & Robotics Exhibition",
    location: "London, UK",
  },
  {
    id: 3,
    image: startupNight,
    badge: "CONFIRMED",
    badgeType: "confirmed",
    date: "Dec 8, 2024",
    title: "Start-up Founders Night",
    location: "New York, NY",
  },
];

export default function Home(): React.ReactNode {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token")),
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    navigate("/home");
  };

  return (
    <React.Fragment>
      {/* ── Navbar ── */}
      <div className="navbar-spacer">
        <nav>
          <div className="left">
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
            <p>Gestion Events</p>
          </div>
          <div className="middle">
            <a href="#events">Discover</a>
            <a href="#events">Schedule</a>
            <a href="#features">Pricing</a>
            <a href="#contact">Support</a>
          </div>
          <div className="right">
            {isLoggedIn ? (
              <button className="nav-signin-link" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <Link to={"/signIn"} className="nav-signin-link">
                  Sign in
                </Link>
                <Link to={"/signup"} className="nav-signin-link">
                  Sign up
                </Link>
              </>
            )}
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                className="nav-create-btn"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/createEvent");
                  } else {
                    navigate("/signIn");
                  }
                }}
              >
                Create Event
              </Button>
            </ThemeProvider>
          </div>

          {/* Hamburger Icon */}
          <button
            className={`hamburger-menu ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <div className="middle">
            <a href="#events" onClick={() => setMobileMenuOpen(false)}>
              Discover
            </a>
            <a href="#events" onClick={() => setMobileMenuOpen(false)}>
              Schedule
            </a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Support
            </a>
          </div>
          <div className="right">
            {isLoggedIn ? (
              <button className="nav-signin-link" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <Link
                  to={"/signIn"}
                  className="nav-signin-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to={"/signup"}
                  className="nav-signin-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                className="nav-create-btn"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (localStorage.getItem("token")) {
                    navigate("/createEvent");
                  } else {
                    navigate("/signIn");
                  }
                }}
              >
                Create Event
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <header id="part1">
        <div className="titles">
          <h1>
            Empower Your <span>Events</span>
          </h1>
          <p>
            The authoritative platform for logistical precision and vibrant live
            experiences. Coordinate, manage, and scale your events with
            effortless sophistication.
          </p>
        </div>

        <div style={{ marginTop: -50, marginBottom: 50 }}>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ direction: "ltr" }}>
              <SearchBar />
            </div>
          </div>
          <div className="hero-img-wrapper">
            <img src={eventImage} alt="event image" className="hero-img" />
          </div>
        </div>

        <div className="decorative-box"></div>
      </header>

      {/* ── Popular Upcoming Events ── */}
      <section id="events" className="events-section">
        <div className="events-section-header">
          <div>
            <h2 className="section-title">Popular Upcoming Events</h2>
            <p className="section-subtitle">
              Hand-picked experiences happening in your area soon.
            </p>
          </div>
          <a href="" className="view-all-link">
            View all events <span>→</span>
          </a>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-card-img-wrapper">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-card-img"
                />
                <span className={`event-badge event-badge--${event.badgeType}`}>
                  {event.badge}
                </span>
              </div>
              <div className="event-card-body">
                <p className="event-card-date">{event.date}</p>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-location">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Gestion Events ── */}
      <section id="features" className="features-section">
        <div className="features-header">
          <h2 className="section-title">Why Choose Gestion Events?</h2>
          <p className="section-subtitle">
            Our tools are built for the intensity of high-stakes event
            coordination.
          </p>
        </div>

        <div className="features-grid">
          {/* Analytics card – large left */}
          <div className="feature-card feature-card--analytics">
            <div className="feature-card-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(96,99,238)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3 className="feature-card-title">Real-time Analytics</h3>
            <p className="feature-card-desc">
              Monitor ticket sales, attendee demographics, and engagement
              metrics live as they happen.
            </p>
            <div className="analytics-bars">
              <div className="bar bar--1"></div>
              <div className="bar bar--2"></div>
              <div className="bar bar--3"></div>
              <div className="bar bar--4"></div>
              <div className="bar bar--5"></div>
            </div>
          </div>

          {/* Right column */}
          <div className="features-right">
            {/* Intelligent Scheduling */}
            <div className="feature-card feature-card--scheduling">
              <div className="feature-card-top">
                <div className="feature-card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(96,99,238)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="feature-badge">Active</span>
              </div>
              <h3 className="feature-card-title">Intelligent Scheduling</h3>
              <p className="feature-card-desc">
                Advanced agenda tools that make multi-track management really
                simple.
              </p>
            </div>

            {/* Bottom two small cards */}
            <div className="features-small-grid">
              <div className="feature-card feature-card--small">
                <div className="feature-card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(96,99,238)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="feature-card-title">Team Access</h3>
                <p className="feature-card-desc">
                  Granular role-based team permissions.
                </p>
              </div>

              <div className="feature-card feature-card--small">
                <div className="feature-card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(96,99,238)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.49 16l.43.92z" />
                  </svg>
                </div>
                <h3 className="feature-card-title">24/7 Support</h3>
                <p className="feature-card-desc">
                  Dedicated live event manager support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section id="contact" className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">Ready to transform your events?</h2>
          <p className="cta-subtitle">
            Join 10,000+ organizers who trust Gestion Events for their most
            critical logistics.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn cta-btn--primary">
              Get Started Now
            </button>
            <button className="cta-btn cta-btn--secondary">Book a Demo</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src={logo}
                alt="logo"
                style={{ width: "28px", height: "28px" }}
              />
              <span>Gestion Events</span>
            </div>
            <p className="footer-brand-desc">
              Leading the industry in premium event management software with
              sophisticated design and powerful logistics.
            </p>
            <div className="footer-socials">
              {/* Twitter */}
              <a href="" className="footer-social-icon" aria-label="Twitter">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="" className="footer-social-icon" aria-label="LinkedIn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="" className="footer-social-icon" aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <a href="">About Us</a>
            <a href="">Contact</a>
            <a href="">Careers</a>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <a href="">Terms of Service</a>
            <a href="">Privacy Policy</a>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <a href="">Blog</a>
            <a href="">Help Center</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Gestion Events. All rights reserved.</p>
        </div>
      </footer>
    </React.Fragment>
  );
}
