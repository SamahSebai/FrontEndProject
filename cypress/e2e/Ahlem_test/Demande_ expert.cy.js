describe('expert request', () => {
it("create a expert request", () => {
    cy.loginAsAlumni("tes1@gmail.com", "12345678");
    cy.get('a#Demandes.link').click();
    cy.location("pathname").should("eq", "/demande");
  
    cy.get('select#type1').select("expert");
    cy.get('textarea#compétences').type("Skills needed for expert request");
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/profile");
  });
  it("consult a expert request", () => {
    cy.login("finance@bt.com", "123456");
    cy.get('a#expert_requests.link').click();
    cy.location("pathname").should("eq", "/Dexpert");
    cy.contains("Skills needed for expert request")
  });
});
  