import React, { useEffect, useState } from "react";
import axios from "axios";



const VoirCv =()=>{
    const [CVs,setCV]=useState([])
    useEffect(() => {
        axios
          .get("http://localhost:3000/Cv", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            console.log("Getting", res.data);
            setCV(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
    return (
        <div>
           


            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                </div>
              </div>
              <div className="flex-auto flex justify-between">
                <div className="w-full lg:w-6/12 px-4">
                  <h1 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                    Voir CVs
                  </h1>
                </div>

              </div>
              <div className="row">
  {CVs?.map((cv, index) => (
    <div className="col-lg-6 mb-4" key={index}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">CV</h5>

          <div>
            <strong>Education:</strong>
            {cv?.Education?.map((edu, eduIndex) => (
              <p
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                key={eduIndex}
              >
                {Object.entries(edu).map(([key, value]) => `${key}: ${value}`).join(", ")}
              </p>
            ))}

            <strong>Certifications:</strong>
            {cv?.certifications?.map((cert, certIndex) => (
              <p
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                key={certIndex}
              >
                {Object.entries(cert).map(([key, value]) => `${key}: ${value}`).join(", ")}
              </p>
            ))}

            <strong>Experiences:</strong>
            {cv?.experiences?.map((exp, expIndex) => (
              <p
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                key={expIndex}
              >
                {Object.entries(exp).map(([key, value]) => `${key}: ${value}`).join(", ")}
              </p>
            ))}

            <strong>Languages:</strong>
            {cv?.languages?.map((lang, langIndex) => (
              <p
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                key={langIndex}
              >
                {Object.entries(lang).map(([key, value]) => `${key}: ${value}`).join(", ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            </div>
        </div>
    )
}

export default VoirCv;