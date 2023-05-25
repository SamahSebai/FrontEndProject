import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./ShowUser.css";

function ShowUser() {
  const { id } = useParams();
  const [event, setEvent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    Specialite: "",
    classe: "",
    diplome: "",
    Cv: "",
  });
  const token = localStorage.getItem("token");

  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/profile/`,
          config
        );
        setEvent(resG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id, config]);

  return (
    <div className="container1">
      <span className="formtitle1">Profil utilisateur</span>
      <div>
        <label>Prénom: </label> {event.firstName}
      </div>
      <div>
        <label>Nom de famille: </label> {event.lastName}
      </div>
      <div>
        <label>Email: </label> {event.email}
      </div>
      <div>
        <label>Mot de passe: </label> {event.password}
      </div>
      <div>
        <label>Adresse: </label> {event.address}
      </div>
      <div>
        <label>Spécialité: </label> {event.Specialite}
      </div>
      <div>
        <label> Classe: </label> {event.classe}
      </div>
    </div>
  );
}

export default ShowUser;
