import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/createevent.css";
import EventIcon from "@mui/icons-material/Event";
import http, { getApiErrorMessage } from "../api/http";

const EVENT_TYPES = [
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "hackathon", label: "Hackathon" },
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [role] = useState(() => localStorage.getItem("role"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_Begin: "",
    date_End: "",
    location: "",
    type: "conference",
    image: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signIn");
    }
  }, [navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await http.post("/events", formData);
      navigate(`/events/${response.data.event._id}`);
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible de créer l'événement."));
    } finally {
      setSubmitting(false);
    }
  };

  if (role !== "organizer") {
    return (
      <div className="createvent-page">
        <div className="createvent-denied">
          <EventIcon className="createvent-denied-icon" />
          <h1>Réservé aux organisateurs</h1>
          <p>
            Seuls les comptes organisateur peuvent créer des événements. Passez
            votre profil en organisateur pour continuer.
          </p>
          <Link to="/home" className="createvent-back-link">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="createvent-page">
      <div className="createvent-card">
        <h1 className="createvent-title">Create a new event</h1>
        <p className="createvent-subtitle">
          Fill in the details below to publish your event.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="createvent-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Global Tech Summit 2026"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="createvent-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="createvent-row">
            <div className="createvent-field">
              <label htmlFor="date_Begin">Start date</label>
              <input
                type="datetime-local"
                id="date_Begin"
                name="date_Begin"
                value={formData.date_Begin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="createvent-field">
              <label htmlFor="date_End">End date</label>
              <input
                type="datetime-local"
                id="date_End"
                name="date_End"
                value={formData.date_End}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="createvent-row">
            <div className="createvent-field">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="createvent-field">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="createvent-field">
            <label htmlFor="image">Cover image URL (optional)</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {error && <p className="createvent-error-message">{error}</p>}

          <button type="submit" className="createvent-submit-btn" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish event"}
          </button>
        </form>
      </div>
    </div>
  );
}
