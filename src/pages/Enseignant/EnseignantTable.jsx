import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import UpdateEnseignant from "./updateEnseignant";
import "./Table.css";

function EnseignantTable() {
  const [data, setData] = useState([]);
  const [item, setitem] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "Enseignant",
    _id: "",
  });
  const [toggle, settoggle] = useState(false);

  const togglePopup = () => {
    settoggle(true);
  };

  const handleCreate = () => {
    window.location.replace(`/CreateEnseignant`);
  };

  const handleUpdateEnsg = (id) => {
    window.location.replace(`/updateEnseignant/${id}`);
  };

  const handleDelete = (id) => {
    window.location.replace(`/deleteEnseignant/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Enseignant", {
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
        <td>
          {i.firstName} {i.lastName}
        </td>
        <td>{i.email}</td>
        <td>{i.address}</td>
        <td>
          <button
            onClick={() => {
              handleUpdateEnsg(i._id);
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
      <h1>Table des enseignants</h1>
      <table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>{arr}</tbody>
      </table>
      <button onClick={handleCreate}>Create Enseignant</button>
    </div>
  );
}

export default EnseignantTable;
