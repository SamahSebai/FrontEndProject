import React from "react";
import moment from "moment";
import "./LIGHT.css";

const init_cv = {
  compte: "",
  _id: "",
  firstName: "",
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
const InitItems = {
  general: { description: "", linkedInUrl: "", githubUrl: "", type_cv: "1" },
  experiences: {
    titre: "",
    description: "",
    technologies: "",
    nom_societe: "",
    type_exp: "STAGE D'ETE",
    emplacement: "",
    dateDebut: new Date(),
    dateFin: new Date(),
  },
  Education: {
    titre_univ: "",
    titre_diplome: "",
    mention: "Passable",
    description: "",
    dateDebut: new Date(),
    dateFin: new Date(),
  },
  certifications: {
    titre_certif: "",
    source_certif: "",
    description: "",
    emplacement: "",
    dateDebut: new Date(),
    dateFin: new Date(),
  },
  languages: { lang: "", level: "" },
  hard_skills: "",
  soft_skills: "",
  hobbys: "",
};

function CVLIGHT({ cv, user }) {
  return (
    <div
      name="cv-light"
      id="cv-container11"
      className="cv-container11"
      style={{
        marginLeft: "500px",
        width: "642px",
        border: "4px solid ",
        borderColor: "#f0a500",
      }}
    >
      <h1 id="cv-title">Curriculum Vitae</h1>

      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          information generale
        </h2>
        <p>prenom: {cv.compte.firstName}</p>
        <p>Nom de famille: {cv.compte.lastName}</p>
        <p>Email: {cv.compte.email}</p>
        <p>Adresse: {cv.compte.address}</p>
        <p>Spécialité: {cv.compte.Specialite}</p>
        <p> Classe: {cv.compte.classe}</p>
      </div>

      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Description
        </h2>
        <p>{cv.description}</p>
      </div>

      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Liens
        </h2>
        <div className="contact">
          <div className="contact-item">
            <img src="linkedin-icon.png" alt="LinkedIn" />
            <a href={cv.linkedInUrl}>{cv.linkedInUrl}</a>
          </div>
          <div className="contact-item">
            <img src="github-icon.png" alt="GitHub" />
            <a href={cv.githubUrl}>{cv.githubUrl}</a>
          </div>
        </div>
      </div>

      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Expériences
        </h2>
        <ul>
          {cv.experiences.map((experience, index) => (
            <li key={index}>
              <h3 id="cv-title">{experience.titre}</h3>
              <p>Description : {experience.description}</p>
              <p>Technologies : {experience.technologies}</p>
              <p>Nom de la société : {experience.nom_societe}</p>
              <p>Type d'expérience : {experience.type_exp}</p>
              <p>Emplacement : {experience.emplacement}</p>
              <p>
                Date de début :{" "}
                {moment(experience.dateDebut).format("YYYY-MM-DD")}
              </p>
              <p>
                Date de fin : {moment(experience.dateFin).format("YYYY-MM-DD")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Education
        </h2>
        <ul>
          {cv.Education.map((Education, index) => (
            <li key={index}>
              <h3 id="cv-title">{Education.titre_univ}</h3>
              <p>titre_diplome : {Education.titre_diplome}</p>
              <p>Montion : {Education.mention}</p>
              <p>Description : {Education.description}</p>
              <p>
                Date de début :{" "}
                {moment(Education.dateDebut).format("YYYY-MM-DD")}
              </p>
              <p>
                Date de fin : {moment(Education.dateFin).format("YYYY-MM-DD")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Education
        </h2>
        <ul>
          {cv.Education.map((Education, index) => (
            <li key={index}>
              <h3 id="cv-title">{Education.titre_univ}</h3>
              <p>titre_diplome : {Education.titre_diplome}</p>
              <p>Montion : {Education.mention}</p>
              <p>Description : {Education.description}</p>
              <p>
                Date de début :{" "}
                {moment(Education.dateDebut).format("YYYY-MM-DD")}
              </p>
              <p>
                Date de fin : {moment(Education.dateFin).format("YYYY-MM-DD")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          Certifications
        </h2>
        <ul>
          {cv.certifications.map((certification, index) => (
            <li key={index}>
              <h3 id="cv-title">{certification.titre_certif}</h3>
              <p>Source : {certification.source_certif}</p>
              <p>Description : {certification.description}</p>
              <p>Emplacement : {certification.emplacement}</p>
              <p>
                Date de début :{" "}
                {moment(certification.dateDebut).format("YYYY-MM-DD")}
              </p>
              <p>
                Date de fin :{" "}
                {moment(certification.dateFin).format("YYYY-MM-DD")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          languages
        </h2>
        <ul>
          {cv.languages.map((languages, index) => (
            <li key={index}>
              <h3 id="cv-title">{languages.lang}</h3>
              <p>level : {languages.level}</p>
            </li>
          ))}
        </ul>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          hard_skills
        </h2>
        <p>{cv.hard_skills}</p>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          soft_skills
        </h2>
        <p>{cv.soft_skills}</p>
      </div>
      <div id="section11" className="section11">
        <h2 id="cv-title" className="section-title">
          hobbys
        </h2>
        <p>{cv.hobbys}</p>
      </div>
    </div>
  );
}

export default CVLIGHT;
