import React, { useEffect, useState } from "react";
import "./EnsPfe.css";
import {
  getpfeaffecte,
  getpfenonaffecte,
  selectpfe,
} from "../../services/PfeService";
import ElemPfeEns from "./ElemPfeEns";

const EnsPfe = () => {
  const [id, setid] = useState("");
  const [pfesnonaffecte, setpfesnonaffecte] = useState([]);
  const [mespfes, setmespfes] = useState([]);
  // const [firstName, setfirstName] = useState("haha");
  // const [lastName, setlastName] = useState("haha");
  const [popup, setpopup] = useState(false);
  const togglePopup = () => {
    setpopup(!popup);
  };
  useEffect(() => {
    getpfenonaffecte(
      (data) => {
        setpfesnonaffecte(data);
      },
      () => {}
    );
    getpfeaffecte(
      (data) => {
        setmespfes(data);
      },
      () => {}
    );
  }, []);

  const handleSubmit = (e) => {
    console.log(id);
    e.preventDefault();
    if (id) {
      selectpfe(id, () => {
        togglePopup();
      });
    }
  };
  return (
    <div className="cards p-2">
      <h1>La liste des PFEs non affectés:</h1>
      {pfesnonaffecte.map((pfe) => (
        <ElemPfeEns
          _id={pfe._id}
          key={pfe._id}
          Titre={pfe.Titre}
          Societe={pfe.Societe}
          Sujet={pfe.Sujet}
          Pays={pfe.Pays}
          dateDebut={pfe.DateDebut}
          dateFin={pfe.DateFin}
          choisirpfe={setid}
          toggle={togglePopup}
          Encadrant={pfe.Encadrant}
          // firstName={firstName}
          // lastName={lastName}
        />
      ))}
      {popup && (
        <div className="custom-popup">
          <div className="form-center">
            <p>Voulez vous sélectionner cette pfe ?</p>
            <button onClick={handleSubmit}>Choisir</button>
            <button onClick={togglePopup}>Annuler</button>
          </div>
        </div>
      )}
      <br />
      <h1>Mes PFEs :</h1>
      {mespfes.map((pfe) => (
        <ElemPfeEns
          key={pfe._id}
          Titre={pfe.Titre}
          Societe={pfe.Societe}
          Sujet={pfe.Sujet}
          Pays={pfe.Pays}
          dateDebut={pfe.DateDebut}
          dateFin={pfe.DateFin}
          Encadrant={pfe.Encadrant}
        />
      ))}
    </div>
  );
};

export default EnsPfe;
