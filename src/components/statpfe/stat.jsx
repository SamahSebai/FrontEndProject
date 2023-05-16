import React, { useEffect, useState } from "react";
import Statpfetous from "./Statpfetous";
import "./Statpfe.css";

import {
  getStatByEnsei,
  getStatByPays,
  getStatBySociete,
  getStatByTech,
} from "../../services/PfeService";

function StatsBySociete() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    getStatBySociete((data) => setstats(data.data));
  }, []);
  return (
    <div>
      <Statpfetous
        libelle="Stats PFE By Societe"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByTech() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    getStatByTech((data) => {
      setstats(data.data);
    });
  }, []);

  return (
    <div>
      <Statpfetous
        libelle="Stats PFE By Technologies"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByPays() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    getStatByPays((data) => setstats(data.data));
  }, []);

  return (
    <div>
      <Statpfetous
        libelle="Stats PFE By Pays"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByEnseig() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    getStatByEnsei((data) => {
      setstats(data.data);
    });
  }, []);

  return (
    <div>
      <Statpfetous
        libelle="Stats PFE By Enseignants"
        labels={stats.map((stat) => stat.name)}
        values={stats.map((stat) => stat.nb)}
      />
    </div>
  );
}

function Stat() {
  return (
    <div className="stats">
      <h1>Statistiques sur les PFEs</h1>
      <br />
      <StatsBySociete />
      <br />
      <StatsByTech />
      <br />
      <StatsByEnseig />
      <br />
      <StatsByPays />
    </div>
  );
}

export default Stat;
