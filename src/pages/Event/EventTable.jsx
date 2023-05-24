import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import UpdateEvent from "./updateEvent";
import { getUserByRole } from "../../services/loginService";
import { getSaison } from "../../services/Saisonservice";

function EventTable() {
  const [user, setuser] = useState({ role: "" });
  const [saisons, setsaisons] = useState([]);
  const [saison, setsaison] = useState("");
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
    getUserByRole((data) => {
      setuser(data);
    });
    console.log(user);
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Event?id=${saison}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [saison]);

  useEffect(() => {
    getSaison((data) => {
      setsaisons(data);
    });
  }, []);

  const arr = data.map((i, key) => {
    return (
      <tr key={key}>
        <td>{i.Nom}</td>
        <td>{i.Description}</td>
        <td>{i.Date}</td>
        {user === "ADMIN" && (
          <div>
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
          </div>
        )}
      </tr>
    );
  });
  return (
    <div style={{ margin: "10rem" }}>
      {(user === "ADMIN" || user === "Enseignant") && (
        <div class="form-group w-50 mx-2">
          <h1>Basculer entre les saisons universitaires</h1>
          <select
            name="saison"
            id="saison"
            class="form-control w-100"
            required="required"
            onChange={(e) => setsaison(e.target.value)}
          >
            <option value="">Tous les saisons</option>
            {saisons.map((saison) => {
              const yearx = new Date(saison.DateDebut).getFullYear();
              const yeary = new Date(saison.Datefin).getFullYear();
              return (
                <>
                  <option value={saison._id}>
                    {yearx} - {yeary}
                  </option>
                </>
              );
            })}
          </select>
        </div>
      )}
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
      {user === "ADMIN" && <button onClick={handleCreate}>Create Event</button>}
    </div>
  );
}

export default EventTable;
