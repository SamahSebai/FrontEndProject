import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./crud.css"

function ShowBlogs() {
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);
  const decodedToken = jwt_decode(token);
  const [data, setData] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Api/V1/Blog", config);
        setData(res.data);
      } catch (err) {
        console.log("dataaaaaa",data)
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, [config]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/Api/V1/profile`, config);
        setAlumni(res.data);
      } catch (err) {
        console.log(err);
        setError(true);

      }
    };
    fetchData();
  }, [config]);
  const handleUpdatBlog = (id) => {
    window.location.replace(`/updateBlog/${id}`);
  };

  const handleButtonClick = async (rowId) => {
    try {
      const res = await axios.delete(`http://localhost:4000/Api/V1/Blog/${rowId}`, config);
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1 className="titleD"><center>Liste des conseils, offres, opportunités, offres d'emploi </center></h1>
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} className="cardDemande">
                <tr>
                  <td className="blogs">
                    <strong>Type:</strong> {row.Type}
                  </td>
                  <td className="blogs">
                    <strong>Sujet:</strong> {row.Sujet}
                  </td>
                </tr>
                <tr>
                  <td className="blogs">
                    <strong>Description:</strong> {row.description}
                  </td>
                </tr>
                <tr>
                  {row.Moderateur == decodedToken.userId && (
                    <>
                      <center>
                        <button className="b1" onClick={() => handleUpdatBlog(row._id)}>update</button>
                        <button className="b2" onClick={() => handleButtonClick(row._id)}>delete</button>
                      </center>
                    </>
                  )}
                </tr>
              </tr>
            );
          })}
        </tbody>
      )}

    </div>
  );
}

export default ShowBlogs;
