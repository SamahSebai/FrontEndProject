describe('vacation request', () => {
it("create a vacation request", () => {
    cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456");
    cy.get('a#Demandes.link').click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/demande");
  
    cy.get('select#type1').select("vacation"); 
    cy.get('textarea#compétences').type("Skills needed for vacation request");
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/profile");
  });
  it("consult a vacation request", () => {
    cy.login("finance@bt.com", "123456");
    cy.get('a#Vacation_requests.link').click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/Dvacation");
    cy.contains("Skills needed for vacation request")
  });
});
  
