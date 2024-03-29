import React, { useState } from "react";
import { addStage } from "../../services/StageService";
import { makeDate2 } from "../../DateParse";

const Stage = () => {
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

    if (start && end && end.getMonth() - start.getMonth() >= 1) {
      addStage(
        titre,
        sujet,
        societe,
        specialite,
        technologie,
        dateDebut,
        dateFin
      );
    } else {
      alert("Invalid date range");
    }
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <form className="container1" onSubmit={handleSubmit}>
        <legend>Stage d'été</legend>

        <div class="form-group">
          <label for="">Titre</label>
          <input
            name="title"
            type="text"
            class="form-control"
            value={titre}
            placeholder="le titre de votre stage d'été"
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Description</label>
          <input
            name="description"
            type="text"
            class="form-control"
            value={sujet}
            placeholder="la description du stage"
            onChange={(e) => setsujet(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Societé</label>
          <input
            name="societe"
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
            name="specialite"
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
            name="technologie"
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
            name="dateDebut"
            type="date"
            class="form-control"
            value={makeDate2(dateDebut)}
            placeholder="la date de début de votre stage"
            onChange={(e) => setdateDebut(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Fin</label>
          <input
            name="dateFin"
            type="date"
            class="form-control"
            value={makeDate2(dateFin)}
            placeholder="la date de fin de votre stage"
            onChange={(e) => setdateFin(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Ajouter Stage
        </button>
      </form>
    </div>
  );
};

export default Stage;
