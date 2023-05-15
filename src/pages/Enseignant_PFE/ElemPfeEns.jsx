import React from "react";
import "./ElemPfeEns.css";

const ElemPfeEns = ({
  _id,
  Titre,
  Sujet,
  Societe,
  Pays,
  dateDebut,
  dateFin,
  choisirpfe,
  toggle,
  Encadrant,
}) => {
  return (
    <div className="pfe-card p-2">
      <div className="">
        <h1>Title : {Titre}</h1>
        <h2>Societé : {Societe}</h2>
        <p>Sujet du PFE : {Sujet}</p>
        <p>Pays du PFE: {Pays}</p>
        <span>
          {dateDebut} --- {dateFin}
        </span>
      </div>
      <div>
        {!Encadrant && (
          <button
            onClick={() => {
              choisirpfe(_id);
              toggle();
            }}
          >
            Choisir
          </button>
        )}
      </div>
    </div>
  );
};

export default ElemPfeEns;
