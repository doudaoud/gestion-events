import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/eventdetails.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import eventImage from "../../assets/unnamed.png";
import http, { getApiErrorMessage } from "../api/http";

interface EventData {
  _id: string;
  title: string;
  description: string;
  date_Begin: string;
  date_End: string;
  location: string;
  type: string;
  image?: string;
  organizer: { _id: string; fullName: string } | string;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    http
      .get(`/events/${id}`)
      .then((response) => {
        if (!cancelled) setEvent(response.data.event);
      })
      .catch((err) => {
        if (!cancelled)
          setError(getApiErrorMessage(err, "Événement introuvable."));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const organizerId =
    typeof event?.organizer === "object" ? event.organizer._id : event?.organizer;
  const organizerName =
    typeof event?.organizer === "object" ? event.organizer.fullName : "";
  const isOwner =
    organizerId && organizerId === localStorage.getItem("userId");

  const handleDelete = async () => {
    if (!event) return;
    setDeleting(true);
    try {
      await http.delete(`/events/${event._id}`);
      navigate("/myEvents");
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible de supprimer l'événement."));
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="eventdetails-page eventdetails-status">Loading…</div>;
  }

  if (error || !event) {
    return (
      <div className="eventdetails-page eventdetails-status">
        <p>{error || "Événement introuvable."}</p>
        <Link to="/home" className="eventdetails-back-link">
          <ArrowBackIcon fontSize="small" /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="eventdetails-page">
      <div className="eventdetails-container">
        <Link to="/home" className="eventdetails-back-link">
          <ArrowBackIcon fontSize="small" /> Back to home
        </Link>

        <div className="eventdetails-card">
          <img
            src={event.image || eventImage}
            alt={event.title}
            className="eventdetails-img"
          />
          <div className="eventdetails-body">
            <span className="eventdetails-type-badge">{event.type}</span>
            <h1 className="eventdetails-title">{event.title}</h1>

            <div className="eventdetails-meta">
              <span>
                <CalendarMonthOutlinedIcon fontSize="small" />
                {formatDate(event.date_Begin)} → {formatDate(event.date_End)}
              </span>
              <span>
                <PlaceOutlinedIcon fontSize="small" />
                {event.location}
              </span>
              {organizerName && (
                <span>
                  <PersonOutlinedIcon fontSize="small" />
                  Organized by {organizerName}
                </span>
              )}
            </div>

            <p className="eventdetails-description">{event.description}</p>

            {error && <p className="eventdetails-error-message">{error}</p>}

            {isOwner && (
              <button
                type="button"
                className="eventdetails-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
