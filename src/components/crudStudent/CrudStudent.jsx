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

const CrudStudent = () => {
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
    getEtudiants(
      (data1) => {
        getAlumnis(
          (data2) => {
            setetudiants([...data1, ...data2]);
          },
          () => {}
        );
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
      <h1>Liste des Etudiants</h1>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          togglePopup();
          createUser();
        }}
      >
        Create a Student
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onClick={openUploadModal}
      >
        Upload file Csv
      </button>
      <div>
      <Box>
      
      <Dialog open={openModal} onClose={closeUploadModal}>
        <DialogTitle className="discord-dialog-title">Upload CSV</DialogTitle>
        <DialogContent>
          <input
            id="csvFileInput"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="discord-file-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadModal} className="discord-button discord-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleupload} className="discord-button discord-upload-button">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
      </div>
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
              />
            ))}
          </tbody>
        </table>
      </div>

      {popup ? (
        <div className=" custom-popup">
          <form
            class="form-center p-2"
            onSubmit={handleSubmit}
            id="formstudent"
          >
            <legend>{id ? "Update a Student" : "Add a Student"}</legend>

            <div className="d-flex justify-content-between">
              <div class="form-group w-50 mx-2">
                <label for="">Prénom</label>
                <input
                  type="text"
                  class="form-control"
                  id="prenom"
                  placeholder="prenom"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>

              <div class="form-group w-50 mx-2">
                <label for="">Nom</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  placeholder="nom"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              {id === "" && (
                <div class="form-group w-50 mx-2">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    class="form-control "
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              )}

              {id === "" && (
                <div class="form-group w-50 mx-2">
                  <label for="">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <div class="form-group w-50 mx-2">
                <label for="">Niveau</label>
                <input
                  type="text"
                  class="form-control"
                  id="niveau"
                  placeholder="niveau"
                  value={niveau}
                  onChange={(e) => setniveau(e.target.value)}
                />
              </div>

              <div class="form-group w-50 mx-2">
                <label for="">Classe</label>
                <input
                  type="text"
                  class="form-control"
                  id="classe"
                  placeholder="classe"
                  value={classe}
                  onChange={(e) => setclasse(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div class="form-group w-50 mx-2">
                <label for="" className="w-100">
                  Date de Naissance
                </label>
                <input
                  type="date"
                  class="form-control w-100"
                  id="date de naissance"
                  placeholder="date de naissance"
                  value={makeDate2(datedeNaissance)}
                  onChange={(e) => setdatedeNaissance(e.target.value)}
                />
              </div>

              <div class="form-group w-50 mx-2">
                <label for="" className="w-100">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  class="form-control w-100"
                  required="required"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                >
                  <option />
                  <option value="Etudiant">Etudiant</option>
                  <option value="ALumni">ALumni</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center w-100">
              <button class="btn btn-primary mx-2" disabled={loading}>
                {id ? "Update" : "Create"}
              </button>
              <button class="btn btn-danger mx-2" onClick={togglePopup}>
                Close
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CrudStudent;
