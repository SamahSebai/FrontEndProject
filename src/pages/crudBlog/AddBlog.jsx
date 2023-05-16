import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";

function AddBlog() {

  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );
  const decodedToken = jwt_decode(token);
  const [blog, setBlog] = useState({
    Type: "",
    Sujet: "",
    description: "",
    Moderateur:decodedToken.userId
  });

  const handleInput = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        `http://localhost:4000/Api/V1/Blog`,
        { ...blog },
        config
      );
      console.log(blog);
      console.log(res);
      res.data && window.location.replace("/showblogs");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="card2">
      <center className="box">
        <h1 className="h1">
          conseils, offres, opportunités, offres d'emploi
        </h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <select name="Type" value={blog.Type} onChange={handleInput}>
            <option value="">Choose Type</option>
            <option value="conseil">Conseil</option>
            <option value="offre">Offre</option>
            <option value="opportunité">Opportunité</option>
            <option value="offre d'emploi">Offre d'emploi</option>
          </select>
        </div>
        <div>
          <label>Sujet:</label>
          <input
            type="text"
            name="Sujet"
            value={blog.Sujet}
            onChange={handleInput}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleInput}
          />
        </div>
        {error && <div className="error">Error Occured</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBlog;
