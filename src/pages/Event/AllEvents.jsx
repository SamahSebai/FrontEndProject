import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import UpdateEvent from "./updateEvent";

function AllEvents() {
  const [data, setData] = useState([]);
  const [item, setitem] = useState({
    Nom: "",
    _id: "",
    Description: "",
    Date: "",
    Moderateur: null ,
  });


  useEffect(() => {
    axios
      .get("http://localhost:3000/Event", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        console.log("messaaaaaaaaaaaage",data);
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
      
    </div>
  );
}

export default AllEvents;
