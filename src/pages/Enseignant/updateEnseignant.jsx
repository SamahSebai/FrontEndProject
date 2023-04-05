import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function UpdateEnseignant() {
  const { id } = useParams();
  const [enseignant, setEnseignant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "Enseignant",
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
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/Enseignant/${id}`,
          config
        );
        setEnseignant(resG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnseignant();
  }, [id, config]);

  const handleInput = (e) => {
    setEnseignant({ ...enseignant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Enseignant/${id}`,
        enseignant,
        config
      );
      window.location.replace(`/enseignants`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span className="formtitle">Update Enseignant </span>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={enseignant.firstName || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={enseignant.lastName || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={enseignant.email || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={enseignant.password || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={enseignant.address || ""}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={enseignant.role || ""}
          onChange={handleInput}
          disabled
        />
      </div>
      {error && <div className="error">error</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateEnseignant;
