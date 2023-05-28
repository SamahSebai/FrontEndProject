import React, { useState } from "react";
import { makeDate2 } from "../../DateParse";
import { addSaison } from "../../services/Saisonservice";

const Saison = () => {
  const [description, setdescription] = useState("");
  const [datedebut, setdatedebut] = useState("");
  const [datefin, setdatefin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const x = new Date(datedebut);
    const y = new Date(datefin);
    if (
      y.getFullYear() > x.getFullYear() &&
      x.getMonth() === 8 &&
      y.getMonth() === 5
    ) {
      addSaison(description, datedebut, datefin);
    } else {
      alert("vous ne pouvez pas ajouter la saison");
    }
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <form className="container1" onSubmit={handleSubmit}>
        <legend>PFE</legend>

        <div class="form-group">
          <label for="">Description</label>
          <input
            type="text"
            class="form-control"
            value={description}
            placeholder="la description de l'année"
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Début</label>
          <input
            type="date"
            class="form-control"
            value={makeDate2(datedebut)}
            placeholder="la date de début de la saison universitaire"
            onChange={(e) => {
              setdatedebut(e.target.value);
              console.log(e.target.value);
              const year = new Date(e.target.value);
              console.log(year.getMonth());
            }}
          />
        </div>

        <div class="form-group">
          <label for="">Date de Fin</label>
          <input
            type="date"
            class="form-control"
            value={makeDate2(datefin)}
            placeholder="la date de fin de la saison universitaire"
            onChange={(e) => {
              setdatefin(e.target.value);
              console.log(e.target.value);
              const year = new Date(e.target.value);
              console.log(year.getMonth());
            }}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Ajouter Saison Universitaire
        </button>
      </form>
    </div>
  );
};

export default Saison;
