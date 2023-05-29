describe("UpdateStudent API", () => {
  //let userId;
  let authToken;

  beforeEach(() => {
    cy.loginAsAlumni("camorraleader14@gmail.com", "1234567").then(
      (response) => {
        authToken = window.localStorage.getItem("token");
        //userId = response.body.userId; // Retrieve the user ID from the response
      }
    );
  });

  it("update student", () => {
    cy.request({
      method: "PUT",
      url: `/Etudiant/Update/643223dd5826481286a48671`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        firstName: "Updated firstName",
        lastName: "Updated lastName",
        address: "Updated address",
        Specialite: "Updated Specialite",
        classe: "Updated classe",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
