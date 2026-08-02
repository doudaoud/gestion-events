import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/myevents.css";
import AddIcon from "@mui/icons-material/Add";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import http, { getApiErrorMessage } from "../api/http";

interface EventData {
  _id: string;
  title: string;
  date_Begin: string;
  location: string;
  type: string;
}

export default function MyEvents() {
  const navigate = useNavigate();
  const [role] = useState(() => localStorage.getItem("role"));
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(() => role === "organizer");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signIn");
      return;
    }
    if (role !== "organizer") {
      return;
    }
    http
      .get("/events/mine")
      .then((response) => setEvents(response.data.events))
      .catch((err) =>
        setError(getApiErrorMessage(err, "Impossible de charger vos événements.")),
      )
      .finally(() => setLoading(false));
  }, [navigate, role]);

  const handleDelete = async (eventId: string) => {
    setDeletingId(eventId);
    try {
      await http.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible de supprimer l'événement."));
    } finally {
      setDeletingId(null);
    }
  };

  if (role !== "organizer") {
    return (
      <div className="myevents-page">
        <div className="myevents-denied">
          <h1>Réservé aux organisateurs</h1>
          <p>Seuls les comptes organisateur ont accès à cette page.</p>
          <Link to="/home" className="myevents-create-link">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="myevents-page">
      <div className="myevents-header">
        <div>
          <h1>My events</h1>
          <p>Manage the events you have created.</p>
        </div>
        <Link to="/createEvent" className="myevents-create-link">
          <AddIcon fontSize="small" /> New event
        </Link>
      </div>

      {error && <p className="myevents-error-message">{error}</p>}

      {loading ? (
        <p className="myevents-empty">Loading…</p>
      ) : events.length === 0 ? (
        <p className="myevents-empty">
          You haven't created any event yet. <Link to="/createEvent">Create one</Link>.
        </p>
      ) : (
        <ul className="myevents-list">
          {events.map((event) => (
            <li key={event._id} className="myevents-item">
              <Link to={`/events/${event._id}`} className="myevents-item-main">
                <span className="myevents-item-type">{event.type}</span>
                <h3>{event.title}</h3>
                <div className="myevents-item-meta">
                  <span>
                    <CalendarMonthOutlinedIcon fontSize="inherit" />
                    {new Date(event.date_Begin).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                  <span>
                    <PlaceOutlinedIcon fontSize="inherit" />
                    {event.location}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                className="myevents-delete-btn"
                onClick={() => handleDelete(event._id)}
                disabled={deletingId === event._id}
              >
                {deletingId === event._id ? "..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
