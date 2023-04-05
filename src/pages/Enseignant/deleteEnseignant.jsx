import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function DeleteEnseignant() {
  const { id } = useParams();
  const [enseignant, setEnseignant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState(false);
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
    const fetchEnseignant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/Api/V1/Enseignant/${id}`,
          config
        );
        setEnseignant(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnseignant();
  }, [id, config]);

  const handleDelete = async () => {
    try {
      setError(false);
      const res = await axios.delete(
        `http://localhost:4000/Api/V1/Enseignant/${id}`,
        config
      );
      window.location.replace(`/enseignants`);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="container">
      <span className="formtitle">Delete Enseignant</span>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={enseignant.firstName || ""}
          disabled
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={enseignant.lastName || ""}
          disabled
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={enseignant.email || ""}
          disabled
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={enseignant.password || ""}
          disabled
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={enseignant.address || ""}
          disabled
        />
      </div>

      {error && <div className="error">error</div>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteEnseignant;
