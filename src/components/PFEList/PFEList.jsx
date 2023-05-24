import React, { useEffect, useState } from "react";
import "./PFEList.css";
import { getPFEs } from "../../services/PfeService";
import ElemPFE from "../PFEelem/ElemPFE";

const PFEList = () => {
  const [pfes, setpfes] = useState([]);
  useEffect(() => {
    getPFEs((data) => {
      setpfes(data);
    }, {});
  }, []);
  return (
    <div className="cards p-2">
      {pfes.map((pfe) => (
        <ElemPFE
          key={pfe._id}
          Titre={pfe.Titre}
          Societe={pfe.Societe}
          Sujet={pfe.Sujet}
          Pays={pfe.Pays}
          dateDebut={pfe.DateDebut}
          dateFin={pfe.DateFin}
        />
      ))}
    </div>
  );
};

export default PFEList;
