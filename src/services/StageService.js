import axios from "axios";

const { REACT_APP_API_HOST } = process.env;
const makeHeader = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const addStage = async (
  Titre,
  Sujet,
  Societe,
  Specialite,
  Technologie,
  DateDebut,
  DateFin
) => {
  try {
    const res = await axios.post(
      `${REACT_APP_API_HOST}/StageEte`,
      {
        Titre,
        Sujet,
        Societe,
        Specialite,
        Technologie,
        DateDebut,
        DateFin,
      },
      makeHeader()
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
