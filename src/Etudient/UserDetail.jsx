import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Button, FormControlLabel, Switch } from "@mui/material";
import {
  getCVbyStudentId,
  getEtudiantById,
  getPFAbyStudentId,
  getStageEtebyStudentId,
} from "../services/crudEtudService";
import { useParams } from "react-router-dom";

export default function UserDetail() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasDeplome, setHasDeplome] = useState("Yes");
  const [cv, setCV] = useState([]);
  const [pfs, setPf] = useState([]);
  const [internships, setInternships] = useState([]);

  const { id } = useParams();
  const hrStyle = {
    height: "5px",
    borderWidth: "0",
    backgroundColor: "#00A4BD",
  };
  let isMounted = true;

  async function fetchUser() {
    const etudiantData = await getEtudiantById(id);
    setPerson(etudiantData);
  }

  async function fetchCV() {
    const etudiantData = await getCVbyStudentId(id);
    if (etudiantData) {
      setCV(etudiantData.cv);
    }
  }

  async function fetchPF() {
    const pfaData = await getPFAbyStudentId(id);
    setPf(pfaData);
  }
  async function fetchSummerInternship() {
    const stageData = await getStageEtebyStudentId(id);
    setInternships(stageData);
  }
  useEffect(() => {
    setLoading(true);
    if (id) {
      fetchUser();
      fetchPF();
      fetchSummerInternship();
      fetchCV();
      console.log(person);
    } else {
      if (isMounted) setLoading(false);
    }
    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, [id]);

  const downloadCV = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(new Blob([cv]));
    downloadLink.download = "CV.pdf";
    downloadLink.click();
  };
  return (
    <>
      {loading ? (
        <p>Loading page content...</p>
      ) : (
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between"></div>
            </div>
            <div className="flex-auto flex justify-between">
              <div className="w-full lg:w-6/12 px-4">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>First Name: </strong>{" "}
                    {person ? person.firstName : ""}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Last Name: </strong> {person ? person.lastName : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Email: </strong> {person ? person.email : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Role:</strong> {person ? person.role : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Class Level: </strong> {person ? person.niveau : ""}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Has Dimplome: </strong>{" "}
                    {hasDeplome ? hasDeplome : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <p
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <strong>Birthday: </strong>{" "}
                    {person ? person.datedeNaissance : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between"></div>
            </div>
            <div className="flex-auto flex justify-between">
              <div className="w-full lg:w-6/12 px-4">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  PFA & PFE Section
                </h6>
              </div>
            </div>
            {pfs ? (
              pfs.map((pf) => (
                <>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Title: </strong> {pf ? pf.Titre : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Technology: </strong>{" "}
                          {pf ? pf.Technologie : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Disponibilité </strong>{" "}
                          {pf ? pf.Disponibilite.toString() : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Description </strong>{" "}
                          {pf ? pf.Description : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Start Date </strong> {pf ? pf.createdAt : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>End Date </strong>{" "}
                          {person ? pf.updatedAt : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                </>
              ))
            ) : (
              <p>No PFE/PFA.</p>
            )}
          </div>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between"></div>
            </div>
            <div className="flex-auto flex justify-between">
              <div className="w-full lg:w-6/12 px-4">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Summer Internships
                </h6>
              </div>
            </div>
            {internships ? (
              internships.map((internship) => (
                <>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Title: </strong>{" "}
                          {internship ? internship.Titre : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Subject </strong>{" "}
                          {internship ? internship.Sujet : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Specialite: </strong>{" "}
                          {internship ? internship.Specialite : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Societe </strong>{" "}
                          {internship ? internship.Societe : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Technology: </strong>{" "}
                          {internship ? internship.Technologie : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Disponibility </strong>{" "}
                          {internship
                            ? internship.Disponibilite.toString()
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>Start Date </strong>{" "}
                          {internship ? internship.createdAt : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <p
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <strong>End Date </strong>{" "}
                          {internship ? internship.updatedAt : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                  <br></br>
                </>
              ))
            ) : (
              <p>No Summer Internship.</p>
            )}
          </div>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between"></div>
            </div>
            <div className="flex-auto flex justify-between">
              <div className="w-full lg:w-6/12 px-4">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  CV
                </h6>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                {console.log("cv", cv)}
                <div className="relative w-full mb-3">
                  {cv !== null && (
                    <>
                      <strong>Education: </strong>

                      {cv?.Education?.map((edu) =>
                        Object.entries(edu).map(([key, value]) => {
                          return (
                            <p
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              {`${key}: ${value}`}
                            </p>
                          );
                        })
                      )}
                      <strong>certifications: </strong>

                      {cv?.certifications?.map((edu) =>
                        Object.entries(edu).map(([key, value]) => {
                          return (
                            <p
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              {`${key}: ${value}`}
                            </p>
                          );
                        })
                      )}
                      <strong>experiences : </strong>

                      {cv?.experiences?.map((edu) =>
                        Object.entries(edu).map(([key, value]) => {
                          return (
                            <p
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              {`${key}: ${value}`}
                            </p>
                          );
                        })
                      )}
                      <strong>languages : </strong>

                      {cv?.languages?.map((edu) =>
                        Object.entries(edu).map(([key, value]) => {
                          return (
                            <p
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              {`${key}: ${value}`}
                            </p>
                          );
                        })
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
