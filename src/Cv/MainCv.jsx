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
  useEffect(() => {
    const _id = localStorage.getItem("_id");
    const fetchCv = async () => {
      try {
        const resG = await axios.get(
          `http://localhost:4000/Api/V1/CvByStudent/${_id}`,
          makeBearer()
        );
        setCV(resG.data.cv);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCv();
  }, []);
  // here import the cv like updatecv
  return (
    <div>{cv.type_cv === 1 ? <CVLIGHT cv={cv} /> : <CVDARK cv={cv} />}</div>
  );
}

export default MainCv;
