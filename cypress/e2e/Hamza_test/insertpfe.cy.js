/* eslint-disable no-undef */
describe("Pfe Component", () => {
  beforeEach(() => {
    cy.loginasstudent("studentmail@gmail.com", "password"); // Update the URL if needed
  });

  it("should add pfe when user doesnt already have pfe and submit successfully", () => {
    cy.intercept("POST", "http://localhost:4000/Api/V1/PFEe").as("ajouterpfe");
    cy.get("a#add_PFE.link").click();
    cy.get('input[name="titre"]').type("Sample Title");
    cy.get('input[name="sujet"]').type("Sample Description");
    cy.get('input[name="societe"]').type("Sample Company");
    cy.get('input[name="specialite"]').type("Sample Speciality");
    cy.get('select[name="pays"]').select("Tunisie");
    cy.get('input[name="technologie"]').type("Sample Technology");
    cy.get('input[name="DateDebut"]').type("2023-02-10");
    cy.get('input[name="DateFin"]').type("2023-05-31");

    cy.get('button[type="submit"]').click();
    cy.wait("@ajouterpfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    // Assert the expected behavior after form submission
    // For example, you could assert that a success message is displayed or a new PFE is added to the list.
  });

  it("should not post when student already has pfe", () => {
    cy.intercept("POST", "http://localhost:4000/Api/V1/PFEe").as("ajouterpfe");
    cy.get("a#add_PFE.link").click();
    cy.get('input[name="titre"]').type("Sample Title");
    cy.get('input[name="sujet"]').type("Sample Description");
    cy.get('input[name="societe"]').type("Sample Company");
    cy.get('input[name="specialite"]').type("Sample Speciality");
    cy.get('select[name="pays"]').select("Tunisie");
    cy.get('input[name="technologie"]').type("Sample Technology");
    cy.get('input[name="DateDebut"]').type("2023-02-10");
    cy.get('input[name="DateFin"]').type("2023-05-31");

    cy.get('button[type="submit"]').click();
    cy.wait("@ajouterpfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(409);
    });
    // Assert the expected behavior when a required field is missing
    // For example, you could assert that an error message is displayed or the form is not submitted.
  });
});
