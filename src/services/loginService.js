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

export const LoginFunc = (email, password) => {
  console.log("i am here 1")
  axios
    .post(`${REACT_APP_API_HOST}/login`, { email, password })
    .then((response) => {
      console.log("i am here 2")
      console.log("Login successful!", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("_id", response.data.user._id);
      window.location.reload();
      return response.data;
    })
    .catch((error) => {
      console.log("i am here 3")
      console.error("Error logging in:", error);
    });
};

export const getCrudEtudiant = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data.CrudEtudiant);
    return res.data.CrudEtudiant;
  } catch (err) {
    console.log(err);
  }
};

export const getCrudEnseignant = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data.CrudEnseignant);
    return res.data.CrudEnseignant;
  } catch (err) {
    console.log(err);
  }
};

export const getCrudEvent = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data.CrudEvent);
    return res.data.CrudEvent;
  } catch (err) {
    console.log(err);
  }
};

export const getUserByRole = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data.role);
    return res.data.role;
  } catch (err) {
    console.log(err);
  }
};
export const getEtat = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data.etat);
    return res.data.etat;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (succ, fail) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/Api/V1/profile",
      makeHeader()
    );
    succ(res.data._id);
    return res.data._id;
  } catch (err) {
    console.log(err);
  }
};
