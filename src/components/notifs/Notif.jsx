import React, { useEffect, useState } from "react";
import { getNotifs } from "../../services/PfeService";

const Notif = () => {
  const [notifs, setnotifs] = useState([]);

  useEffect(() => {
    getNotifs((data) => setnotifs(data.data));
  }, []);
  return (
    <div>
      {notifs.map((notif) => (
        <div key={notif._id}>
          <p>{notif.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Notif;
