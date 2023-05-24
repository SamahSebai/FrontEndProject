import React from "react";
import {useNavigate} from 'react-router-dom';
const Student = ({
  firstName,
  lastName,
  niveau,
  classe,
  datedeNaissance,
  role,
  _id,
  editfnc,
  deletefnc,
  toggle,
  justVue
}) => {
  const navigate = useNavigate();
  const handleClick = (value) => {
    console.log("value "+value)
    navigate(`/etudiant/${value}`);
  };
  return (
    <tr>
      <td>
      <a
        id="deleteButton"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        onClick={() => handleClick(_id)}
        >
          {firstName}
          </a></td>
      <td>{lastName}</td>
      <td>{niveau}</td>
      <td>{classe}</td>
      <td>{datedeNaissance}</td>
      <td>{role}</td>
      {!justVue&&
      <>
      <td>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            editfnc({
              firstName,
              lastName,
              niveau,
              classe,
              datedeNaissance,
              role,
              _id,
            });
            toggle();
          }}
        >
          {" "}
          UPDATE
        </button>
      </td>
      <td>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            console.log(_id);
            deletefnc(_id);
          }}
        >
          DELETE
        </button>
      </td>
      </>}
    </tr>
  );
};

export default Student;
