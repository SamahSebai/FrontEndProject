import React from "react";

const ElemPFE = ({ Titre, Sujet, Societe, dateDebut, dateFin }) => {
  return (
    <div>
      <h1>{Titre}</h1>
      <h2>{Societe}</h2>
      <p>{Sujet}</p>
      <span>
        {dateDebut} --- {dateFin}
      </span>
    </div>
  );
};

export default ElemPFE;
