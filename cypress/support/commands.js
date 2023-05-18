// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("getByData",(selector)=>{
    return cy.get(`[data-test=${selector}]`)
})

// cypress/support/commands.js

Cypress.Commands.add("login", (email, password) => {
    window.localStorage.removeItem("token")
    cy.visit("http://localhost:3000/login"); // Adjust the URL if necessary
    cy.get('input[data-test="email"]').type(email);
    cy.get('input[data-test="password"]').type(password);
    cy.get('button[data-test="login-button"]').click(); // Assuming the button has a data-test attribute
    cy.url().should("eq", "http://localhost:3000/dashboard"); // Adjust the URL to the redirected page after login
  });

  Cypress.Commands.add("loginAsAlumni", (email, password) => {
    window.localStorage.removeItem("token")
    cy.visit("http://localhost:3000/login"); // Adjust the URL if necessary
    cy.get('input[data-test="email"]').type(email);
    cy.get('input[data-test="password"]').type(password);
    cy.get('button[data-test="login-button"]').click(); // Assuming the button has a data-test attribute
    cy.url().should("eq", "http://localhost:3000/profile"); // Adjust the URL to the redirected page after login
  });
  Cypress.Commands.add("addAlumni", (email, password) => {
    window.localStorage.removeItem("token")
    cy.login('finance@bt.com', '123456');
    cy.visit('http://localhost:3000/registeralumni');
      cy.intercept('POST', 'http://localhost:4000/Api/V1/register').as('registerRequest');
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#address').type('123 Main St');
      cy.get('#pays').select('United States');
      cy.get('#société').type('ABC Company');
      cy.get('#promotion').type('2021');
      cy.get('#specialite').type('Computer Science');
      cy.get('.visibilite').select('true');
      cy.get('.diplome').select('true');
      cy.get('#dateDiploma').type('2022-01-01');
      cy.get('#dateHire').type('2022-02-01');
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('button[type="submit"]').click();
      cy.wait('@registerRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(201);
      });
  });
