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

export const addPfe = async (
  Titre,
  Sujet,
  Societe,
  Specialite,
  Pays,
  Technologie,
  DateDebut,
  DateFin
) => {
  try {
    const res = await axios.post(
      `${REACT_APP_API_HOST}/PFEe`,
      {
        Titre,
        Sujet,
        Societe,
        Specialite,
        Pays,
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

export const getpfenonaffecte = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/enseignant_PFE`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
export const getPFEs = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/PFE`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};

export const getpfeaffecte = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/enseignant_affecte`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
export const getStatByPays = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/PFEStatPays`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};

export const getNotifs = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/notifs`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};

export const selectpfe = async (_id, toggle) => {
  axios
    .get(`${REACT_APP_API_HOST}/selectpfe/${_id}`, makeHeader())
    .then((response) => {
      console.log(response.data);
      toggle();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const etudiantidpfe = async (_id, toggle) => {
  axios
    .get(`${REACT_APP_API_HOST}/pfe/${_id}`, makeHeader())
    .then((response) => {
      console.log(response.data);
      toggle();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getStatBySociete = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/PFEStatSoc`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};

export const getStatByEnsei = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/PFEStatEns`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
export const getStatByTech = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/PFEStatTech`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
