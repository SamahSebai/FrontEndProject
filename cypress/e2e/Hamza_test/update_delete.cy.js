/* eslint-disable no-undef */
describe("Student API", () => {
  let studentId;
  let authToken;

  before(() => {
    cy.loginadmin("sameh.sebai.333@gmail.com", "1234567").then(() => {
      authToken = window.localStorage.getItem("token");
    });
  });

  it("updates a student", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:4000/Api/V1/EtudiantAdmin/6471ad73407363680a67ac33`,
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

  it("deletes a student", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:4000/Api/V1/Etudiant/6471ad73407363680a67ac33`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
