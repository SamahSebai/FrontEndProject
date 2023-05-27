/* eslint-disable no-undef */
describe("Student API", () => {
  let studentId;
  let authToken;

  before(() => {
    cy.loginadmin("sameh.sebai.333@gmail.com", "1234567").then(() => {
      authToken = window.localStorage.getItem("token");
    });
  });

  it("creates a new student", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/Api/V1/register",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        firstName: "student",
        lastName: "student",
        email: "studentmail@gmail.com",
        password: "password",
        niveau: "1er",
        classe: "license",
        datedeNaissanec: "15-04-1998",
        role: "Etudiant",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      studentId = response.body._id;
    });
  });

  it("updates a student", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:4000/Api/V1/EtudiantAdmin/${studentId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        firstName: "hama",
        lastName: "Hama",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("deletes a blog", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:4000/Api/V1/Etudiant/${studentId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
