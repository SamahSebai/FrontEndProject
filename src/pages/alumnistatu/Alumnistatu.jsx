import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useState, useEffect, useMemo } from "react";
import "./alumnistatu.css";

export default function Alumnistatu() {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Api/V1/profile", config);
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, [config]);

  if (token) {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    console.log(userId);
  }

  return (
    <div class="main">
       
      <div class="card">
        <div class="card-body">
          <i class="fa fa-pen fa-xs edit"></i>
          <table>
            <tbody>
              <tr>
              <h2 style={{ color: data && data.etat ? 'green' : 'red' }}>
            {data && data.etat ? 'account activated' : 'account not yet activated'}
           </h2>
              </tr>

              <tr>
                <td>FirstName</td>
                <td>:</td>
                <td>{data && data.firstName}</td> 
              </tr>
              <tr>
                <td>lastName</td>
                <td>:</td>
                <td>{data && data.lastName}</td> 
              </tr>
              <tr>
                <td>Address</td>
                <td>:</td>
                <td>{data && data.address}</td> 
              </tr>
              <tr>
                <td>Specialite</td>
                <td>:</td>
                <td>{data && data.Specialite}</td> 
              </tr>
              <tr>
                <td>categorie</td>
                <td>:</td>
                <td>{data && data.categorie}</td> 
              </tr>
              <tr>
                <td>classe</td>
                <td>:</td>
                <td>{data && data.classe}</td> 
              </tr>
              <tr>
                <td>role</td>
                <td>:</td>
                <td>{data && data.role}</td> 
              </tr>
              <tr>
                <td>visibilite</td>
                <td>:</td>
                <td>{data && data.visibilite ? 'public' : 'private'}</td> 
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{data && data.email}</td> 
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
