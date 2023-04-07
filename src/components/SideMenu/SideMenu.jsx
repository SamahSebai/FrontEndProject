import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaChalkboardTeacher , FaCheckSquare} from "react-icons/fa";
import { MdPassword, MdEvent, MdEmojiPeople } from "react-icons/md";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";

const SideMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      name: "Crud Events",
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
      path: "/resetPassword",
      name: "Reset Password",
      icon: <MdPassword />,
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
      icon: <FaTh />,
    },
    {
      path: "/resetPassword",
      name: "Reset Password",
      icon: <MdPassword />,
    },
  ];
  const menuItemAlumni = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaTh />,
    },
    {
      path: "/resetPassword",
      name: "Reset Password",
      icon: <MdPassword />,
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
      </div>
    </div>
  );
};

export default SideMenu;
