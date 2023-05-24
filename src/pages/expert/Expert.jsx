import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./expert.css"
function Expert() {
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);

  const [data, setData] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Api/V1/Demande", config);
        setData(res.data);
        console.log(res.data)
      } catch (err) {
        console.log("dataaaaaa",data)
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, [config]);

  useEffect(() => {
    const fetchDataAlumni = async () => {
      try {
        const resA = await axios.get("http://localhost:4000/Api/V1/Alumni", config);
        setAlumni(resA.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchDataAlumni();
  }, [config]);




  return (
    <div className="page">
      <h1 className="titleD"><center>List of expert requests</center></h1>
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
          <table >
          <tbody>
  {alumni.map((alumnirow) =>
    data.map((row) => {
      if (row.alumni === alumnirow._id && row.type === "expert") {
        return (
          <tr key={row.id} className="cardDemande">
            <div className="content">
            <tr>
            <th>firstName:</th>
            <td>{alumnirow.firstName}</td>
            <th>lastName:</th>
            <td>{alumnirow.lastName}</td>
            </tr>
            <tr>
            <th>email :</th>
            <td>{alumnirow.email} ,  </td>
            <th>address :</th>
            <td>{alumnirow.address}</td>
            </tr>
            <tr>
            <th>Specialite :</th>
            <td>{alumnirow.Specialite}</td>
            <th>role :</th>
            <td>{alumnirow.role}</td>
            </tr>
            <tr>
            <th>compétences:</th>
            <td>{row.compétences}</td>
            </tr>
            </div>
          </tr>
        );
      }
      return null;
    })
  )}
</tbody>

          </table>
      )}
    </div>
  );
}

export default Expert;
