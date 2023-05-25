describe('Register Alumni', () => {
    let alumniId; // Define alumniId variable outside the test cases
  
    beforeEach(() => {
      cy.login('finance@bt.com', '123456');
      cy.visit('http://localhost:3000/registeralumni'); // Update the URL if needed
    });
  
    it('should register an alumni successfully', () => {
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
      cy.get('#email').type('john.doe@example.com');
      cy.get('#password').type('password123');
      cy.get('button[type="submit"]').click();
      cy.wait('@registerRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(201);
        alumniId = interception.response.body._id; // Assign the alumniId from the response
      });
  
      cy.url().should('include', '/');
    });
  
    it('should delete the registered alumni', () => {
      cy.log("tessssst register",alumniId); // Log the alumniId to ensure it has a value
  
      if (alumniId) {
        cy.request({
          method: 'DELETE',
          url: `http://localhost:4000/Api/V1/Alumni/${alumniId}`,
          auth: {
            bearer: window.localStorage.getItem('token'), // Retrieve the authentication token
          },
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);
        });
      } else {
        throw new Error('Alumni ID not found');
      }
    });
  });
  
