import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaCheckSquare,
  FaChartLine,
  FaDiagnoses,
  FaFileMedical,
  FaGlasses,
  FaUserTie,
} from "react-icons/fa";
import { MdPassword, MdEvent, MdEmojiPeople, MdLogout } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";

const SideMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    // Reload the page to reflect the logout state
    window.location.reload();
  };

  const toggle = () => setIsOpen(!isOpen);
  const menuItemADMIN = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/students",
      name: "Crud Students",
      icon: <FaUserAlt />,
    },
    {
      path: "/enseignants",
      name: "Crud Enseignants",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/events",
      name: "Crud_Events",
      icon: <MdEvent />,
    },
    {
      path: "/registerAlumni",
      name: "Alumni",
      icon: <MdEmojiPeople />,
    },
    {
      path: "/valideralumni",
      name: "Valider invité",
      icon: <FaCheckSquare />,
    },
    {
      path: "/statistiques",
      name: "statistiques",
      icon: <FaChartLine />,
    },
    {
      path: "/Dexpert",
      name: "expert_requests",
      icon: <FaGlasses />,
    },
    {
      path: "/Dvacation",
      name: "Vacation_requests",
      icon: <FaUserTie />,
    },
    {
      path: "/listepfe",
      name: "Liste des PFEs",
      icon: <MdEmojiPeople />,
    },
    {
      path: "/statistiquespfe",
      name: "Statistiques des pfes",
      icon: <MdEmojiPeople />,
    },
    {
      path: "/adminList",
      name: "Droit d'accés",
      icon: <MdPassword />,
    },
    {
      path: "/resetPassword",
      name: "Reset_Password",
      icon: <MdPassword />,
    },
    {
      path: "/ajoutersaison",
      name: "Ajouter saison universitaire",
      icon: <FaTh />,
    },
    {
      path: "/pfa-admin",
      name: "pfa admin",
      icon: <FaTh />,
    },
  ];
  const menuItemEtudiant = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaTh />,
    },
    {
      path: "/updateUser",
      name: "updateUser",
      icon: <GrUpdate />,
    },
    {
      path: "/UpdateCV",
      name: "Update_CV",
      icon: <GrUpdate />,
    },

    {
      path: "/MainCv",
      name: "Show_CV",
      icon: <FaTh />,
    },
    {
      path: "/addPFE",
      name: "add_PFE",
      icon: <FaProjectDiagram />,
    },
    {
      path: "/addStage",
      name: "add_Stage_été",
      icon: <AiOutlineProject />,
    },
    {
      path: "/publicStudents",
      name: "public Students",
      icon: <MdPassword />,
    },
    {
      path: "/AllEvents",
      name: "All Events",
      icon: <MdPassword />,
    },
    {
      path: "/resetPassword",
      name: "Reset Password",
      icon: <MdPassword />,
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: <MdPassword />,
    },
    {
      path: "/pfa",
      name: "Pfa",
      icon: <FaTh />,
    },
  ];
  const menuItemAlumni = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaTh />,
    },
    {
      path: "/updateUser",
      name: "updateUser",
      icon: <FaTh />,
    },
    {
      path: "/demande",
      name: "Demandes",
      icon: <FaFileMedical />,
    },
    {
      path: "/addblog",
      name: "Create_Blog",
      icon: <FaDiagnoses />,
    },
    {
      path: "/showblogs",
      name: "Show_Blogs",
      icon: <FaHandsHelping />,
    },
    {
      path: "/UpdateCV",
      name: "Update CV",
      icon: <GrUpdate />,
    },

    {
      path: "/resetPassword",
      name: "Reset_Password",
      icon: <MdPassword />,
    },
  ];

  const menuItemEns = [
    {
      path: "/pfenonaffecte",
      name: "Liste des PFEs",
      icon: <FaTh />,
    },
    {
      path: "/events",
      name: "Events",
      icon: <FaTh />,
    },
    {
      path: "/VoirCV",
      name: "Voir_CV",
      icon: <FaTh />,
    },
    {
      path: "/pfa",
      name: "Pfa",
      icon: <FaTh />,
    },
  ];

  return (
    <div>
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            ISAMM
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {user === "ADMIN" &&
          menuItemADMIN.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
              id={item.name}
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        {user === "Etudiant" &&
          menuItemEtudiant.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              id={item.name}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        {user === "ALumni" &&
          menuItemAlumni.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
              id={item.name}
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        {user === "Enseignant" &&
          menuItemEns.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        <div className="link" onClick={handleLogout} data-test="logout">
          <div className="icon">
            <MdLogout />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
