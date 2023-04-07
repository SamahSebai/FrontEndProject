import React from "react";

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
}) => {
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{niveau}</td>
      <td>{classe}</td>
      <td>{datedeNaissance}</td>
      <td>{role}</td>
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
    </tr>
  );
};

export default Student;
