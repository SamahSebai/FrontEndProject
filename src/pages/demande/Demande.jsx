import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import "./demande.css";

export default function Demande() {
  const [alumni, setAlumni] = useState("");
  const [type, setType] = useState("expert");
  const [compétences, setCompétences] = useState("");
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      console.log(userId);
      setAlumni(userId);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        "http://localhost:4000/Api/V1/Demande",
        {
          alumni,
          type,
          compétences,
        },
        config
      );
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (

  <div className="card2">
          <center className="box"><h1 className="h1"> Demande vacation / contrat expert</h1></center> 
    <div className="Demande">
      <span className="Demandetitle">
      </span>
      <div className="">
        <form className="container1" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Choose the type of your request:</label>
            <select
              id="type1"
              className="form-control1"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="expert"> EXPERT CONTRACT</option>
              <option value="vacation">VACATION CONTRACT</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="compétences">Skills:</label>
            <textarea
              id="compétences"
              className="form-control"
              name="compétences"
              onChange={(e) => setCompétences(e.target.value)}
              value={compétences}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong
        </span>
      )}
    </div>
  </div>
  );
}
