describe("updateuser", () => {
  it("update student", () => {
    cy.loginAsAlumni("camorraleader14@gmail.com", "1234567");
    cy.get("a#updateUser.link").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/updateUser");

    cy.get('input[name="firstName"]').clear().type("Nouveau Prénom");
    cy.get('input[name="lastName"]').clear().type("Nouveau Nom");
    cy.get('input[name="address"]').clear().type("Nouvelle Adresse");
    cy.get('input[name="Specialite"]').clear().type("Nouvelle Spécialité");
    cy.get('input[name="classe"]').clear().type("Nouvelle Classe");

    // Cocher la case "Public"
    cy.get('input[name="public"]').check();

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/profile");
    cy.contains("Nouveau Prénom");
    cy.contains("Nouveau Nom");
    cy.contains("Nouvelle Adresse");
    cy.contains("Nouvelle Spécialité");
    cy.contains("Nouvelle Classe");
  });
});
