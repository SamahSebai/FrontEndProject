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
  axios
    .post(`${REACT_APP_API_HOST}/login`, { email, password })
    .then((response) => {
      console.log("Login successful!", response.data);
      localStorage.setItem("token", response.data.token);
      window.location.reload();
      return response.data;
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
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
