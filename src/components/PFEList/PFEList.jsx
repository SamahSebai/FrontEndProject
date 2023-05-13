import React, { useEffect, useState } from "react";
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
    <div>
      {pfes.map((pfe) => (
        <ElemPFE
          key={pfe._id}
          Titre={pfe.Titre}
          Societe={pfe.Societe}
          Sujet={pfe.Sujet}
          dateDebut={pfe.dateDebut}
          dateFin={pfe.dateFin}
        />
      ))}
    </div>
  );
};

export default PFEList;
