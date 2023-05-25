import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./EditUser.css";

function UpdateUser() {
  const navigate = useNavigate();
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
  const [error, setError] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
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
        setIsPublic(resG.data.visibilite);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id, config]);

  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const updatedEvent = { ...event, visibilite: isPublic };

      const res = await axios.put(
        `http://localhost:4000/Api/V1/Etudiant/Update/${userId}`,
        updatedEvent,
        config
      );

      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <form className="container1" onSubmit={handleSubmit}>
      <span className="formtitle1">Mise à jour de profil </span>
      <div>
        <label>Prénom </label>
        <input
          type="text"
          name="firstName"
          value={event.firstName || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Nom de famille</label>
        <input
          type="text"
          name="lastName"
          value={event.lastName || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={event.email || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="text"
          name="password"
          value={event.password || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Adresse</label>
        <input
          type="text"
          name="address"
          value={event.address || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Spécialité</label>
        <input
          type="text"
          name="Specialite"
          value={event.Specialite || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label> Classe</label>
        <input
          type="text"
          name="classe"
          value={event.classe || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Public</label>
        <input
          type="checkbox"
          name="public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </div>
      <div>
        <label> Curriculum Vitae</label>
        <img
          src="resume.png"
          alt="Modifier CV"
          onClick={() => navigate(`/UpdateCV`, { replace: true })}
        />
        {/* <button type="Modifier" onClick={() => navigate(`/updateCv/${event.Cv}`, { replace: true })} > Modifier CV </button>*/}
      </div>
      {error && <div className="error"> Erreur </div>}
      <div className="button-container">
        <button type="button" onClick={() => window.history.back()}>
          Annuler
        </button>
        <button type="submit">Enregister</button>
      </div>
    </form>
  );
}

export default UpdateUser;
