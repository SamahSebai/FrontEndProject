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

export const addEtudiant = async (
  firstName,
  lastName,
  email,
  password,
  niveau,
  classe,
  datedeNaissance,
  role,
  getStudents,
  fail
) => {
  try {
    console.log(datedeNaissance);
    await axios.post(
      `${REACT_APP_API_HOST}/register`,
      {
        firstName,
        lastName,
        email,
        password,
        niveau,
        classe,
        datedeNaissance,
        role,
      },
      makeHeader()
    );
    getStudents();
  } catch (err) {
    console.log(err);
    fail(err.response);
  }
};

export const getEtudiants = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/Etudiant`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
export const getAlumnis = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/Alumni`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};

export const deleteEtudiant = (_id, getStudents) => {
  console.log(_id);
  axios
    .delete(`${REACT_APP_API_HOST}/Etudiant/${_id}`, makeHeader())
    .then((response) => {
      console.log(response.data);
      getStudents();
    })
    .catch((error) => {
      alert("erreur");
    });
};

export const updateEtudiant = (etudiant, getStudents) => {
  console.log(etudiant);
  axios
    .put(
      `${REACT_APP_API_HOST}/EtudiantAdmin/${etudiant.id}`,
      {
        ...etudiant,
      },
      makeHeader()
    )
    .then((response) => {
      console.log(response.data);
      getStudents();
    })
    .catch((error) => {
      alert("erreur");
    });
};
