import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Event.css";
import { makeDate2 } from "../../functions/dates";

function UpdateEvent({ data }) {
  const { id } = useParams();
  const [event, setEvent] = useState({
    Nom: "",
    Description: "",
    Date: "",
    Moderateur: "",
  });
  const [error, setError] = useState(false);
  const [moderators, setModerators] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setEvent({ ...data });
  }, [data]);

  const config = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resB = await axios.get(
          `http://localhost:4000/Api/V1/Event/${id}`,
          config()
        );
        setEvent(resB.data);
        console.log(resB.data);
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/Admins`,
          config()
        );
        console.log(resG.data);
        setModerators(resG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Event/${event._id}`,
        { ...event },
        config()
      );
      console.log(res);
      res.data && window.location.replace("/events");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span className="formtitle">Update event </span>
      <div>
        <label>Nom:</label>
        <input
          data-test="Nom"
          type="text"
          name="Nom"
          value={event.Nom || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          data-test="Description"
          type="text"
          name="Description"
          value={event.Description || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          data-test="Date"
          type="date"
          name="Date"
          value={makeDate2(event.Date)}
          onChange={handleInput}
        />
      </div>

      <div>
        <label>Moderateur:</label>
        <select
          name="Moderateur"
          value={event.Moderateur || ""}
          onChange={handleInput}
        >
          <option value="">None</option>
          {moderators.map((moder, key) => {
            return (
              <option key={key} value={moder._id}>
                {moder.firstName} {moder.lastName}
              </option>
            );
          })}
        </select>
      </div>

      {error && <div className="error">error</div>}
      <button data-test="btn-update-event" type="submit">Submit</button>
    </form>
  );
}

export default UpdateEvent;
