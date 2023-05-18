describe('chage pass', () => {
  it("should change the password successfully", () => {
    cy.login("finance@bt.com", "123456");
    cy.visit("http://localhost:3000/resetPassword");
    cy.getByData("old_password").type("123456");
    cy.getByData("new_password").type("123456789");
    cy.getByData("new_confirm_password").type("123456789");
    cy.getByData("change_pass").click();
    cy.location("pathname").should("eq", "/dashboard");
    cy.getByData("logout").click(); // Assuming you have updated the logout button's data-test value

    cy.login("finance@bt.com", "123456789");
    // Reset old password
    cy.visit("http://localhost:3000/resetPassword");
    cy.getByData("old_password").type("123456789");
    cy.getByData("new_password").type("123456");
    cy.getByData("new_confirm_password").type("123456");
    cy.getByData("change_pass").click();
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("should display an error message when inputs are incorrect", () => {
    cy.login("finance@bt.com", "123456");
    cy.visit("http://localhost:3000/resetPassword");
    cy.getByData("old_password").type("wrong_password");
    cy.getByData("new_password").type("new_password");
    cy.getByData("new_confirm_password").type("new_password");
    cy.getByData("change_pass").click();
    cy.location("pathname").should("eq", "/resetPassword");
  });
});
