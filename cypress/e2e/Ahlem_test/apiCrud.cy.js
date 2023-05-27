describe("Blog API", () => {
  let blogId;
  let authToken;

  beforeEach(() => {
    cy.loginAsAlumni("AhlemTestAlumni@gmail.com", "123456").then(() => {
      authToken = window.localStorage.getItem('token');
    });
  });

  it("creates a new blog", () => {
    cy.request({
      method: "POST",
      url: "/Blog",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        title: "New Blog",
        content: "This is a new blog post.",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      blogId = response.body._id;
    });
  });

  it("fetches all blogs", () => {
    cy.request({
      method: "GET",
      url: "/Blog",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("fetches a blog by ID", () => {
    cy.request({
      method: "GET",
      url: `/Blog/${blogId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("updates a blog", () => {
    cy.request({
      method: "PUT",
      url: `/Blog/${blogId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        title: "Updated Blog",
        content: "This is an updated blog post.",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("deletes a blog", () => {
    cy.request({
      method: "DELETE",
      url: `/Blog/${blogId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
