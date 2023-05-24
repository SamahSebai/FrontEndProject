import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminList() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleCrudEtudiant = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEtudiant: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrudEtudiantM = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEtudiant: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrudEnseignant = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEnseignant: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrudEnseignantM = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEnseignant: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrudEventM = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEvent: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrudEvent = async (rowId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Admins/${rowId}`,
        { CrudEvent: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.replace("/adminlist");
    } catch (err) {
      console.log(err);
    }
  };


  

  useEffect(() => {
    axios
      .get("http://localhost:4000/Api/V1/Admins", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((i, key) => {
    return (
      <tr key={key}>
        <td>
          {i.firstName} {i.lastName}
        </td>
        <td>{i.email}</td>
        <td>{i.address}</td>
        <td>
        {i.CrudEtudiant === true ? (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEtudiantM(i._id)}
            >
            Remove
            </button>
            ) : (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEtudiant(i._id)}
            >
            Add
            </button>
            )}
        </td>
        <td>
        {i.CrudEnseignant === true ? (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEnseignantM(i._id)}
            >
            Remove
            </button>
            ) : (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEnseignant(i._id)}
            >
            Add
            </button>
            )}
        </td>
        <td>
        {i.CrudEvent === true ? (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEventM(i._id)}
            >
            Remove
            </button>
            ) : (
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCrudEvent(i._id)}
            >
            Add
            </button>
            )}
        </td>
      </tr>
    );
  });
        

  return (
    <div style={{ margin: "10rem" }}>
      <h1>Table des admins</h1>
      <table striped bordered hover size="sm">
        <thead>
          <tr>
            <th> Full Name </th>
            <th> Email </th>
            <th> Adress </th>
            <th> Crud Etudiant </th>
            <th> Crud Enseignant </th>
            <th> Crud Event </th>
          </tr>
        </thead>
        <tbody>{arr}</tbody>
      </table>
    </div>
  );
}

export default AdminList;
