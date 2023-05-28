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

export const addSaison = async (Description, DateDebut, Datefin) => {
  try {
    const res = await axios.post(
      `${REACT_APP_API_HOST}/Saison`,
      {
        Description,
        DateDebut,
        Datefin,
      },
      makeHeader()
    );
    window.location.reload();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const getSaison = (succ, fail) => {
  axios
    .get(`${REACT_APP_API_HOST}/Saison`, makeHeader())
    .then((response) => {
      console.log(response.data);
      succ(response.data);
    })
    .catch((error) => {
      alert("erreur");
      fail(error.response);
    });
};
