import React, { useState, useEffect } from "react";

// TODO: Vérifier et adapter l'URL de l'API pour récupérer les 3 événements
export default function Usestate3events(): React.ReactNode {
  const [threeEvents, setThreeEvents] = useState([]);

  useEffect(() => {
    const fetchThreeEvents = async () => {
      try {
        // Assurez-vous de remplacer l'URL par votre route backend existante
        const response = await fetch("/api/events?limit=3");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements");
        }
        const data = await response.json();
        setThreeEvents(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchThreeEvents();
  }, []);

  return (
    <React.Fragment>
      {threeEvents.length === 0 ? (
        <p>Chargement des événements...</p>
      ) : (
        <div>
          {/* {threeEvents.map((event) => (
            <div key={event._id}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p>Lieu: {event.location}</p>
            </div>
          ))} */}{" "}
          complet
        </div>
      )}
    </React.Fragment>
  );
}
