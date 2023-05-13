import React, { useState } from "react";
import "./Pfe.css";
import { addPfe } from "../../services/PfeService";

const Pfe = () => {
  const [specialite, setSpecialite] = useState("");
  const [titre, setTitre] = useState("");
  const [sujet, setsujet] = useState("");
  const [societe, setsociete] = useState("");
  const [dateDebut, setdateDebut] = useState("");
  const [dateFin, setdateFin] = useState("");
  const [technologie, setTechnologie] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    console.log(start.getMonth() - end.getMonth());

    if (start && end && end.getMonth() - start.getMonth() >= 3) {
      alert("aw bech nzyd");
      addPfe(
        titre,
        specialite,
        societe,
        specialite,
        technologie,
        dateDebut,
        dateFin
      );
    } else {
      alert("nejmch nzyd");
    }
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <form onSubmit={handleSubmit}>
        <legend>PFE</legend>

        <div class="form-group">
          <label for="">Titre</label>
          <input
            type="text"
            class="form-control"
            value={titre}
            placeholder="le titre de votre projet pfa"
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Description</label>
          <input
            type="text"
            class="form-control"
            value={sujet}
            placeholder="la description du projet"
            onChange={(e) => setsujet(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Societé</label>
          <input
            type="text"
            class="form-control"
            value={societe}
            placeholder="societe"
            onChange={(e) => setsociete(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Spécialité</label>
          <input
            type="text"
            class="form-control"
            value={specialite}
            placeholder="votre spécialité"
            onChange={(e) => setSpecialite(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Technologies</label>
          <input
            type="text"
            class="form-control"
            value={technologie}
            placeholder="les technologies que vous allez utiliser"
            onChange={(e) => setTechnologie(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Début</label>
          <input
            type="date"
            class="form-control"
            value={dateDebut}
            placeholder="la date de début de votre pfa"
            onChange={(e) => setdateDebut(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Fin</label>
          <input
            type="date"
            class="form-control"
            value={dateFin}
            placeholder="la date de fin de votre pfa"
            onChange={(e) => setdateFin(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Ajouter PFE
        </button>
      </form>
    </div>
  );
};

export default Pfe;
