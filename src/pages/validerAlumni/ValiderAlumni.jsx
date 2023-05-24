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



  const handleRefuseClick = async (rowId) => {
    try {
      const res = await axios.put(`http://localhost:4000/Api/V1/Alumni/${rowId}`, {etat:false}, config);
      console.log(res);
      window.location.replace("/valideralumni");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <center>
    <div style={{ flexGrow: 1 }}  className="cardAl"  id="card1">
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
        <div>
          <table id="tableV" className="table table-striped">

            <thead>
              <tr><h1 style={{color:"green"}}>Liste des invité</h1></tr>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>email</th>
                <th>address</th>
                <th>Specialite</th>
                <th>Rôle</th>
                <th>valider</th>
                <th>refuser</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                if (row.etat==null) {
                  return (
                    <tr className="ligne" key={row._id}>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.email}</td>
                      <td>{row.address}</td>
                      <td>{row.Specialite}</td>
                      <td>{row.role}</td>
                      <td>
                        <button type="button" className="btn btn-primary" data-test="btnValider" onClick={() => handleButtonClick(row._id)}>
                          valider
                        </button>
                        
                        </td>
                        <td>
                        <button type="button" className="btn btn-primary" data-test="btnRefuser" onClick={() => handleRefuseClick(row._id)}>
                          refuser
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


    <div style={{ flexGrow: 1 }}  id="card1" className="cardAl">
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
        <div >
          <table className="table table-striped">
            <thead>
              <tr><h1 style={{color:"red"}} >Liste des refusé</h1></tr>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>email</th>
                <th>address</th>
                <th>Specialite</th>
                <th>Rôle</th>
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
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </center>
  );
}

export default ValiderAlumni;
