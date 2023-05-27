
describe("API CRUD Operations", () => {
    let createdBlogId;
    let token;
  
    before(() => {
      // Perform the login and obtain the token
      cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456").then(() => {
        token = window.localStorage.getItem("token");
  
        // Create a new blog and store the created blog ID
        cy.request({
          method: "POST",
          url: "http://localhost:4000/Api/V1/Blog/",
          headers: {
            Authorization: token,
          },
          body: {
            Type: "Conseil",
            Sujet: "New Blog Title",
            description: "This is a new blog post!",
            Moderateur:"642ffd1e4d5d1a38d97d8df8",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(201);
          createdBlogId = response.body.id;
        });
      });
    });
  
    it("updates a blog", () => {
      cy.request({
        method: "PUT",
        url: `http://localhost:4000/Api/V1/Blog/${createdBlogId}`,
        headers: {
          Authorization: token,
        },
        body: {
          Type: "Conseil",
          Sujet: "New Updated Blog Title",
          description: "This is a new Updated blog post!",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  
    it("deletes a blog", () => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:4000/Api/V1/Blog/${createdBlogId}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
  