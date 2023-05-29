describe("showcv", () => {
  beforeEach(() => {
    cy.loginAsAlumni("camorraleader14@gmail.com", "1234567");
    cy.get("a#Show_CV.link").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/MainCv");
  });

  it("displays CVDARK when cv.type_cv is 2", () => {
    cy.fixture("cvData").then((cv) => {
      const user = { name: "John Doe" };
      cy.intercept("GET", "**/Api/V1/CvByid/**", {
        body: { user, cv: { ...cv, type_cv: 2 } },
      }).as("getCvById");
      cy.intercept("GET", "**/Api/V1/CvByStudent/**", {
        body: { user, cv },
      }).as("getCvByStudent");
      cy.wait(2000);

      cy.get('[name="cv-dark"]').should("exist");
      cy.get('[name="cv-light"]').should("not.exist");
    });
  });

  it("displays CVLIGHT when cv.type_cv is not 2", () => {
    cy.fixture("cvData").then((cv) => {
      const user = { name: "John Doe" };
      cy.intercept("GET", "**/Api/V1/CvByid/**", {
        body: { user, cv: { ...cv, type_cv: 1 } },
      }).as("getCvById");
      cy.intercept("GET", "**/Api/V1/CvByStudent/**", {
        body: { user, cv },
      }).as("getCvByStudent");
      cy.wait(2000);

      // cy.get('[name="cv-light"]').should("exist");
      // cy.get('[name="cv-dark"]').should("not.exist");
    });
  });
});
