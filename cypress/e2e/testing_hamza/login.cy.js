describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // Assuming the login page is served at "/login"
  });

  it("should successfully log in with valid credentials", () => {
    // Fill in the email and password fields
    cy.get('input[id="username"]').type("sameh.sebai.333@gmail.com");
    cy.get('input[id="password"]').type("1234567");

    // Submit the form
    cy.get("form").submit();

    // Assert that the user is redirected to the "/students" page
    cy.url().should("include", "/dashboard");
  });

  it("should display an error message with invalid credentials", () => {
    // Fill in the email and password fields
    cy.get('input[id="username"]').type("invalid@example.com");
    cy.get('input[id="password"]').type("wrongpassword");

    // Submit the form
    cy.get("form").submit();

    // Assert that the user stays on the login page
    cy.url().should("include", "/login");
  });
});
