import React, { useState } from "react";
import "./Pfe.css";
import { addPfe } from "../../services/PfeService";
import { makeDate2 } from "../../DateParse";

const Pfe = () => {
  const [titre, setTitre] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [sujet, setsujet] = useState("");
  const [societe, setsociete] = useState("");
  const [pays, setpays] = useState("");
  const [DateDebut, setdateDebut] = useState("");
  const [DateFin, setdateFin] = useState("");
  const [technologie, setTechnologie] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPfe(
      titre,
      sujet,
      societe,
      specialite,
      pays,
      technologie,
      DateDebut,
      DateFin
    );
    console.log(DateDebut);
    console.log(DateFin);
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
            placeholder="le titre de votre projet pfe"
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Sujet du PFE</label>
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
          <label for="">Pays</label>
          <select
            class="form-control"
            required="required"
            value={pays}
            onChange={(e) => {
              setpays(e.target.value);
            }}
          >
            <option selected />
            <option value="Tunisie">Tunisie</option>
            <option value="Ailleurs">Ailleurs</option>
          </select>
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
            value={makeDate2(DateDebut)}
            placeholder="la date de début de votre pfa"
            onChange={(e) => setdateDebut(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Fin</label>
          <input
            type="date"
            class="form-control"
            value={makeDate2(DateFin)}
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
