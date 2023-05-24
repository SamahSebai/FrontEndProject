describe('ValiderAlumni', () => {
    it('valider alumni / refuser alumni', () => {
      cy.addAlumni("tes1@gmail.com","12345678");
      cy.addAlumni("tes2@gmail.com","12345678");
      cy.getByData("logout").click(); 
      cy.login("finance@bt.com", "123456");
      cy.visit('http://localhost:3000/valideralumni');
      cy.location("pathname").should("eq", "/valideralumni");
  
      // Check if the table is rendered
      cy.get("#tableV").should('exist');
  
      // Check if the buttons are rendered and clickable
      cy.get(".ligne").first().within(() => {
        cy.getByData('btnValider').should('exist');
        cy.getByData('btnRefuser').should('exist');
      });
  
      // Click the "valider" button and assert the result
      cy.get(".ligne").first().within(() => {
        cy.getByData('btnValider').click();
      });
      cy.location("pathname").should("eq", "/valideralumni");
      cy.getByData("logout").click(); 
      cy.loginAsAlumni("tes1@gmail.com","12345678");
      cy.getByData("etat").should("have.text", "account activated");
  
      // Click the "refuser" button and assert the result
      cy.getByData("logout").click(); 
      cy.login("finance@bt.com", "123456");
      cy.visit('http://localhost:3000/valideralumni');
      cy.location("pathname").should("eq", "/valideralumni");
  
      // Check if the table is rendered
      cy.get("#tableV").should('exist');
  
      // Check if the buttons are rendered and clickable
      cy.get(".ligne").first().within(() => {
        cy.getByData('btnRefuser').click();
      });
      cy.location("pathname").should("eq", "/valideralumni");
      cy.getByData("logout").click(); 
      cy.loginAsAlumni("tes2@gmail.com","12345678");
      cy.getByData("etat").should("have.text", "account not yet activated");
    });
    it('fonctionnalite d alumni active ', () => {
        cy.loginAsAlumni("tes1@gmail.com","12345678");
        cy.get('a#updateUser.link').click();
        cy.location("pathname").should("eq", "/updateUser");
        cy.get('a#Demandes.link').click();
        cy.location("pathname").should("eq", "/demande");
        cy.get('a#Create_Blog.link').click();
        cy.location("pathname").should("eq", "/addblog");
        cy.getByData("logout").click(); 
    });
    it('fonctionnalite d alumni refuser ', () => {
        cy.loginAsAlumni("tes2@gmail.com","12345678");
        cy.get('a#updateUser.link').click();
        cy.location("pathname").should("eq", "/profile");
        cy.get('a#Demandes.link').click();
        cy.location("pathname").should("eq", "/profile");
        cy.get('a#Create_Blog.link').click();
        cy.location("pathname").should("eq", "/profile");
        cy.get('a#Reset_Password.link').click();
        cy.location("pathname").should("eq", "/profile");
        cy.getByData("logout").click(); 
    });

  });
  