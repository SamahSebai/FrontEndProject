import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import "./changepass.css";
import { useMemo } from "react";

export default function Changepass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [userPassword, setUserPassword] = useState("");

  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  console.log(userId);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/Api/V1//profile`, config);
      setUserPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };
  fetchUser();
}, [userId, config]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword === "") {
      setError(true);
      return;
    }

    if (password === "") {
      setError(true);
      return;
    }

    if (password !== confirmNewPassword) {
      setError(true);
      return;
    }
    if (currentPassword !== userPassword) {
      setError(true);
      return;
    }
    

    try {
      setError(false);
      const res = await axios.put(`http://localhost:4000/Api/V1/updateuser/${userId}`, {
        password,
      },config);
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <form className="containerAhlem" onSubmit={handleSubmit}>
      <span className="formtitleAhlem">Reset Password </span>
      <div>
        <label htmlFor="current-password">Current Password:</label>
        <input
          type="password"
          id="current-password"
          className="passAhlem"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          className="passAhlem"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirm-new-password">Confirm New Password:</label>
        <input
          type="password"
          id="confirm-new-password"
          className="passAhlem"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />
      </div>
      {error && <div className="error">Please make sure your Current Password correct , your passwords match and are not blank.</div>}
      <button type="submit">Submit</button>
    </form>
  );
}
