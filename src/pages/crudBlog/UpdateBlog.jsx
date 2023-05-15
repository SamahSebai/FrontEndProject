import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./crud.css";

function UpdateBlog({ data }) {
  const { id } = useParams();
  const [Blog, setBlog] = useState({
    Type: "",
    Sujet: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const [moderators, setModerators] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setBlog({ ...data });
  }, [data]);

  const config = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resB = await axios.get(
          `http://localhost:4000/Api/V1/Blog/${id}`,
          config()
        );
        setBlog(resB.data);
        console.log(resB.data);
      } catch{
        setError(true);
      }
    };
    fetchBlog();
  }, []);

  const handleInput = (e) => {
    setBlog({ ...Blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Blog/${Blog._id}`,
        { ...Blog },
        config()
      );
      console.log(res);
      res.data && window.location.replace("/showBlogs");
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
          <select name="Type" value={Blog.Type} onChange={handleInput}>
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
            value={Blog.Sujet|| ""}
            onChange={handleInput}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={Blog.description|| ""}
            onChange={handleInput}
          />
        </div>
        {error && <div className="error">Error Occured</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateBlog;
