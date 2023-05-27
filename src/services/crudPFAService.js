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
export const addPFA = async (
  Titre,
  Description,
  Technologie,
  studentNumber,
  createdBy = localStorage.getItem("_id")
) => {
  try {
    await axios.post(
      `${REACT_APP_API_HOST}/PFAens`,
      {
        Titre,
        Description,
        Technologie,
        studentNumber,
        createdBy,
      },
      makeHeader()
    );
  } catch (err) {
    console.log(err);
  }
};
export const getPFAByEnseignant = (succ, fail) => {
  const idE = localStorage.getItem("_id");
  axios
    .get(`${REACT_APP_API_HOST}/PFA/enseignant/${idE}`, makeHeader())
    .then((response) => {
      succ(response.data);
    })
    .catch((error) => {
      fail(error.response);
    });
};
export const getPFAByStudent = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/getStudentsPFA`, makeHeader())
    .then((response) => {
      succ(response.data);
    })
    .catch((error) => {
      fail(error.response);
    });
};
export const deletePFA = (_id) => {
  axios
    .delete(`${REACT_APP_API_HOST}/PFAens/${_id}`, makeHeader())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updatePFA = (_id, payload) => {
  axios
    .put(
      `${REACT_APP_API_HOST}/PFAens/${_id}`,
      {
        ...payload,
      },
      makeHeader()
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      alert("erreur");
    });
};

export const getPFA = (succ, fail, technologie, idEns) => {
  console.log("tesetsetsetsetsetsetset");
  axios
    .get(
      `${REACT_APP_API_HOST}/PFA${
        technologie ? `?Technologie=${technologie}` : ""
      }${idEns ? `?idEns=${idEns}` : ""}`,
      makeHeader()
    )
    .then((response) => {
      succ(response.data);
    })
    .catch((error) => {
      fail(error.response);
    });
};
export const deletePFAAdmin = (_id) => {
  axios
    .delete(`${REACT_APP_API_HOST}/PFA/${_id}`, makeHeader())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updatePFAAdmin = (_id, statue) => {
  axios
    .put(
      `${REACT_APP_API_HOST}/PFA/${_id}`,
      {
        ...{
          statue: statue,
        },
      },
      makeHeader()
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      alert("erreur");
    });
};

export const getEnseignant = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/Enseignant`, makeHeader())
    .then((response) => {
      succ(response.data);
    })
    .catch((error) => {
      fail(error.response);
    });
};
export const AffectStudent = async (studentId, pfaId) => {
  try {
    await axios.put(
      `${REACT_APP_API_HOST}/PFA/AffectStudentPFA/${studentId}/${pfaId}`,
      {},
      makeHeader()
    );
  } catch (err) {
    console.log(err);
  }
};
