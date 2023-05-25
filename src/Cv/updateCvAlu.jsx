import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Updatecv.css";
import { makeBearer } from "../services/MakeHeader";
import { makeDate2 } from "../functions/dates";

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

function UpdatecvAlu() {
  const navigate = useNavigate();
  const [cv, setCV] = useState({ ...init_cv });

  const [general, setGeneral] = useState({ ...InitItems.general });
  const [experiences, set_experiences] = useState([InitItems.experiences]);
  const [Education, set_Education] = useState([InitItems.Education]);
  const [certifications, set_certifications] = useState([
    InitItems.certifications,
  ]);
  const [languages, set_languages] = useState([InitItems.languages]);
  const [hard_skills, set_hard_skills] = useState([InitItems.hard_skills]);
  const [soft_skills, set_soft_skills] = useState([InitItems.soft_skills]);
  const [hobbys, set_hobbys] = useState([InitItems.hobbys]);

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

  useEffect(() => {
    setGeneral({
      description: cv?.description,
      linkedInUrl: cv?.linkedInUrl,
      githubUrl: cv?.githubUrl,
      type_cv: cv?.type_cv,
    });
    set_experiences(cv?.experiences);
    set_Education(cv?.Education);
    set_certifications(cv?.certifications);
    set_languages(cv?.languages);
    set_hard_skills(cv?.hard_skills);
    set_soft_skills(cv?.soft_skills);
    set_hobbys(cv?.hobbys);
  }, [cv]);

  const handle_submit = async () => {
    const newCv = {
      ...cv,
      ...general,
      experiences,
      Education,
      certifications,
      languages,
      hard_skills,
      soft_skills,
      hobbys,
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/Api/V1/Cv/${cv._id}`,
        { ...newCv },
        makeBearer()
      );
      console.log(res);
      navigate("/MainCv");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddItem = (items, init, setItems) => {
    setItems([...items, init]);
  };

  const handleDeleteItem = (items, setItems, index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handle_change_general = (e) => {
    const { name, value } = e.target;
    setGeneral({ ...general, [name]: value });
  };

  const handle_simple_change = (e, index, items, setItems) => {
    const { value } = e.target;
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handle_change_complex = (e, index, items, setItems) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    setItems(newItems);
  };

  return (
    <div className="container1">
      <span className="formtitle1">Mise à jour de Curriculum Vitae </span>
      <h2>General Informations</h2>
      <div className="row">
        <div className="col-6">
          <label>LinkedIn Url</label>
          <input
            type="text"
            name="linkedInUrl"
            value={general?.linkedInUrl}
            onChange={handle_change_general}
          />
        </div>

        <div className="col-6">
          <label>Github Url</label>
          <input
            type="text"
            name="githubUrl"
            value={general?.githubUrl}
            onChange={handle_change_general}
          />
        </div>
        <div className="col-12">
          <label>Biography</label>
          <textarea
            rows={3}
            type="text"
            name="description"
            value={general?.description}
            onChange={handle_change_general}
          />
        </div>
        <div className="col-12">
          <select
            name="type_cv"
            value={general?.type_cv}
            onChange={handle_change_general}
          >
            <option value="1">Light theme CV</option>
            <option value="2">Dark theme CV</option>
          </select>
        </div>
      </div>

      <h2>Experiences</h2>
      <button
        onClick={() => {
          handleAddItem(experiences, InitItems.experiences, set_experiences);
        }}
      >
        Add new Experience
      </button>

      {experiences?.map((exp, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Experience N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(experiences, set_experiences, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <label>titre</label>
              <input
                rows={3}
                type="text"
                name="titre"
                value={exp.titre}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-6">
              <label>technologies</label>
              <input
                rows={3}
                type="text"
                name="technologies"
                value={exp.technologies}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-12">
              <label>description</label>
              <textarea
                rows={3}
                type="text"
                name="description"
                value={exp?.description}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-4">
              <label>nom_societe</label>
              <input
                rows={3}
                type="text"
                name="nom_societe"
                value={exp.nom_societe}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-4">
              <label>type_exp</label>
              <select
                rows={3}
                type="text"
                name="type_exp"
                value={exp.type_exp}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              >
                <option value="STAGE D'ETE">STAGE D'ETE</option>
                <option value="PFE">PFE</option>
                <option value="PFA">PFA</option>
                <option value="Vie professionnelle">Vie professionnelle</option>
              </select>
            </div>

            <div className="col-4">
              <label>emplacement</label>
              <input
                rows={3}
                type="text"
                name="emplacement"
                value={exp.emplacement}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-6">
              <label>dateDebut</label>
              <input
                rows={3}
                type="date"
                name="dateDebut"
                value={makeDate2(exp.dateDebut)}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>

            <div className="col-6">
              <label>dateFin</label>
              <input
                rows={3}
                type="date"
                name="dateFin"
                value={makeDate2(exp.dateFin)}
                onChange={(e) => {
                  handle_change_complex(e, index, experiences, set_experiences);
                }}
              />
            </div>
          </div>
        );
      })}

      <h2>Education</h2>
      {<p>you can't add education</p>}

      {Education?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Education N°{index + 1}</h3>
            {<p className="col-2">you can't delete education</p>}
            <div className="col-6">
              <label>titre_univ</label>
              <input
                rows={3}
                type="text"
                name="titre_univ"
                value={element.titre_univ}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              />
            </div>

            <div className="col-6">
              <label>titre_diplome</label>
              <input
                rows={3}
                type="text"
                name="titre_diplome"
                value={element.titre_diplome}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              />
            </div>

            <div className="col-12">
              <label>description</label>
              <textarea
                rows={3}
                type="text"
                name="description"
                value={element?.description}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              />
            </div>

            <div className="col-4">
              <label>mention</label>
              <select
                rows={3}
                type="text"
                name="mention"
                value={element.mention}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              >
                <option value="Très bien">Très bien</option>
                <option value="Bien">Bien</option>
                <option value="Assez bien">Assez bien</option>
                <option value="Passable">Passable</option>
              </select>
            </div>

            <div className="col-4">
              <label>dateDebut</label>
              <input
                rows={3}
                type="date"
                name="dateDebut"
                value={makeDate2(element.dateDebut)}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              />
            </div>

            <div className="col-4">
              <label>dateFin</label>
              <input
                rows={3}
                type="date"
                name="dateFin"
                value={makeDate2(element.dateFin)}
                onChange={(e) => {
                  handle_change_complex(e, index, Education, set_Education);
                }}
              />
            </div>
          </div>
        );
      })}

      <h2>Certifications</h2>
      <button
        onClick={() => {
          handleAddItem(
            certifications,
            InitItems.certifications,
            set_certifications
          );
        }}
      >
        Add new certifications
      </button>

      {certifications?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Certification N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(certifications, set_certifications, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <label>titre_certif</label>
              <input
                rows={3}
                type="text"
                name="titre_certif"
                value={element.titre_certif}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>

            <div className="col-6">
              <label>source_certif</label>
              <input
                rows={3}
                type="text"
                name="source_certif"
                value={element.source_certif}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>

            <div className="col-12">
              <label>description</label>
              <textarea
                rows={3}
                type="text"
                name="description"
                value={element?.description}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>

            <div className="col-12">
              <label>emplacement</label>
              <input
                rows={3}
                type="text"
                name="emplacement"
                value={element.emplacement}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>

            <div className="col-6">
              <label>dateDebut</label>
              <input
                rows={3}
                type="date"
                name="dateDebut"
                value={makeDate2(element.dateDebut)}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>

            <div className="col-6">
              <label>dateFin</label>
              <input
                rows={3}
                type="date"
                name="dateFin"
                value={makeDate2(element.dateFin)}
                onChange={(e) => {
                  handle_change_complex(
                    e,
                    index,
                    certifications,
                    set_certifications
                  );
                }}
              />
            </div>
          </div>
        );
      })}

      <h2>Languages</h2>
      <button
        onClick={() => {
          handleAddItem(languages, InitItems.languages, set_languages);
        }}
      >
        Add new Language
      </button>

      {languages?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Language N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(languages, set_languages, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <label>lang</label>
              <input
                rows={3}
                type="text"
                name="lang"
                value={element.lang}
                onChange={(e) => {
                  handle_change_complex(e, index, languages, set_languages);
                }}
              />
            </div>

            <div className="col-6">
              <label>level</label>
              <input
                rows={3}
                type="text"
                name="level"
                value={element.level}
                onChange={(e) => {
                  handle_change_complex(e, index, languages, set_languages);
                }}
              />
            </div>
          </div>
        );
      })}

      <h2>Hard Skills</h2>
      <button
        onClick={() => {
          handleAddItem(hard_skills, InitItems.hard_skills, set_hard_skills);
        }}
      >
        Add new Hard Skill
      </button>

      {hard_skills?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Hard Skills N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(hard_skills, set_hard_skills, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <label>skill</label>
              <input
                rows={3}
                type="text"
                value={element}
                onChange={(e) => {
                  handle_simple_change(e, index, hard_skills, set_hard_skills);
                }}
              />
            </div>
          </div>
        );
      })}
      <h2>Soft Skills</h2>
      <button
        onClick={() => {
          handleAddItem(soft_skills, InitItems.soft_skills, set_soft_skills);
        }}
      >
        Add new Soft Skill
      </button>

      {soft_skills?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Soft Skills N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(soft_skills, set_soft_skills, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <input
                rows={3}
                type="text"
                value={element}
                onChange={(e) => {
                  handle_simple_change(e, index, soft_skills, set_soft_skills);
                }}
              />
            </div>
          </div>
        );
      })}

      <h2>Centre D'intérret</h2>
      <button
        onClick={() => {
          handleAddItem(hobbys, InitItems.hobbys, set_hobbys);
        }}
      >
        Add new Interret
      </button>

      {hobbys?.map((element, index) => {
        return (
          <div className="row w-100">
            <h3 className="col-8">Interret N°{index + 1}</h3>
            <button
              className="col-2"
              onClick={() => {
                handleDeleteItem(hobbys, set_hobbys, index);
              }}
            >
              Delete
            </button>
            <div className="col-6">
              <input
                rows={3}
                type="text"
                value={element}
                onChange={(e) => {
                  handle_simple_change(e, index, hobbys, set_hobbys);
                }}
              />
            </div>
          </div>
        );
      })}

      {/* {error && <div className="error">Erreur</div>} */}

      <div className="button-container">
        <button type="button" onClick={() => {}}>
          Annuler
        </button>
        <button type="submit" onClick={handle_submit}>
          Enregister
        </button>
      </div>
    </div>
  );
}

export default UpdatecvAlu;
