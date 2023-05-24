describe('CrudEvenement', () => {
    beforeEach(() => {
        window.localStorage.removeItem("token")
        cy.visit("http://localhost:3000/login"); // Adjust the URL if necessary
        cy.get('input[data-test="email"]').type('sameh.sebai.333@gmail.com');
        cy.get('input[data-test="password"]').type('1234567');
        cy.get('button[data-test="login-button"]').click(); // Assuming the button has a data-test attribute
        cy.url().should("eq", "http://localhost:3000/dashboard"); // Adjust the URL to the redirected page after login
        
        cy.visit('http://localhost:3000/events')
        cy.get('button[data-test="create-button"]').click(); // Assuming the button has a data-test attribute
        cy.url().should("eq", "http://localhost:3000/CreateEvent"); // Assumant que votre composant EventTable est rendu à l'URL '/Event'
      
    })
  
    it('Ajoute un nouvel événement', () => {
      
      //cy.contains('Create Event').click() // Cliquez sur le bouton de création d'événement
  
      cy.get('[data-test="event-name"]').type('My Event') // Entrez le nom de l'événement
      cy.get('[data-test="event-desc"]').type('This is a test event') // Entrez la description de l'événement
      cy.get('[data-test="event-date"]').type('2023-05-18') // Entrez la date de l'événement
      cy.get('select[name="Moderateur"]').select('sameh sebai');
      cy.get('[data-test="btn-create-event"]').click() // Cliquez sur le bouton de création
  
      cy.visit('http://localhost:3000/events')
      //cy.get('button[data-test="update-button"]').first().click(); // Assuming the button has a data-test attribute
      // cy.url().should("eq", "http://localhost:3000/updateEvent/63c3fb6b1091b9e1f49e6a97"); 
    });
/*
   // it('Update un événement', () => {
      
        //cy.contains('Create Event').click() // Cliquez sur le bouton de création d'événement
    
      //  cy.get('[data-test="Update-event-name"]').type('My update Event ') // Entrez le nom de l'événement
       // cy.get('[data-test="Update-event-desc"]').type('This is an update test event') // Entrez la description de l'événement
       // cy.get('[data-test="Update-event-date"]').type('2023-05-20') // Entrez la date de l'événement
      //  cy.get('select[name="Moderateur"]').select('ahmed amin');
      //  cy.get('[data-test="btn-update-event"]').click() // Cliquez sur le bouton de création
    
       // cy.visit('http://localhost:3000/events')
        //cy.get('button[data-test="update-button"]').last().click(); // Assuming the button has a data-test attribute
         // cy.url().should("eq", "http://localhost:3000//updateEvent/${id}"); 
    //  });
    it("should update event on form submission", () => {
        
    
        cy.get('input[name="Nom"]').clear().type("JPO test");
        cy.get('input[name="Description"]').clear().type("rencontrer Test");
        cy.get('input[name="Date"]').clear().type("2023-05-25");
        cy.get('select[name="Moderateur"]').select("ahmed amin");
    
        cy.get('[data-test="btn-update-event"]').click()
        
        cy.visit('http://localhost:3000/events')

        
      }); 
    */
  });


  