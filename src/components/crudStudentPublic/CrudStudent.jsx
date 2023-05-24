import React, { useEffect, useState } from "react";
import { makeDate2 } from "../../DateParse";
import {
  getEtudiants,
  addEtudiant,
  deleteEtudiant,
  updateEtudiant,
  getAlumnis,
} from "../../services/crudEtudService";
import Student from "../Student/Student";
import "./CrudStudent.css";
import { Box, Button, Typography } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import * as api from "../../services/crudEtudService";

const StudentPublic = () => {
  const [id, setid] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [File, setFile] = useState(null);
  const [password, setpassword] = useState("");
  const [niveau, setniveau] = useState("");
  const [classe, setclasse] = useState("");
  const [datedeNaissance, setdatedeNaissance] = useState("");
  const [role, setrole] = useState("");
  const [etudiants, setetudiants] = useState([]);
  const [popup, setpopup] = useState(false);
  const [loading, setloading] = useState(false);

  const togglePopup = () => {
    setpopup(!popup);
  };
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    api.getEtudiantsPublic(
      (data1) => {

            setetudiants([...data1]);

      },
      () => {}
    );
  };

  const openUploadModal = () => {
    setOpenModal(true);
  };
  
  const closeUploadModal = () => {
    setOpenModal(false);
  };

  const handleFileUpload = (event) => {
  

    const selectedFile = event.target.files[0];
    setFile(selectedFile);
 
  };

  useEffect(() => {}, []);

  const handleupload = () => {
    const formData = new FormData(); // send to backend sous formData 
    formData.append("csvFile", File);
    console.log(File);

    api.importExcel(formData)
    window.location.reload();
  };

  const deleteUser = (id) => {
    console.log(id);
    deleteEtudiant(id, getStudents);
  };
  const createUser = (etudiant) => {
    console.log(etudiant);
    setid("");
    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
    setclasse("");
    setniveau("");
    setdatedeNaissance("");
    setrole("");
  };

  const updateUser = (etudiant) => {
    console.log(etudiant);
    setid(etudiant._id);
    setfirstName(etudiant.firstName);
    setlastName(etudiant.lastName);
    setclasse(etudiant.classe);
    setniveau(etudiant.niveau);
    setdatedeNaissance(etudiant.datedeNaissance);
    setrole(etudiant.role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    if (id) {
      updateEtudiant(
        { id, firstName, lastName, niveau, classe, datedeNaissance, role },
        () => {
          getStudents();
          togglePopup();
          setloading(false);
        }
      );
    } else {
      addEtudiant(
        firstName,
        lastName,
        email,
        password,
        niveau,
        classe,
        datedeNaissance,
        role,
        () => {
          getStudents();
          togglePopup();
          setloading(false);
        },
        () => {
          setloading(false);
        }
      );
    }
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <h1>Liste des Etudiants Public</h1>

      <div></div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Niveau</th>
              <th>Classe</th>
              <th>Date de Naissance</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {etudiants?.map((etudiant) => (
              <Student
                _id={etudiant._id}
                key={etudiant._id}
                firstName={etudiant.firstName}
                lastName={etudiant.lastName}
                niveau={etudiant.niveau}
                classe={etudiant.classe}
                datedeNaissance={etudiant.datedeNaissance}
                role={etudiant.role}
                deletefnc={deleteUser}
                editfnc={updateUser}
                toggle={togglePopup}
                justVue
              />
            ))}
          </tbody>
        </table>
      </div>
      </div>

  );
};

export default StudentPublic;
