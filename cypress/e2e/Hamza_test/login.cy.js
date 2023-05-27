/* eslint-disable no-undef */
describe("Login", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
    cy.visit("http://localhost:3000/login"); // Update the URL if needed
  });

  it("logging in as a student", () => {
    cy.get('input[data-test="email"]').type("mohamed@gmail.com");
    cy.get('input[data-test="password"]').type("123456");
    cy.get('button[data-test="login-button"]').click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/profile");
  });
  it("logging in as an alumni", () => {
    cy.get('input[data-test="email"]').type("med@gmail.com");
    cy.get('input[data-test="password"]').type("123456");
    cy.get('button[data-test="login-button"]').click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/profile");
  });
  it("logging in as a teacher", () => {
    cy.get('input[data-test="email"]').type(
      "ayariahmedamine.contact@gmail.com"
    );
    cy.get('input[data-test="password"]').type("123456");
    cy.get('button[data-test="login-button"]').click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/pfenonaffecte");
  });
  it("logging in as an admin", () => {
    cy.get('input[data-test="email"]').type("sameh.sebai.333@gmail.com");
    cy.get('input[data-test="password"]').type("1234567");
    cy.get('button[data-test="login-button"]').click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});
