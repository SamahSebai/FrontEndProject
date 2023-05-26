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
export const getEtudiantsPublic = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/Etudiant/public`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
export const getPFAbyStudentId = async (_id) => {
  try {
    const response = await axios.get(
      `${REACT_APP_API_HOST}/PFA/student/${_id}`,
      makeHeader()
    );
    return response.data;
  } catch (error) {
    console.log("erreur");
  }
};
export const getStageEtebyStudentId = async (_id) => {
  try {
    const response = await axios.get(
      `${REACT_APP_API_HOST}/StageEte/student/${_id}`,
      makeHeader()
    );
    return response.data;
  } catch (error) {
    console.log("erreur");
  }
};
export const getEtudiantById = async (_id) => {
  try {
    const response = await axios.get(
      `${REACT_APP_API_HOST}/Etudiant/${_id}`,
      makeHeader()
    );
    return response.data;
  } catch (error) {
    console.log("erreur");
  }
};
export const getCVbyStudentId = async (_id) => {
  try {
    const response = await axios.get(
      `${REACT_APP_API_HOST}/CvByStudent/${_id}`,
      makeHeader()
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
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

export const academicProgress = async (_id, levelDiplome) => {
  await axios.put(
    process.env.REACT_APP_API_HOST + `/academicProgress/${_id}`,
    levelDiplome,
    makeHeader()
  );
};

export const updateSeason = async (profil) => {
  await axios.put(
    process.env.REACT_APP_API_HOST + "/updateSeason",
    profil,
    makeHeader()
  );
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

export const importExcel = async (data) => {
  console.log(data, "file csv");
  const result = await axios.post(`${REACT_APP_API_HOST}/uploadFile`, data);
  return result.data;
};
