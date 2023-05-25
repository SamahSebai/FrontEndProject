import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeBearer } from "../services/MakeHeader";
import CVLIGHT from "./CVLIGHT";
import CVDARK from "./CVDARK";

const init_cv = {
  compte: "",
  _id: "",
  description: "",
  linkedInUrl: "",
  githubUrl: "",
  type_cv: 1,
  experiences: [],
  Education: [],
  certifications: [],
  languages: [],
  hard_skills: [],
  soft_skills: [],
  hobbys: [],
};

function MainCv() {
  const [cv, setCV] = useState({ ...init_cv });
  const [user, setUser] = useState({});
  useEffect(() => {
    const _idCv = localStorage.getItem("_idCv");
    const fetchCv = async () => {
      try {
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/CvByid/${_idCv}`,
          makeBearer()
        );
        console.log(resG.data.user);
        console.log(resG.data.user);
        console.log(resG.data.user);
        setUser(resG.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    const _id = localStorage.getItem("_id");
    const fetchCv1 = async () => {
      try {
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/CvByStudent/${_id}`,
          makeBearer()
        );
        setCV(resG.data.cv);
        console.log("this is cv", resG.data.cv.type_cv);
        setUser(resG.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCv1();
    fetchCv();
  }, []);

  useEffect(() => {}, []);
  // here import the cv like updatecv
  return (
    <div>
      {cv.type_cv === 2 ? (
        <CVDARK cv={cv} user={user} />
      ) : (
        <CVLIGHT cv={cv} user={user} />
      )}
    </div>
  );
}

export default MainCv;
