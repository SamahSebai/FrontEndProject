import React from "react";
import "./ElemPFE.css";

const ElemPFE = ({ Titre, Sujet, Societe, dateDebut, dateFin }) => {
  return (
    <div className="pfe-card p-2">
      <h1>Title : {Titre}</h1>
      <h2>Societé : {Societe}</h2>
      <p>Sujet du PFE : {Sujet}</p>
      <span>
        {dateDebut} --- {dateFin}
      </span>
    </div>
  );
};

export default ElemPFE;
