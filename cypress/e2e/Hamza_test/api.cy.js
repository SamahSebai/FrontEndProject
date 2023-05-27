describe("apistage", () => {
  let token;

  beforeEach(() => {
    cy.loginasstudent("student321@gmail.com", "mohsen123")
      .then(() => {
        token = window.localStorage.getItem("token");
        console.log(token);
      })
      .then(() => {
        // Continue with the tests after the login operation is completed
      });
  });

  it("create stage", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/Api/V1/StageEte",
      headers: {
        Authorization: token,
      },
      body: {
        Titre: "stage été",
        Sujet: "design",
        Societe: "societe",
        Specialite: "abababab",
        Technologie: "1er",
        dateDebut: "2023-02-01",
        dateFin: "2023-05-31",
        etudiantId: "6471097ccac600611d253da2",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });
});
