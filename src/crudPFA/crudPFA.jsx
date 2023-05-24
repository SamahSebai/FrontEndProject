import React from "react";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import {
  getPFAByEnseignant,
  deletePFA,
  addPFA,
  updatePFA,
  getEnseignant,
} from "../services/crudPFAService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CrudPFA() {
  const [pfa, setPfa] = useState(null);
  const [enseignant, setEnseignant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPfa, setSelectedPfa] = useState(null);
  const [form, setForm] = useState({
    Titre: "",
    Description: "",
    Technologie: "",
    studentNumber: 0,
  });
  useEffect(() => {
    getPfa();
    getEnseignantList();
  }, []);
  const getPfa = () => {
    getPFAByEnseignant(
      (data) => {
        setPfa(data);
      },
      () => {}
    );
  };
  const getEnseignantList = () => {
    getEnseignant(
      (data) => {
        setEnseignant(data);
      },
      () => {}
    );
  };
  const deletePfa = (_id) => {
    deletePFA(_id);
    getPFAByEnseignant(
      (data) => {
        setPfa(data);
      },
      () => {}
    );
  };
  const createPfa = () => {
    addPFA(form.Titre, form.Description, form.Technologie, form.studentNumber);
    getPfa();
    setShowModal(false);
  };
  const updatePfa = () => {
    updatePFA(selectedPfa._id, {
      Titre: selectedPfa.Titre,
      Description: selectedPfa.Description,
      Technologie: selectedPfa.Technologie,
      studentNumber: selectedPfa.studentNumber,
    });
    getPfa();
    setSelectedPfa(null);
  };
  return (
    <div style={{ flexGrow: 1 }} className="p-2">
      <h1>Liste des PFA</h1>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Create PFA
      </button>
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title> Create PFA</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div style={{ width: "100%" }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, Titre: e.target.value });
                    }}
                    placeholder="Enter Titre"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, Description: e.target.value });
                    }}
                    placeholder="Enter Description"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Technologie</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, Technologie: e.target.value });
                    }}
                    placeholder="Enter Technologie"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>studentNumber</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter studentNumber"
                    onChange={(e) => {
                      setForm({ ...form, studentNumber: e.target.value });
                    }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    createPfa();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      {selectedPfa && (
        <div className="modal show" style={{ display: "block" }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title> Update PFA</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div style={{ width: "100%" }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSelectedPfa({
                        ...selectedPfa,
                        Titre: e.target.value,
                      });
                    }}
                    defaultValue={selectedPfa.Titre}
                    placeholder="Enter Titre"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSelectedPfa({
                        ...selectedPfa,
                        Description: e.target.value,
                      });
                    }}
                    defaultValue={selectedPfa.Description}
                    placeholder="Enter Description"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Technologie</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSelectedPfa({
                        ...selectedPfa,
                        Technologie: e.target.value,
                      });
                    }}
                    defaultValue={selectedPfa.Technologie}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>studentNumber</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter studentNumber"
                    onChange={(e) => {
                      setSelectedPfa({
                        ...selectedPfa,
                        studentNumber: e.target.value,
                      });
                    }}
                    defaultValue={selectedPfa.studentNumber}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    updatePfa();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedPfa(null);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      <Table striped bordered hover>
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
          {pfa?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item?._id}</td>
                <td>{item?.Titre}</td>
                <td>{item?.Description}</td>
                <td>{item?.Technologie}</td>
                <td>{item?.studentNumber}</td>
                <td>{item?.Disponibilite ? "disponible" : "non disponible"}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedPfa(item);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      deletePfa(item?._id);
                    }}
                    variant="secondary"
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CrudPFA;
