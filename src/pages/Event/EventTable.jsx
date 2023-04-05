import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import UpdateEvent from "./updateEvent";

function EventTable() {
  const [data, setData] = useState([]);
  const [item, setitem] = useState({
    Nom: "",
    _id: "",
    Description: "",
    Date: "",
    Moderateur: "",
  });
  const [toggle, settoggle] = useState(false);

  const togglePopup = () => {
    settoggle(true);
  };

  const handleCreate = () => {
    window.location.replace(`/CreateEvent`);
  };
  const handleUpdatevent = (id) => {
    window.location.replace(`/updateEvent/${id}`);
  };

  const handleDelete = (id) => {
    window.location.replace(`/deleteEvent/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Event", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((i, key) => {
    return (
      <tr key={key}>
        <td>{i.Nom}</td>
        <td>{i.Description}</td>
        <td>{i.Date}</td>
        <td>
          <button
            onClick={() => {
              handleUpdatevent(i._id);
            }}
          >
            edit
          </button>
        </td>
        <td>
          <button onClick={() => handleDelete(i._id)}>delete</button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ margin: "10rem" }}>
      <h1>Table des événements</h1>
      <table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{arr}</tbody>
      </table>
      <button onClick={handleCreate}>Create Event</button>
    </div>
  );
}

export default EventTable;
