import React, { useEffect, useState, useMemo } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import './Updatecv.css';

function Updatecv() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    stages: '',
    formations: '',
    compétences: ''
  });
  const [error, setError] = useState(false);
  const token = localStorage.getItem('token');

  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resG = await axios.get(`http://localhost:4000/Api/V1/Cv/${id}`, config);
        setEvent(resG.data)
        console.log(resG.data);
        console.log("test",event);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id, config]);
  
  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.put(`http://localhost:4000/Api/V1/Cv/${id}`, event , config);
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (

    <form className="container1" onSubmit={handleSubmit}>
      <span className="formtitle1">Mise à jour de Curriculum Vitae </span>
      <div>
        <label>Prénom</label>
        <input
          type="text"
          name="firstName"
          value={event.firstName || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Nom de famille</label>
        <input
          type="text"
          name="lastName"
          value={event.lastName || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={event.email || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Adresse</label>
        <input
          type="text"
          name="address"
          value={event.address || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Stages</label>
        <input
          type="text"
          name="stages"
          value={event.stages || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Formations</label>
        <input
          type="text"
          name="formations"
          value={event.formations || ''}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Compétences</label>
        <input
          type="text"
          name="compétences"
          value={event.compétences || ''}
          onChange={handleInput}
        />
      </div>
      {error && <div className="error">Erreur</div>}
      
      <div className="button-container">
    <button type="button" onClick={() => navigate(`/UpdateUser`, { replace: true })}>Annuler</button>
    <button type="submit">Enregister</button>
  </div>
    </form>
  );
}

export default Updatecv;