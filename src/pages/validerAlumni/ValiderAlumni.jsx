import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ValiderAlumni.css";

function ValiderAlumni() {
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Api/V1/Alumni", config);
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, [config]);

  const handleButtonClick = async (rowId) => {
    try {
      const res = await axios.put(`http://localhost:4000/Api/V1/Alumni/${rowId}`, {etat:true}, config);
      console.log(res);
      window.location.replace("/valideralumni");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ flexGrow: 1 }} className="p-2" id="contain">
      <h1>Liste des invités</h1>
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>email</th>
                <th>address</th>
                <th>Specialite</th>
                <th>Rôle</th>
                <th>valider</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                if (row.etat === false) {
                  return (
                    <tr key={row.id}>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.email}</td>
                      <td>{row.address}</td>
                      <td>{row.Specialite}</td>
                      <td>{row.role}</td>
                      <td>
                        <button type="button" className="btn btn-primary" onClick={() => handleButtonClick(row._id)}>
                          valider
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ValiderAlumni;
