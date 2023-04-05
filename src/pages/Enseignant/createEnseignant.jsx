import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function CreateEnseignant() {
  const makeheader = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return config;
  };

  const [enseignant, setEnseignant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "Enseignant",
  });
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setEnseignant({ ...enseignant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/Api/V1/register`,
        enseignant,
        makeheader()
      );
      window.location.replace(`/enseignants`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span className="formtitle">Create Enseignant </span>
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
          value={enseignant.role}
          onChange={handleInput}
          disabled
        />
      </div>
      {error && <div className="error">error</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateEnseignant;
