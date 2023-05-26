describe("Add Blog Page", () => {

    it("creates a new blog", () => {
      cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456");
      cy.get('a#Create_Blog.link').click();
     cy.location("pathname").should("eq", "/addblog");
      // Fill in the form inputs
      cy.get('select[name="Type"]').select("Conseil");
      cy.get('input[name="Sujet"]').type("New Blog Title");
      cy.get('textarea[name="description"]').type("This is a new blog post!");
      cy.get('button[type="submit"]').click();
      // Check if the new blog post is added to the list of blogs
      cy.url().should("include", "/showblogs");
      cy.contains("New Blog Title");
      cy.contains("This is a new blog post!");
    });
    it("update a blog", () => {
      cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456");
      cy.get('a#Show_Blogs.link').click();
        cy.location("pathname").should("eq", "/showblogs");
        cy.get(".cardDemande").last().within(() => {
            cy.getByData('updateBlog').click();
            cy.url().should("include", "/updateBlog");

          });
            cy.get('select[name="Type"]').select("Conseil");
            cy.get('input[name="Sujet"]').clear();
            cy.get('input[name="Sujet"]').type("New Updated Blog Title");
            cy.get('textarea[name="description"]').clear();
            cy.get('textarea[name="description"]').type("This is a new Updated blog post!");
            cy.get('button[type="submit"]').click();
            // Check if the new blog post is added to the list of blogs
            cy.location("pathname").should("eq", "/showBlogs");
            cy.contains("New Updated Blog Title");
            cy.contains("This is a new Updated blog post!");
    });
     it("delete the last blog in the list", () => {
      cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456");
      cy.get('a#Show_Blogs.link').click();
            cy.location("pathname").should("eq", "/showblogs");
            cy.get(".cardDemande").its("length").then((oldLength) => {
              cy.get(".cardDemande").last().within(() => {
                cy.get('.b2').click();
              });
              // Check if the last blog is deleted from the list
              cy.get(".cardDemande").should("have.length", oldLength - 1);
            });
    });
          

  });
