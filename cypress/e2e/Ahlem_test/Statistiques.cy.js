describe('statistiques', () => {
    it('voir statistiques', () => {
        cy.login("finance@bt.com", "123456");
        cy.get('a#statistiques.link').click();
        cy.location("pathname").should("eq", "/statistiques");
        cy.contains("h1", "Chart Statistics Dashboard").should("exist");
        cy.get(".canvas1").should("exist");
        cy.get(".canvas").should("exist");
        cy.contains("h3", "AVG UNEMOLOYMENT DAYS").should("exist");

    });
    it("displays responsive design", () => {
        // Check if the charts are responsive
        cy.viewport("iphone-6");
        cy.login("finance@bt.com", "123456");
        cy.get('a#statistiques.link').click();
        cy.location("pathname").should("eq", "/statistiques");
        cy.get(".canvas1").should("be.visible");
        cy.get(".canvas").should("be.visible");
        // Check if the layout is responsive
        cy.viewport("ipad-2");
        cy.get(".canvas1").should("be.visible");
        cy.get(".canvas").should("be.visible");
      });
  });
  