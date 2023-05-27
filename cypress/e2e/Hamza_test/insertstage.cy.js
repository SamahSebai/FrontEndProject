/* eslint-disable no-undef */
describe("Stage", () => {
  beforeEach(() => {
    cy.loginasstudent("mohamed@gmail.com", "123456"); // Update the URL if needed
  });

  it("should add stage and submit successfully", () => {
    cy.intercept("POST", "http://localhost:4000/Api/V1/StageEte").as(
      "ajouterstage"
    );
    cy.get("a#add_Stage_été.link").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/addStage");
    cy.get('input[name="title"]').type("Sample Title");
    cy.get('input[name="description"]').type("Sample Description");
    cy.get('input[name="societe"]').type("Sample Company");
    cy.get('input[name="specialite"]').type("Sample Speciality");
    cy.get('input[name="technologie"]').type("Sample Technology");
    cy.get('input[name="dateDebut"]').type("2023-02-01");
    cy.get('input[name="dateFin"]').type("2023-05-31");

    cy.get('button[type="submit"]').click();
    cy.wait("@ajouterstage").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("should display an alert when the date range is invalid", () => {
    cy.get("a#add_Stage_été.link").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/addStage");
    cy.get('input[name="title"]').type("Sample Title");
    cy.get('input[name="description"]').type("Sample Description");
    cy.get('input[name="societe"]').type("Sample Company");
    cy.get('input[name="specialite"]').type("Sample Speciality");
    cy.get('input[name="technologie"]').type("Sample Technology");
    cy.get('input[name="dateDebut"]').type("2023-06-01"); // Invalid date range
    cy.get('input[name="dateFin"]').type("2023-05-31");

    cy.on("window:alert", (message) => {
      expect(message).to.equal("Invalid date range");
    });

    cy.get('button[type="submit"]').click();
  });
});
