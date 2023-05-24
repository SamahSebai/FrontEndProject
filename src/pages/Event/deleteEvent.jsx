import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./Event.css";
import { makeDate2 } from "../../functions/dates";

function DeleteEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState({
    Nom: "",
    Description: "",
    Date: "",
    Moderateur: "",
  });
  const [moderator, setModerator] = useState(null);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/Event/${id}`,
          config
        );
        setEvent(resG.data);
        console.log(resG.data);
        console.log(resG.data.Moderateur);
        const resG2 = await axios.get(
          `http://localhost:4000/Api/V1/Admins/${resG.data.Moderateur}`,
          config
        );
        setModerator(resG2.data);
        console.log(resG2);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, [id, config]);

  const handleDelete = async () => {
    try {
      setError(false);
      const res = await axios.delete(
        `http://localhost:4000/Api/V1/Event/${id}`,
        config
      );
      res.data && window.location.replace("/events");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="container">
      <span className="formtitle">Delete event</span>
      <div>
        <label>Nom:</label>
        <input type="text" name="Nom" value={event.Nom || ""} disabled />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="formations"
          value={event.Description || ""}
          disabled
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="Date"
          value={makeDate2(event.Date || "")}
          disabled
        />
      </div>
      {moderator && (
        <div>
          <label>Moderateur:</label>
          <input
            type="text"
            name="Moderateur"
            value={moderator.firstName + " " + moderator.lastName}
            disabled
          />
        </div>
      )}

      {error && <div className="error">error</div>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteEvent;
