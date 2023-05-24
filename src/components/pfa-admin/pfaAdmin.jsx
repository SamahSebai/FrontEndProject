import React from "react";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import {
  getPFA,
  updatePFAAdmin,
  getEnseignant,
  getPFAByEnseignant,
} from "../../services/crudPFAService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function PfaAdmin() {
  const [pfa, setPfa] = useState(null);
  const [enseignant, setEnseignant] = useState(null);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
  const [technologie, setTechnologie] = useState(null);
  useEffect(() => {
    if (technologie) {
      getPFA(
        (data) => {
          setPfa(data);
        },
        () => {},
        technologie
      );
      getEnseignants();
    } else if (selectedEnseignant && selectedEnseignant !== "all") {
      getPFA(
        (data) => {
          setPfa(data);
        },
        () => {},
        undefined,
        selectedEnseignant
      );
    } else if (selectedEnseignant === "all") {
      getPfa();
      getEnseignants();
    } else {
      getPfa();
      getEnseignants();
    }
  }, [technologie, selectedEnseignant]);
  const getPfa = () => {
    getPFA(
      (data) => {
        setPfa(data);
      },
      () => {}
    );
  };
  const getEnseignants = () => {
    getEnseignant(
      (data) => {
        setEnseignant(data);
      },
      () => {}
    );
  };
  const deletePfa = (_id) => {
    updatePFAAdmin(_id, "refused");
    getPFA(
      (data) => {
        setPfa(data);
      },
      () => {}
    );
  };
  const updatePfa = (_id) => {
    updatePFAAdmin(_id, "accepted");
    getPfa();
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <h1 style={{ color: "black" }}>Liste des PFA</h1>
      {enseignant && (
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setSelectedEnseignant(e.target.value);
          }}
        >
          <option value={"all"}>choisir Enseignant</option>
          {enseignant?.map((enseignant) => {
            return (
              <option value={enseignant._id}>
                {enseignant?.lastName} {enseignant?.firstName}
              </option>
            );
          })}
        </Form.Select>
      )}
      <input
        placeholder="technologie"
        onChange={(e) => {
          setTechnologie(e.target.value);
        }}
      ></input>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Technologie</th>
            <th>Students Number</th>
            <th>Disponibilite</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pfa &&
            pfa?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item?._id}</td>
                  <td>{item?.Titre}</td>
                  <td>{item?.Description}</td>
                  <td>{item?.Technologie}</td>
                  <td>{item?.studentNumber}</td>
                  <td>
                    {item?.Disponibilite ? "disponible" : "non disponible"}
                  </td>
                  <td>
                    {item?.statue === "pending" ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            updatePfa(item._id);
                          }}
                        >
                          Accepet
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            deletePfa(item?._id);
                          }}
                        >
                          Refuse
                        </Button>
                      </>
                    ) : (
                      <tr>{item?.statue}</tr>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default PfaAdmin;
